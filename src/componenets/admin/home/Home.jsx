import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const AdminHome = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  // Sample static data — replace with dynamic API data later
  const stats = [
    { label: 'Total Students', value: studentCount, color: 'bg-blue-100', text: 'text-blue-600' },
    { label: 'Total Classes', value: 45, color: 'bg-green-100', text: 'text-green-600' },
    { label: 'Total Teachers', value: teacherCount, color: 'bg-purple-100', text: 'text-purple-600' },
    { label: 'Fees Collected', value: '₹12,50,000', color: 'bg-yellow-100', text: 'text-yellow-600' },
  ];

  useEffect(() => {
    const fetchStudentCount = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/users/student');
    setStudentCount(res.data.length); // assuming res.data is an array
  } catch (err) {
    console.error('Error fetching student count:', err);
  }
};



    fetchStudentCount();
  }, []);

   useEffect(() => {
    const fetchTeacherCount = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/teacher');
        setTeacherCount(res.data.teachers.length);
      } catch (err) {
        console.error('Error fetching teacher count:', err);
      }
    };

    fetchTeacherCount();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-lg shadow-md p-5 ${stat.color} hover:shadow-lg transition duration-300`}
          >
            <h2 className={`text-md font-semibold ${stat.text}`}>{stat.label}</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;