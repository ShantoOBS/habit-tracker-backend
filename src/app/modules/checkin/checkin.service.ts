import { prisma } from "../../lib/prisma.js";

const toggleCheckIn = async (habitId: string) => {

  const today = new Date().toISOString().split("T")[0]; 

  const checkIn = await prisma.checkIn.findUnique({
    where: {
      habitId_date: {
        habitId,
        date: today,
      },
    },
  });

  if (!checkIn) {
    return prisma.checkIn.create({
      data: {
        habitId,
        date: today,
        completed: true,
      },
    });
  }

  return prisma.checkIn.update({
    where: {
      id: checkIn.id,
    },
    data: {
      completed: !checkIn.completed,
    },
  });
};

const checkInUpdate =async (habitId: string, date: string) => {




    return prisma.checkIn.create({
      data: {
        habitId,
        date: date,
        completed: true,
      },
    });
  


  
};



const getCurrentStreak = (dates: string[]) => {
  if (!dates.length) return 0;

  const completed = new Set(dates);

  let streak = 0;

  const current = new Date();
  current.setHours(0, 0, 0, 0);

  while (true) {
    const date = current.toISOString().split("T")[0];

    if (!completed.has(date)) break;

    streak++;
    current.setDate(current.getDate() - 1);
  }

  return streak;
};

const getHomeView = async (userId: string) => {
  const habits = await prisma.habit.findMany({
    where: { userId },
    include: {
      checkIns: true,
    },
  });

  const today = new Date().toISOString().split("T")[0];

  return habits.map((habit) => {
    const dates = habit.checkIns
      .filter((c) => c.completed)
      .map((c) => c.date);

    return {
      id: habit.id,
      title: habit.title,
      archived: habit.archived,
      completedToday: dates.includes(today),
      currentStreak: getCurrentStreak(dates),
    };
  });
};


const calculateStreaks = (dates: string[]) => {
  if (!dates.length)
    return {
      current: 0,
      longest: 0,
    };

  dates.sort();

  let longest = 1;
  let running = 1;

  for (let i = 1; i < dates.length; i++) {
    const previous = new Date(dates[i - 1]);
    const current = new Date(dates[i]);

    const diff =
      (current.getTime() - previous.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      running++;
    } else {
      running = 1;
    }

    longest = Math.max(longest, running);
  }

  return {
    current: getCurrentStreak(dates),
    longest,
  };
};

const getHabitDetails = async (habitId: string) => {
  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
    include: {
      checkIns: true,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const dates = habit.checkIns
    .filter((c) => c.completed)
    .map((c) => c.date);

  const streaks = calculateStreaks(dates);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 89);

  const completed = new Set(dates);

  const heatmap = [];

  for (
    let d = new Date(start);
    d <= today;
    d.setDate(d.getDate() + 1)
  ) {
    const date = d.toISOString().split("T")[0];

    heatmap.push({
      date,
      completed: completed.has(date),
    });
  }

  return {
    habit: {
      id: habit.id,
      title: habit.title,
      description: habit.description,
    },
    currentStreak: streaks.current,
    longestStreak: streaks.longest,
    heatmap,
  };
};

export const CheckInService = {
    toggleCheckIn,
    getHomeView,
    getHabitDetails,
    checkInUpdate

  
};