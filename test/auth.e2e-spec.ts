import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { seed } from "../prisma/seed/seed";
import * as request from "supertest";
import * as cookieParser from "cookie-parser";
import { extractCookieByKey } from "./utils";

describe("AuthController e2e Tests", () => {
    let app: INestApplication;
    let cookie: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        await seed();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.use(cookieParser());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe("Creating new users POST /auth/signup", () => {
        const signupUrl = "/auth/signup";
        it("should create a new user", async () => {
            return request(app.getHttpServer())
                .post(signupUrl)
                .send({
                    email: "testuser@example.com",
                    password: "password",
                })
                .expect(200);
        });

        it("should return 400 when email is not valid", async () => {
            return request(app.getHttpServer())
                .post(signupUrl)
                .send({})
                .expect(400);
        });

        it("should return 400 when password is not valid", async () => {
            return request(app.getHttpServer())
                .post(signupUrl)
                .send({
                    email: "testuser@example.com",
                    password: "short",
                })
                .expect(400);
        });
    });

    describe("Log in POST auth/login", () => {
        const loginUrl = "/auth/login";
        it("should login and return access and refresh token", async () => {
            return request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: "jessica.williamson@gmail.com",
                    password: "password",
                })
                .expect(200)
                .then((res) => {
                    // extract cookie for other tests
                    cookie = res.headers["set-cookie"];
                    const joinedCookie = cookie.join("");
                    expect(joinedCookie).toContain("access_token");
                    expect(joinedCookie).toContain("refresh_token");
                });
        });

        it("should return 400 if account does not exist", () => {
            return request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: "notexist@example.com",
                    password: "password",
                })
                .expect(400);
        });

        it("should return 401 if account exists but wrong password", () => {
            return request(app.getHttpServer())
                .post(loginUrl)
                .send({
                    email: "jessica.williamson@gmail.com",
                    password: "wrongpassword",
                })
                .expect(401);
        });
    });

    describe("Logout POST auth/logout", () => {
        const logoutUrl = "/auth/logout";

        it("should logout", async () => {
            //console.log("cookie", cookie);
            return request(app.getHttpServer())
                .post(logoutUrl)
                .set("cookie", cookie)
                .expect(200);
        });

        it("should return 401 unauthorized if no access_token in cookie", async () => {
            return request(app.getHttpServer()).post(logoutUrl).expect(401);
        });

        it("should return 400 if no refresh_token in cookie", async () => {
            return request(app.getHttpServer())
                .post(logoutUrl)
                .set("cookie", extractCookieByKey(cookie, "access_token"))
                .expect(400);
        });
    });
});
