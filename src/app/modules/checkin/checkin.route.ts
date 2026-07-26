import { Router } from "express";
import { CheckInController } from "./checkin.controller.js";



const router = Router();

router.patch(
  "/toggle/:habitId",
  CheckInController.toggleCheckIn
);

router.get(
  "/home",
  CheckInController.getHomeView
);

router.get(
  "/:habitId/details",
  CheckInController.getHabitDetails
);

export const CheckInRoutes = router;