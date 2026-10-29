"use server";
import { auth } from "./auth";

export async function createNewAccount(formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  await auth.api.signUpEmail({ body: { email, password, name } });
}
