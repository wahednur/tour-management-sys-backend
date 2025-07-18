import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error(`${payload.title} already exist`);
  }
  const tour = await Tour.create(payload);
  return tour;
};

export const TourServices = {
  createTour,
};
