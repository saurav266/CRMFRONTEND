import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Department</h3>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by department"
          className="px-4 py-2 border rounded w-2/3"
        />
        <Link
          to="/admin/add-department"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Department
        </Link>
      </div>

      {/* You can map department data here */}
    </div>
  );
};

export default DepartmentList;