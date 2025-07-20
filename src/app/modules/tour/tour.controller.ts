import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponse";
import { TourServices } from "./tour.service";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.createTour(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});
const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourServices.getAllTours(query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All tours retrieved successfully",
    data: result,
  });
});
const createTourType = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.createTourType(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour type created successfully",
    data: result,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = TourServices.updateTourType(id, name);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour type updated successfully",
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourServices.deleteTourType(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour type deleted successfully",
    data: result,
  });
});

export const TourController = {
  createTour,
  createTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
};
