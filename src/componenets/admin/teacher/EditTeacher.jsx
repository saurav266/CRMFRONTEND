import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    salary: '',
    password: '',
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/teacher/${id}`);
        const { name, email, phone, subject, salary } = res.data.teacher;
        setFormData({ name, email, phone, subject, salary, password: '' });
      } catch (err) {
        console.error('Error fetching teacher:', err);
        alert('Failed to load teacher data');
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
      console.error('Error updating teacher:', err);
      alert('Failed to update teacher');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">✏️ Edit Teacher</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['name', 'email', 'phone', 'subject', 'salary', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : field === 'salary' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required={field !== 'password'} // password optional for update
          />
        ))}
        <div className="md:col-span-2 flex justify-between gap-4">
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Update Teacher
      </button> 
      <button
        type="button"
        onClick={() => navigate('/admin/teachers')}
        className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
      >
        Cancel
      </button>
</div>
      </form>
    </div>
  );
};

export default EditTeacher;