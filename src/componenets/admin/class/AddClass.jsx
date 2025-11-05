import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    section: '',
    department: '',
    timing: '',
    teacherId: '',
  });

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTeachers, setFetchingTeachers] = useState(true);

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
      })
      .finally(() => {
        setFetchingTeachers(false);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/users/Add-class', formData);
      alert('Class added successfully!');
      setFormData({
        name: '',
        subject: '',
        section: '',
        department: '',
        timing: '',
        teacherId: '',
      });
    } catch (err) {
      console.error('Error adding class:', err);
      alert('Failed to add class.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="timing"
          placeholder="Timing (e.g., 10:00 AM - 11:00 AM)"
          value={formData.timing}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Teacher</option>
          {fetchingTeachers ? (
            <option disabled>Loading teachers...</option>
          ) : (
            Array.isArray(teachers) &&
            teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))
          )}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Class'}
        </button>
      </form>
    </div>
  );
};

export default AddClass;