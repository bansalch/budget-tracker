import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-beige text-black'} min-h-screen`}>

      <div className="p-4 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center my-4">Budget vs Actual Tracker</h1>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/images/coin.png"
          alt="coin"
          className="absolute w-24 top-10 left-10 animate-float-slow opacity-10"
        />
        <img
          src="/images/house.png"
          alt="house"
          className="absolute w-20 bottom-20 right-10 animate-float-fast opacity-10"
        />
        <img
          src="/images/food.png"
          alt="food"
          className="absolute w-16 top-1/3 left-1/2 animate-float-slower opacity-10"
        />
      </div>

    </div>
  );
}

export default App;
