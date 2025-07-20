import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ title: payload.name });
  if (existingTourType) {
    throw new Error(`${payload.name} already exist`);
  }
  const tourType = await TourType.create(payload);
  return tourType;
};

const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }
  const updateTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updateTourType;
};

const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }
  return await TourType.findByIdAndDelete(id);
};

// Tours
const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error(`${payload.title} already exist`);
  }
  const tour = await Tour.create(payload);
  return tour;
};
const getAllTours = async (query: Record<string, string>) => {
  const filter = query;
  const result = await Tour.find(filter);
  const tourCount = await Tour.countDocuments();
  return {
    data: result,
    meta: {
      total: tourCount,
    },
  };
};

export const TourServices = {
  createTour,
  createTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
};
