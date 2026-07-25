import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { UserStatus } from "../../../generated/prisma/browser";

const registerUser = catchAsync(
    async (req: Request, res: Response) => {

        const payload = req.body;

        const result = await AuthService.registerUser(payload);

        const { accessToken, refreshToken, token,  } = result

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string);

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result,
        })
    }
)

const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await AuthService.loginUser(payload);
        
        const { accessToken, refreshToken, token,  } = result

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, refreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, token as string);

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: result,
        })
    }
)

const getMe = catchAsync(
    async (req: Request, res: Response) => {
        const userId = req.params.userId as string;
        const result = await AuthService.getMe(userId);

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "User details retrieved successfully",
            data: result,
        })
    }
)

const getAllUsers = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.getAllUsers(); 

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,  
            message: "All users retrieved successfully",
            data: result,
        })
    }
)

const userStatusUpdate = catchAsync(
    async (req: Request, res: Response) => {
        const userId = req.params.userId as string;
        const status = req.body.status as UserStatus;

        const result = await AuthService.userStatusUpdate(userId, status);

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "User status updated successfully",
            data: result,
        })
    }

)  

export const AuthController = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    userStatusUpdate,
};