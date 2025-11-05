import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClassPage() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/teacher")
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.teachers;
        setTeachers(data || []);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setTeachers([]);
      });
  }, []);

  // Fetch classes
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/class")
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.classes;
        setClasses(data || []);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setClasses([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getTeacherName = (id) => {
    if (!Array.isArray(teachers)) return "Unknown";
    const teacher = teachers.find((t) => t._id === id);
    return teacher ? teacher.name : "Unknown";
  };

  const handleAddClass = () => {
    navigate("/admin/Add-class");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📘 Class List</h1>
        <button
          onClick={handleAddClass}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Class
        </button>
      </div>

      {loading ? (
        <p>Loading classes...</p>
      ) : classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
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
                <td className="p-2">
                  {Array.isArray(cls.subjects)
                    ? cls.subjects.join(", ")
                    : cls.subject}
                </td>
                <td className="p-2">{getTeacherName(cls.Teacher || cls.teacherId)}</td>
                <td className="p-2">{cls.department}</td>
                <td className="p-2">{cls.timing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}