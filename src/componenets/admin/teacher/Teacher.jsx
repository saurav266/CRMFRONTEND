import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherSection = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    salary: '',
    password: '',
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/teacher');
        setTeachers(res.data.teachers);
      } catch (err) {
        console.error('Error fetching teachers:', err);
      }
    };
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/teacher', formData);
      alert('Teacher added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        salary: '',
        password: '',
      });
      setShowForm(false);
      navigate('/admin/home');
    } catch (err) {
      console.error(err);
      alert('Error adding teacher');
    }
  };
const handleView = (id) => {
    navigate(`/admin/teacher/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/teacher/edit/${id}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/teacher/${id}`);
        setTeachers((prev) => prev.filter((t) => t._id !== id));
        alert('Teacher deleted successfully!');
      } catch (err) {
        console.error('Error deleting teacher:', err);
        alert('Failed to delete teacher');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-xl">
      <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        👩‍🏫 Teacher Management
      </h2>

      <div className="flex justify-between items-center mb-8">
        <p className="text-xl text-gray-700">
          Total Teachers: <span className="font-bold text-blue-600">{teachers.length}</span>
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
        >
          {showForm ? 'Cancel' : '➕ Add Teacher'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-in"
        >
          {['name', 'email', 'phone', 'subject', 'salary', 'password'].map((field) => (
            <input
              key={field}
              type={field === 'password' ? 'password' : field === 'salary' ? 'number' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          ))}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Teacher
            </button>
          </div>
        </form>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">📋 Teacher List</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold text-blue-700 mb-2">{teacher.name}</h4>
            <p className="text-gray-600"><strong>Email:</strong> {teacher.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {teacher.phone}</p>
            <p className="text-gray-600"><strong>subject:</strong> {teacher.subject}</p>
            <p className="text-gray-600"><strong>Salary:</strong> ₹{teacher.salary}</p>
            <p className="text-gray-600"><strong>Status:</strong> {teacher.isActive ? '✅ Active' : '❌ Inactive'}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleView(teacher._id)}
                className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(teacher._id)}
                className="text-sm bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(teacher._id)}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSection;