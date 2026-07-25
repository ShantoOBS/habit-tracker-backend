import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

interface IRegisterUserPayload {
    name: string;
    email: string;
    password: string;
}

const registerUser = async (payload: IRegisterUserPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,

        }
    })

    if (!data.user) {
        throw new Error("Failed to register");
    }


       const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            emailVerified: data.user.emailVerified,
        });

        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            emailVerified: data.user.emailVerified,
        });

        return {
            ...data,
            accessToken,
            refreshToken,

        }


}

interface ILoginUserPayload {
    email: string;
    password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    if (data.user.status != UserStatus.ACTIVE) {
        throw new Error("User is blocked");
    }

      const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            emailVerified: data.user.emailVerified,
        });

        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            emailVerified: data.user.emailVerified,
        });

        return {
            ...data,
            accessToken,
            refreshToken,

        }

   

}

const getMe = async (userId: string) => {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            habits: {
                include: {
                    checkIns: true,
                }
            }
        }
    });

    if (!data) {
        throw new Error("User not found");
    }

    return data;
};

const getAllUsers = async () => {
    const data = await prisma.user.findMany();

    return data;
}

const userStatusUpdate = async (userId: string, status: UserStatus) => {
    const data = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status: status,
        }
    });
    return data;
};

export const AuthService = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    userStatusUpdate,
};
