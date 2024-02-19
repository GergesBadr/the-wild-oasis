import supabase from "./supabaseClient";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("Could not load guests from database");
  return data;
}

export async function createGuest(guestData) {
  const { data, error } = await supabase
    .from("guests")
    .insert(guestData)
    .select();

  if (error) throw new Error(error.message);
  return data;
}
