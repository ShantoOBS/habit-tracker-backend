import status from "http-status";

import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";

interface CreateHabitPayload {
    userId: string;
    title: string;
    description?: string;
}

const createHabit = async (payload: CreateHabitPayload) => {
    const title = payload.title?.trim();
    if (!payload.userId || !title) {
        throw new AppError(status.BAD_REQUEST, "userId and title are required");
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true },
    });

    if (!user) {
        throw new AppError(
            status.UNAUTHORIZED,
            "Invalid session. Please sign in again.",
        );
    }

   

    return prisma.habit.create({
        data: {
            userId: payload.userId,
            title,
            description: payload.description?.trim() || null,
        },
    });
};

const getAllHabits = async (userId: string) => {
    return prisma.habit.findMany({
        where: {
            userId: userId
        }
    });
};

const getHabitById = async (habitId: string) => {
    
    return prisma.habit.findUnique({
        where: {
            id: habitId
        }
    });
}

interface UpdateHabitPayload {
    title?: string;
    description?: string;
    archived?: boolean;
}

const habitUpdate = async (habitId: string,
     payload: Partial<UpdateHabitPayload>) => {
   
    return prisma.habit.update({
        where: {    
        id: habitId
        },
        data: payload
    });
}

const habitDelete = async (habitId: string) => {
    return prisma.habit.delete({
        where: {
            id: habitId
        }
    });
}

const habitArchive = async (habitId: string) => {
    return prisma.habit.update({
        where: {    
            id: habitId
        },
        data: {
            archived: true
        }
    });
}


export const HabitService = {
    createHabit,
    getAllHabits,
    getHabitById,
    habitUpdate,
    habitDelete,
    habitArchive
}