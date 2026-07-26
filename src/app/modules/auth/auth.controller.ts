import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { AuthService } from "./auth.service.js";
import { tokenUtils } from "../../utils/token.js";
import { UserStatus } from "../../../generated/prisma/browser.js";
import AppError from "../../errorHelpers/AppError.js";
import status from "http-status";
import { CookieUtils } from "../../utils/cookie.js";


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

      

        const {userId} = req.body;
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

const getNewToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];
        if (!refreshToken) {
            throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
        }
        const result = await AuthService.getNewToken(refreshToken, betterAuthSessionToken);

        const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

        tokenUtils.setAccessTokenCookie(res, accessToken);
        tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
        tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "New tokens generated successfully",
            data: {
                accessToken,
                refreshToken: newRefreshToken,
                sessionToken,
            },
        });
    }
)

const logoutUser = catchAsync(
    async (req: Request, res: Response) => {
        const betterAuthSessionToken = req.cookies["better-auth.session_token"];
        const result = await AuthService.logoutUser(betterAuthSessionToken);
        CookieUtils.clearCookie(res, 'accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        CookieUtils.clearCookie(res, 'refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        CookieUtils.clearCookie(res, 'better-auth.session_token', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "User logged out successfully",
            data: result,
        });
    }
)


export const AuthController = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    userStatusUpdate,
    logoutUser,
    getNewToken

};