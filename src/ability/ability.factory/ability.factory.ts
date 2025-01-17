import { Injectable } from "@nestjs/common";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { PrismaSubjects } from "../prisma-generated-types";
import { createPrismaAbility, PrismaQuery } from "@casl/prisma";
import { UserReq } from "../../global/types/CustomRequest";

export enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Submit = "submit",
}

type ExtendedSubjects = "all";
export type AppSubjects = PrismaSubjects | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: UserReq) {
        const { can, build } = new AbilityBuilder<AppAbility>(
            createPrismaAbility,
        );

        if (user.roles.includes("admin")) {
            can(Action.Manage, "all");
        } else if (user.roles.includes("voyager")) {
            can([Action.Submit], "Voyage");
            can([Action.Read], "Form");
            can([Action.Manage], "VoyageTeam", {
                id: { in: user.voyageTeams.map((vt) => vt.teamId) },
            });
            can([Action.Manage], "Ideation", {
                voyageTeamMemberId: {
                    in: user.voyageTeams.map((vt) => vt.memberId),
                },
            });
        }
        return build({
            detectSubjectType: (object) => object.__caslSubjectType__,
        });
    }
}
