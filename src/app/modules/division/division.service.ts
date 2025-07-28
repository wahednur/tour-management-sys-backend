import { deleteImgCloudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { searchFields } from "./division.constant";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });
  if (existingDivision) {
    throw new Error(`${existingDivision.name} division already exist`);
  }
  const division = await Division.create(payload);
  return division;
};

const getAllDivision = async (query: Record<string, string> = {}) => {
  const queryBuilder = new QueryBuilder(Division.find(), query);

  const divisions = queryBuilder
    .search(searchFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    divisions.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await Division.findById(id);
  console.log(payload);
  if (!existingDivision) {
    throw new Error("Division not found.");
  }
  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });
  if (duplicateDivision) {
    throw new Error("A division with this name already exists.");
  }
  const updateDiv = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (payload.thumbnail && existingDivision.thumbnail) {
    await deleteImgCloudinary(existingDivision.thumbnail);
  }
  return updateDiv;
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return {
    data: division,
  };
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionService = {
  createDivision,
  getAllDivision,
  updateDivision,
  getSingleDivision,
  deleteDivision,
};
