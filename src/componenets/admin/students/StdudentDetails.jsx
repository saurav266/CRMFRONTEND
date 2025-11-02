import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/student/view/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error('Error fetching student:', err);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <div className="p-6">Loading student details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">👤 Student Details</h2>
      <ul className="space-y-2 text-gray-700 mb-6">
        <li><strong>Name:</strong> {student.name}</li>
        <li><strong>Email:</strong> {student.email}</li>
        <li><strong>Phone:</strong> {student.phone}</li>
        <li><strong>Class:</strong> {student.class}</li>
        <li><strong>Roll Number:</strong> {student.rollNumber}</li>
        <li><strong>Fees Paid:</strong> ₹{student.feesPaid}</li>
      </ul>

      <div className="flex justify-end">
        <button
          onClick={() => navigate('/admin/students')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          🔙 Close
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;