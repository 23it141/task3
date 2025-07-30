import React from 'react';

const HabitCard = ({ habit }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{habit.name}</h3>
        <p className="text-gray-500">Streak: {habit.streak} days</p>
      </div>
      {/* Add check-in button or calendar here */}
    </div>
  );
};

export default HabitCard;
