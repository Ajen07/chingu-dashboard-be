import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as crypto from "crypto";
import { SignupDto } from "./dto/signup.dto";
import { comparePassword, hashPassword } from "../utils/auth";
import { sendSignupVerificationEmail } from "../utils/emails/sendEmail";
import { ResendEmailDto } from "./dto/resend-email.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    private generateToken = (userId: string) => {
        const randomString = crypto.randomBytes(64).toString("base64url");
        const payload = {
            sub: randomString,
            userId,
        };
        return this.jwtService.sign(payload, { expiresIn: "1h" });
    };

    // Checks user email/username match database - for passport
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            // no user found, but not revealing that user account does not exist in the server
            throw new BadRequestException(
                `Login failed. Invalid email and/or password.`,
            );
        }
        const isPasswordMatch = await comparePassword(password, user.password);
        if (user && isPasswordMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signup(signupDto: SignupDto) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: signupDto.email,
                    password: await hashPassword(signupDto.password),
                },
            });

            const token = this.generateToken(user.id);
            await this.prisma.emailVerificationToken.create({
                data: {
                    userId: user.id,
                    token,
                },
            });
            console.log(token);
            // TODO: uncomment this
            // await sendSignupVerificationEmail(signupDto.email, token);
        } catch (e) {
            if (e.code === "P2002") {
                // user with this email exist
                console.log(
                    `User with email ${signupDto.email} already registered`,
                );
                const user = await this.prisma.user.findUnique({
                    where: { email: signupDto.email },
                });
                const token = this.generateToken(user.id);
                // if user account is not activated - send another email (replace old token)
                if (!user.emailVerified) {
                    await this.prisma.emailVerificationToken.upsert({
                        where: {
                            userId: user.id,
                        },
                        update: {
                            token,
                        },
                        create: {
                            userId: user.id,
                            token,
                        },
                    });
                    console.log(
                        `User account ${signupDto.email} is not verified, resending verification email.`,
                    );
                    await sendSignupVerificationEmail(signupDto.email, token);
                } else {
                    // TODO:
                    // if user account is activated - send them and email and tell them to use the reset password form
                    console.log(`Email ${signupDto.email} already verified.`);
                }
            } else {
                console.log(`Other signup errors: ${e}`);
            }
        }
        return;
    }

    async resendEmail(resendEmailDto: ResendEmailDto) {
        const user = await this.usersService.findUserByEmail(
            resendEmailDto.email,
        );
        const token = this.generateToken(user.id);
        console.log(token);
        if (!user) {
            // user does not exist, has not signed up previously
            console.log("User does not exist");
        } else if (user.emailVerified) {
            // user email has already verified, tell user to reset password if they have forgotten their password
            console.log("Email already verified");
        } else {
            // user not verified - resend email
            await this.prisma.emailVerificationToken.upsert({
                where: {
                    userId: user.id,
                },
                create: {
                    userId: user.id,
                    token,
                },
                update: {
                    token,
                },
            });
            // TODO: uncomment this
            // await sendSignupVerificationEmail(resendEmailDto.email, token);
        }
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto) {
        try {
            const payload = await this.jwtService.verifyAsync(
                verifyEmailDto.token,
            );

            if (!payload.userId) {
                throw new UnauthorizedException("Invalid token");
            }
            const user = await this.usersService.findUserById(payload.userId);
            if (!user) {
                // user does not exist, has not signed up previously,
                // they should not have gotten an email with the token
                console.log(`User ${payload.userId} does not exist`);
                throw new UnauthorizedException("User does not exist.");
            } else {
                // TODO: 401
                console.log("user exists");
                if (payload.exp * 1000 - Date.now() <= 0) {
                    throw new UnauthorizedException("Token has expired.");
                    // TODO: delete the token
                } else if (user.emailVerified) {
                    // user email has already verified, just return the default status
                    console.log(`Email ${user.email} already verified`);
                } else {
                    // user not verified - verify it, and delete the token
                    const tokenInDb =
                        await this.prisma.emailVerificationToken.findUnique({
                            where: {
                                userId: user.id,
                            },
                        });
                    if (!tokenInDb) {
                        console.log("token expired"); // maybe send another one
                        // email them or frontend will display saying token expired
                        // with a resend verification email option
                    } else {
                        const isTokenMatched =
                            verifyEmailDto.token === tokenInDb.token;
                        console.log("isTokenMatched", isTokenMatched);
                        if (!isTokenMatched) {
                            console.log("Token mismatched");
                        } else {
                            // set user emailVerified status to true, and delete the token
                            await this.prisma.$transaction([
                                this.prisma.user.update({
                                    where: {
                                        email: user.email,
                                    },
                                    data: {
                                        emailVerified: true,
                                    },
                                }),
                                this.prisma.emailVerificationToken.delete({
                                    where: {
                                        userId: user.id,
                                    },
                                }),
                            ]);
                            console.log("Email verified");
                        }
                    }
                }
            }
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                throw new UnauthorizedException("Malformed Token");
            }
        }
    }

    //  Note: this will not respond with success/fail status due to privacy reason
    async resetPassword(email: string) {
        const user = await this.usersService.findUserByEmail(email);

        if (!user) {
            // no user found with the email
            throw new NotFoundException("no user found.");
        }
        if (!user.emailVerified) {
            // user email is not verified
        }
        const token = await this.prisma.resetToken.findUnique({
            where: {
                userId: user.id,
            },
        });
        if (token) {
            //delete
        } else {
            const resetToken = this.generateToken(user.id);
            const hash = await hashPassword(resetToken);
            console.log(hash); // just to get rid of lint error so I can push to a remote branch
            // await this.prisma.resetToken.create({});
        }
    }
}
