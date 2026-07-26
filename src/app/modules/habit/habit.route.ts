import { Router } from "express";
import { HabitController } from "./habit.controller";

const router = Router()


router.post("/", HabitController.createHabit);
router.get("/users/:userId", HabitController.getAllHabits);
router.get("/:habitId", HabitController.getHabitById);
router.patch("/:habitId/update", HabitController.habitUpdate);
router.delete("/:habitId", HabitController.habitDelete);
router.patch("/:habitId/archive", HabitController.habitArchive);

export const HabitRoutes = router;