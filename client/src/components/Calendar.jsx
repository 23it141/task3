import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HabitCalendar = ({ value, onChange }) => {
  return (
    <div className="my-4">
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};

export default HabitCalendar;
