import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponse";
import { Division } from "./division.model";
import { DivisionService } from "./division.service";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await Division.create(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Division created",
    data: result,
  });
});
const geAllDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getAllDivision();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Divisions retrieved",
    data: result,
  });
});
const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DivisionService.updateDivision(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Division updated",
    data: result,
  });
});

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await DivisionService.getSingleDivision(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Division retrieved",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.deleteDivision(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Division deleted",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  geAllDivision,
  updateDivision,
  getSingleDivision,
  deleteDivision,
};
