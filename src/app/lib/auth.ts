import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    emailAndPassword: {
        enabled: true,
    },

       user: {
        additionalFields: {
            
            role: {
                type: "string",
                required: true,
                defaultValue: Role.USER
            },

            status: {
                type: "string",
                required: true,
                defaultValue: UserStatus.ACTIVE
            }

        }
    },


 
 

});