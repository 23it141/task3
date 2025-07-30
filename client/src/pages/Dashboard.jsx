import React, { useState, useEffect } from 'react';
import HabitCard from '../components/HabitCard';
import HabitCalendar from '../components/Calendar';
import { getHabits, addHabit, checkInHabit } from '../api/habits';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (token) {
      getHabits(token).then(res => {
        console.log('API habits response:', res);
        if (Array.isArray(res)) {
          setHabits(res);
          setApiError('');
        } else if (res && Array.isArray(res.habits)) {
          setHabits(res.habits);
          setApiError('');
        } else if (res && res.error) {
          setApiError(res.error);
          setHabits([]);
        } else {
          setApiError('Unexpected API response.');
          setHabits([]);
        }
      }).catch((err) => {
        setApiError('Could not fetch habits.');
        setHabits([]);
      });
    } else {
      setHabits([]);
      setApiError('');
    }
  }, [token]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!name) return;
    const newHabit = await addHabit({ name, description }, token);
    setHabits([...habits, newHabit]);
    setName('');
    setDescription('');
  };

  const handleCheckIn = async (id) => {
    await checkInHabit(id, token);
    getHabits(token).then(setHabits);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {!token && (
        <div className="mb-6 card text-center text-red-600 font-semibold">
          Please log in to view and manage your habits.
        </div>
      )}
      {apiError && (
        <div className="mb-6 card text-center text-red-600 font-semibold">
          {apiError}
        </div>
      )}
      {token && !apiError && (
        <>
          <form onSubmit={handleAddHabit} className="mb-6 card">
            <h2 className="text-xl mb-2">Add a new habit</h2>
            <input
              className="mb-2 w-full"
              type="text"
              placeholder="Habit name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <textarea
              className="mb-2 w-full"
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button className="btn-primary w-full" type="submit">Add Habit</button>
          </form>
          <div>
            <h2 className="text-xl font-semibold mb-3">Your Habits</h2>
            {Array.isArray(habits) && habits.length === 0 && <div>No habits yet.</div>}
            {Array.isArray(habits) && habits.map(habit => (
              <div key={habit._id} className="mb-4">
                <HabitCard habit={habit} />
                <button className="btn-primary mt-2" onClick={() => handleCheckIn(habit._id)}>Check In</button>
                <button className="ml-4 underline text-blue-600" onClick={() => setSelectedHabit(habit)}>Show Calendar</button>
                {selectedHabit && selectedHabit._id === habit._id && (
                  <HabitCalendar
                    value={calendarValue}
                    onChange={setCalendarValue}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
