import { prisma } from "../../lib/prisma.js";

interface CreateHabitPayload {
    userId: string;
    title: string;
    description?: string;
}

const createHabit = async (payload: CreateHabitPayload) => {
    return prisma.habit.create({
        data: payload
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