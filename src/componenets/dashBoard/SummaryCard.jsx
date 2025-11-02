import React from 'react';

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4 hover:shadow-md transition">
      {/* Icon */}
      <div className="text-blue-600 text-3xl">
        {icon}
      </div>

      {/* Text and Number */}
      <div>
        <p className="text-sm text-gray-500">{text}</p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;