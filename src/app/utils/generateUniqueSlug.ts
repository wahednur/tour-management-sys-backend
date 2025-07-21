/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";
import slugify from "slugify";

export async function generateUniqueSlug(
  name: string,
  model: Model<any>,
  type?: string, // Optional type: e.g., 'division'
  field = "slug",
  currentId: string | null = null
): Promise<string> {
  const baseSlug = slugify(name, { lower: true, strict: true });

  // Add '-division' only if type is 'division'
  const suffix = type === "division" ? "-division" : "";
  let slug = `${baseSlug}${suffix}`;
  let counter = 1;

  let exists = await model.exists(
    currentId ? { [field]: slug, _id: { $ne: currentId } } : { [field]: slug }
  );

  while (exists) {
    slug = `${baseSlug}${suffix ? `${suffix}-${counter}` : `-${counter}`}`;
    counter++;
    exists = await model.exists(
      currentId ? { [field]: slug, _id: { $ne: currentId } } : { [field]: slug }
    );
  }

  return slug;
}
