"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const roles = ["admin", "teacher", "student"];

export async function createNewAccount(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role != "admin") throw new Error("Unauthorized");

  const role = String(formData.get("role"));
  if (!roles.includes(role)) throw new Error("Invalid role");

  const newUser = await auth.api.createUser({
    body: {
      email: String(formData.get("email")), // required, The email of the user.
      password: String(formData.get("password")), // required, The password of the user.
      name: String(formData.get("name")), // required, The name of the user.
      role, // A string or array of strings representing the roles to apply to the new user.
    },
  });
}
