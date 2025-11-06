import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/teacher/${id}`);
        setTeacher(res.data.teacher);
      } catch (err) {
        console.error('Error fetching teacher:', err);
        alert('Failed to load teacher data');
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading teacher details...</div>;
  }

  if (!teacher) {
    return <div className="text-center mt-10 text-red-600">Teacher not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">👤 Teacher Details</h2>
      <div className="space-y-4 text-lg text-gray-700">
        <p><strong>Name:</strong> {teacher.name}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Phone:</strong> {teacher.phone}</p>
        <p><strong>Subject:</strong> {teacher.subject}</p>
        <p><strong>Salary:</strong> ₹{teacher.salary}</p>
        <p><strong>Status:</strong> {teacher.isActive ? '✅ Active' : '❌ Inactive'}</p>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate(`/admin/teacher/edit/${teacher._id}`)}
          className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => navigate('/admin/teachers')}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewTeacher;