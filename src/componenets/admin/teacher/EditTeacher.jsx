import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    salary: '',
    password: '',
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/teacher/${id}`);
        const { name, email, phone, department, salary } = res.data.teacher;
        setFormData({ name, email, phone, department, salary, password: '' });
      } catch (err) {
        console.error('Error fetching teacher:', err);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/users/teacher/${id}`, formData);
      alert('Teacher updated successfully!');
      navigate('/admin/home');
    } catch (err) {
      console.error(err);
      alert('Error updating teacher');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Teacher</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {['name', 'email', 'phone', 'department', 'salary', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : field === 'salary' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required={field !== 'password'}
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default EditTeacher;
