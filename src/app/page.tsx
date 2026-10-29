import { Suspense } from "react";
import { connection } from "next/server";
import { getStudents } from "@/data/students";
import { createStudent } from "@/actions/students";

async function StudentList() {
  await connection(); // wait for a real request instead of pre-rendering, gives each user it's unique instance
  const students = await getStudents();

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}

export default async function Home() {
  return (
    <>
      <form action={createStudent}>
        <label htmlFor="name">name</label>
        <input type="text" name="firstName" id="name" required />

        <label htmlFor="middleName">middleName</label>
        <input type="text" name="middleName" id="middleName" />

        <label htmlFor="lastName">lastName</label>
        <input type="text" name="lastName" id="lastName" required />

        <label htmlFor="Email">Email</label>
        <input type="email" name="email" id="Email" required />

        <button type="submit">Submit</button>
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <StudentList />
      </Suspense>
    </>
  );
}
