import { prisma } from "./prisma-client";

export const populateVoyageTeams = async () => {
    const users = await prisma.user.findMany({});
    const voyageRoles = await prisma.voyageRole.findMany({});

    // v46
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "46",
                },
            },
            name: "v46-tier3-team-35",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/v46-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 3" },
            },
            endDate: new Date("2023-12-06"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[4].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 60,
                    },
                ],
            },
        },
    });

    // v47
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "47",
                },
            },
            name: "v47-tier2-team-4",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 1" },
            },
            endDate: new Date("2024-11-09"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[3].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[4].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 15,
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: { number: "47" },
            },
            name: "v47-tier3-team-45",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            tier: {
                connect: { name: "Tier 2" },
            },
            endDate: new Date("2024-11-09"),
        },
    });

    // v48
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "48",
                },
            },
            name: "v48-tier1-team-1",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/v46-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 1" },
            },
            endDate: new Date("2024-04-15T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[4].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 60,
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "48",
                },
            },
            name: "v48-tier3-team-30",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 3" },
            },
            endDate: new Date("2024-04-15T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[3].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[4].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 15,
                    },
                ],
            },
        },
    });

    // v49
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "49",
                },
            },
            name: "v49-tier1-team-1",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/v46-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 1" },
            },
            endDate: new Date("2024-06-17T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[4].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 60,
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "49",
                },
            },
            name: "v49-tier3-team-30",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 3" },
            },
            endDate: new Date("2024-06-17T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[3].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[4].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 15,
                    },
                ],
            },
        },
    });

    // v50
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "50",
                },
            },
            name: "v50-tier1-team-1",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/v46-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 1" },
            },
            endDate: new Date("2024-08-12T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[4].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 60,
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "50",
                },
            },
            name: "v50-tier3-team-30",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 3" },
            },
            endDate: new Date("2024-08-12T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[3].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[4].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 15,
                    },
                ],
            },
        },
    });

    // v51
    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "51",
                },
            },
            name: "v51-tier1-team-1",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/v46-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 1" },
            },
            endDate: new Date("2024-10-14T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[4].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 60,
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.create({
        data: {
            voyage: {
                connect: {
                    number: "51",
                },
            },
            name: "v51-tier3-team-30",
            status: {
                connect: {
                    name: "Active",
                },
            },
            repoUrl:
                "https://github.com/chingu-voyages/soloproject-tier3-chinguweather",
            repoUrlBE: "https://github.com/chingu-voyages/Handbook",
            deployedUrl: "https://www.chingu.io/",
            deployedUrlBE:
                "https://stackoverflow.com/questions/4848964/difference-between-text-and-varchar-character-varying",
            tier: {
                connect: { name: "Tier 3" },
            },
            endDate: new Date("2024-10-14T04:59:59.000Z"),
            voyageTeamMembers: {
                create: [
                    {
                        member: {
                            connect: {
                                email: users[0].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[0].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 10,
                    },
                    {
                        member: {
                            connect: {
                                email: users[1].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 12,
                    },
                    {
                        member: {
                            connect: {
                                email: users[2].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[2].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 20,
                    },
                    {
                        member: {
                            connect: {
                                email: users[3].email,
                            },
                        },
                        voyageRole: {
                            connect: {
                                name: voyageRoles[4].name,
                            },
                        },
                        status: {
                            connect: {
                                name: "Active",
                            },
                        },
                        hrPerSprint: 15,
                    },
                ],
            },
        },
    });

    const voyageTeamMembers = await prisma.voyageTeamMember.findMany({});

    /* ============== Add tech stack items, etc to teams ================== */
    // nested createMany is not supported, so creating one by one
    // https://github.com/prisma/prisma/issues/5455
    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Javascript",
                        category: {
                            connect: {
                                name: "Frontend",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[0].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "React",
                        category: {
                            connect: {
                                name: "Frontend",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[2].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Tailwind",
                        category: {
                            connect: {
                                name: "CSS Library",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[2].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Node",
                        category: {
                            connect: {
                                name: "Backend",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[1].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Jira",
                        category: {
                            connect: {
                                name: "Project Management",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[0].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Azure",
                        category: {
                            connect: {
                                name: "Cloud Provider",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[3].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Netlify",
                        category: {
                            connect: {
                                name: "Hosting",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[2].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.voyageTeam.update({
        where: {
            name: "v47-tier2-team-4",
        },
        data: {
            teamTechStackItems: {
                create: [
                    {
                        name: "Java",
                        category: {
                            connect: {
                                name: "Backend",
                            },
                        },
                        teamTechStackItemVotes: {
                            create: {
                                votedBy: {
                                    connect: {
                                        id: voyageTeamMembers[3].id,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    });
};
