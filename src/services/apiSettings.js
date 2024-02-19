import supabase from "./supabaseClient";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) throw new Error("Settings could not be loaded");

  return data;
}

export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    // The only column we have in settings table has an id of 1,
    // so it's okay to be hard coded, the id will not change later
    .eq("id", 1)
    .single();

  if (error) throw new Error("Could not update settings");
  return data;
}
