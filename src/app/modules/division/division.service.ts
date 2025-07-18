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

const getAllDivision = async () => {
  const division = await Division.find({});
  const totalDivisions = await Division.countDocuments();
  return {
    data: division,
    meta: {
      total: totalDivisions,
    },
  };
};

export const DivisionService = {
  createDivision,
  getAllDivision,
};
