import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ClassPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  const classes = [
    {
      name: "Class 1",
      section: "A",
      subject: "Mathematics",
      teacherId: "t001",
      department: "Science",
      timing: "9:00 AM - 10:30 AM",
    },
    {
      name: "Class 2",
      section: "B",
      subject: "English",
      teacherId: "t002",
      department: "Arts",
      timing: "11:00 AM - 12:30 PM",
    },
  ];

  const getTeacherName = (id) => {
    const teacher = teachers.find((t) => t._id === id);
    return teacher ? teacher.name : "Unknown";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Class List</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Section</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Teacher</th>
            <th className="p-2">Department</th>
            <th className="p-2">Timing</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{cls.name}</td>
              <td className="p-2">{cls.section}</td>
              <td className="p-2">{cls.subject}</td>
              <td className="p-2">{getTeacherName(cls.teacherId)}</td>
              <td className="p-2">{cls.department}</td>
              <td className="p-2">{cls.timing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}