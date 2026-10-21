import { db } from "@/prisma/db";

export async function getStudents() {
  try {
    const students = await db.orm.public.Student.all();
    return students;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw error;
  }
}
