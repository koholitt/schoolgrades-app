"use server";

import { db } from "@/prisma/db";

export async function createStudent(formData: FormData) {
  await db.orm.public.Student.create({
    name: String(formData.get("firstName")),
    middleName: String(formData.get("middleName")),
    lastName: String(formData.get("lastName")),
    email: String(formData.get("email")),
  });
}
