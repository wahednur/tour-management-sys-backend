/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";
import slugify from "slugify";

export async function generateUniqueSlug(
  name: string,
  model: Model<any>,
  suffix = "",
  field = "slug",
  currentId: string | null = null
): Promise<string> {
  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = suffix ? `${baseSlug}${suffix}` : baseSlug;
  let counter = 1;

  let exists = await model.exists(
    currentId
      ? {
          [field]: slug,
          _id: { $ne: currentId },
        }
      : { [field]: slug }
  );

  while (exists) {
    slug = suffix
      ? `${baseSlug}${suffix}-${counter}`
      : `${baseSlug}-${counter}`;
    counter++;
    exists = await model.exists(
      currentId
        ? {
            [field]: slug,
            _id: { $ne: currentId },
          }
        : { [field]: slug }
    );
  }

  return slug;
}
