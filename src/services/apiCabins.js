import supabase, { supabaseUrl } from "./supabaseClient";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Could not load cabins from database");
  return data;
}

export async function addNewCabin(newCabinData) {
  const imageHasPath = newCabinData.image?.startsWith?.(supabaseUrl);

  // 1. Get image data
  const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = imageHasPath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  const imageFile = newCabinData.image;

  // 2. Create cabin
  const { error: cabinError } = await supabase
    .from("cabins")
    .insert({ ...newCabinData, image: imagePath });
  if (cabinError) throw new Error("Could not add cabin");

  // 3. Upload image to storage, if it is not already exist
  if (!imageHasPath) {
    const { error: imageError } = await supabase.storage
      .from("cabin_images")
      .upload(imageName, imageFile);
    if (imageError) throw new Error("Not valid cabin image provided");
  }
}

export async function deleteCabin(cabin) {
  // 1. Delete image
  const imagePathInTable = cabin.image;
  const imageInStorage = imagePathInTable.split("cabin_images/")[1];
  const { error: imageError } = await supabase.storage
    .from("cabin_images")
    .remove(imageInStorage);
  if (imageError)
    throw new Error("Could not delete image from database storage");

  // 2. Delete cabin
  const { error: cabinError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);
  if (cabinError) throw new Error("Cabin could not be deleted");
}

export async function updateCabin(updatedCabinData) {
  const { editCabinId, ...newCabinValues } = updatedCabinData;
  const { data, error } = await supabase
    .from("cabins")
    .update(newCabinValues)
    .eq("id", editCabinId);
  if (error) {
    throw new Error("Cabin could not be updated");
  }
  return data;
}
