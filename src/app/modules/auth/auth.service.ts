import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

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


    return data


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

   
    return data;

}

export const AuthService = {
    registerUser,
    loginUser,
};