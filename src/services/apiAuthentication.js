import supabase, { supabaseUrl } from "./supabaseClient";

// Create a new user with email and password
export async function signUp({ full_name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // More user data
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("Could not create a new user");
  return data;
}

// Sign-in with email and password, if user already have an account
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

// fetch currently logged-in user from database `instead of local session`. (if there IS a current session)
export async function getLoggedInUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

// Logout current user
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// Update user data
export async function updateUser({ full_name, password, avatar }) {
  // 1. Update password OR full_name
  let newUserData;
  if (password) {
    newUserData = { password };
  }
  if (full_name) {
    newUserData = { data: { full_name } };
  }

  const { data, error } = await supabase.auth.updateUser(newUserData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload avatar image to storage
  const avatarName = `avatar-${data?.user?.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update user with the new avatar coming from storage
  const { data: finalUserData, error: finalUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
      },
    });

  if (finalUserError) throw new Error(finalUserError.message);
  return finalUserData;
}