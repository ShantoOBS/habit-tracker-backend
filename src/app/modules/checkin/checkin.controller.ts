import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { CheckInService } from "./checkin.service";
import { sendResponse } from "../../shared/sendResponse";


const toggleCheckIn = catchAsync(async (req: Request, res: Response) => {
  const result = await CheckInService.toggleCheckIn(
    req.params.habitId as string
  );

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Check-in updated successfully",
    data: result,
  });
});


const getHomeView = catchAsync(async (req: Request, res: Response) => {
  const result = await CheckInService.getHomeView(req.query.userId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Home view fetched successfully",
    data: result,
  });
});

const getHabitDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await CheckInService.getHabitDetails(req.params.habitId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Habit details fetched successfully",
    data: result,
  });
});

export const CheckInController = {
  toggleCheckIn,
  getHomeView,
  getHabitDetails
};