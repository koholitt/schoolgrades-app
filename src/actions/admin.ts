"use server";
import { auth } from "@/lib/auth";

export async function createNewAccount(formData: FormData) {
  const newUser = await auth.api.createUser({
    body: {
      email: String(formData.get("email")), // required, The email of the user.
      password: String(formData.get("password")), // required, The password of the user.
      name: String(formData.get("name")), // required, The name of the user.
      role: "user", // A string or array of strings representing the roles to apply to the new user.
    },
  });
}
