import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync.js";
import { HabitService } from "./habit.service.js";
import { sendResponse } from "../../shared/sendResponse.js";

const createHabit = catchAsync(
    async (req: Request, res: Response) => {
        const { userId, title, description } = req.body as {
            userId?: string;
            title?: string;
            description?: string;
        };

        const result = await HabitService.createHabit({
            userId: userId ?? "",
            title: title ?? "",
            description,
        });

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Habit created successfully",
            data: result,
        });
    },
);

const getAllHabits = catchAsync(
    async (req: Request, res: Response) => {
        const result = await HabitService.getAllHabits(req.params.userId as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Habits fetched successfully',
            data: result
        });
    }
);

const getHabitById = catchAsync(
    async (req: Request, res: Response) => {
        const result = await HabitService.getHabitById(req.params.habitId as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Habit fetched successfully',
            data: result
        });
    }
);

const habitUpdate = catchAsync(
    async (req: Request, res: Response) => {
        const payload = {...req.body}
        const result = await HabitService.habitUpdate(req.params.habitId as string, payload);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Habit updated successfully',
            data: result
        });
    }
);

const habitDelete = catchAsync(
    async (req: Request, res: Response) => {
        const result = await HabitService.habitDelete(req.params.habitId as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Habit deleted successfully',
            data: result
        });
    }
);

const habitArchive = catchAsync(
    async (req: Request, res: Response) => {
        const result = await HabitService.habitArchive(req.params.habitId as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,  
            message: 'Habit archived successfully',
            data: result
        });
    }
);


export const HabitController = {
    createHabit,
    getAllHabits,
    getHabitById,
    habitUpdate,
    habitDelete,
    habitArchive
}

    