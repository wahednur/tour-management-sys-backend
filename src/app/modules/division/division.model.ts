import { model, Schema } from "mongoose";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

divisionSchema.pre("validate", async function (next) {
  if (this.isModified("name")) {
    this.slug = await generateUniqueSlug(
      this.name,
      Division,
      "-division",
      "slug",
      this._id?.toString() || null
    );
  }
  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
