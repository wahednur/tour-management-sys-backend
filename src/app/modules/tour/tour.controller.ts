import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponse";
import { ITour } from "./tour.interface";
import { TourServices } from "./tour.service";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  };
  const result = await TourServices.createTour(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});
const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourServices.getAllTours(
    query as Record<string, string>
  );
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

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  };
  const result = await TourServices.updateTour(id, payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour updated successfully",
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

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const tour = await TourServices.getSingleTour(slug);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${tour?.title}`,
    data: tour,
  });
});

export const TourController = {
  createTour,
  createTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
  getSingleTour,
  updateTour,
};
