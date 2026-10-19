import {getStudents} from '@/get/students';

export default async  function Home() {
  const students = await getStudents();

  return (
    <>
      <p>hello</p>

      <ul>{students.map((student) =>{
        return <li>{student.name}</li>
      })}</ul>
    </>
  );
}
