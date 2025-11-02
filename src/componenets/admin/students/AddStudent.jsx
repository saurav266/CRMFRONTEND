import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    rollNumber: '',
    feesPaid: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/Add-student', formData);
      alert('Student added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        rollNumber: '',
        feesPaid: '',
        password: '',
      });
      navigate('/admin/students');
    } catch (err) {
      console.error('Error adding student:', err);
      alert('Failed to add student');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">➕ Add New Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'name', type: 'text' },
          { name: 'email', type: 'email' },
          { name: 'phone', type: 'text' },
          { name: 'branch', type: 'text' },
          { name: 'rollNumber', type: 'text' },
          { name: 'feesPaid', type: 'number' },
          { name: 'password', type: 'password' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            value={formData[field.name]}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
        <button
          type="submit"
          className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          ➕ Add Student
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to cancel? All entered data will be lost.')) {
              setFormData({
                name: '',
                email: '',
                phone: '',
                branch: '',
                rollNumber: '',
                feesPaid: '',
                password: '',
              });
              navigate('/admin/students'); // Optional: remove this line if you just want to clear the form
            }
          }}
          className="w-full md:w-1/2 bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition"
        >
          ❌ Cancel
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddStudent;