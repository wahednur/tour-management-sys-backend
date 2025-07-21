import { QueryBuilder } from "../../utils/QueryBuilder";
import { searchFields } from "./tour.constant";
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
  // const filter = query;
  // const searchTerm = query.searchTerm || "";
  // const sort = query.sort || "-createdAt";
  // const page = Number(query.page) || 1;
  // const limit = Number(query.limit) || 10;
  // const skip = (page - 1) * limit;
  // // Field filtering
  // const fields = query.fields ? query.fields.split(",").join(" ") : "";

  // delete filter["searchTerm"];
  // delete filter["sort"];

  // for (const field of excludeFields) {
  //   // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  //   delete filter[field];
  // }

  // console.log(searchTerm);
  // const searchArray = searchFields.map((field) => ({
  //   [field]: { $regex: search, $options: "i" },
  // }));
  // const searchQuery = {
  //   $or: searchFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // };

  // const tours = await Tour.find(searchQuery)
  //   .find(filter)
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);

  // const filterQuery = Tour.find(filter);
  // // const tours = filterQuery.find(searchQuery);
  // const allTours = await tours
  //   .sort(sort)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);
  // const totalTors = await Tour.countDocuments();
  // const totalPage = Math.ceil(totalTors / limit);

  const queryBuilder = new QueryBuilder(Tour.find(), query);
  const tours = await queryBuilder
    .search(searchFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};

const getSingleTour = async (slug: string) => {
  const tour = await Tour.findOne({ slug });
  return tour;
};

export const TourServices = {
  createTour,
  createTourType,
  updateTourType,
  deleteTourType,
  getAllTours,
  getSingleTour,
};
