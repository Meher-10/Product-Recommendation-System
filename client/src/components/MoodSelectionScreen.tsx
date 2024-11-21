import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { moods, suggestedTags } from '../data/moodData.ts';

export default function MoodSelectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredMood, setHoveredMood] = useState(null);
  const navigate = useNavigate();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    'bg-gradient-to-r from-rose-100 to-teal-100',
    'bg-gradient-to-r from-rose-100 to-teal-100',
    'bg-gradient-to-r from-rose-100 to-teal-100'
  ];

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);

    return () => {
      clearInterval(backgroundInterval);
    };
  }, []);

  const handleMoodSelection = (mood) => {
    navigate('/mood-board');
  };

  return (
    <div className={`min-h-screen bg-neutral-50 p-8 transition-all duration-1000 ${backgrounds[backgroundIndex]}`}>
      <h1 className="text-4xl font-bold text-black text-center mb-8">Choose Your Category</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for more personalized products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              onClick={() => setSearchQuery(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {moods.map((mood) => (
          <motion.div
            key={mood.name}
            className={`${mood.color} rounded-lg p-6 cursor-pointer relative overflow-hidden transition-colors duration-300  p-8`}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHoveredMood(mood)}
            onMouseLeave={() => setHoveredMood(null)}
            onClick={() => handleMoodSelection(mood)}
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{mood.icon}</span>
              <h2 className="text-xl font-semibold text-gray-800">{mood.name}</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hoveredMood === mood ? 1 : 0, y: hoveredMood === mood ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 ${mood.hoverColor} p-4 flex flex-col justify-center`}
            >
              <p className="text-sm text-gray-800 mb-2">{mood.description}</p>
              <p className="text-xs text-gray-700 font-semibold">Example products:</p>
              <ul className="text-xs text-gray-700 list-disc list-inside">
                {mood.exampleProducts.map((product) => (
                  <li key={product}>{product}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Link
        to="/chatbot"
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        <Bot className="w-6 h-6" />
      </Link>
    </div>
  );
}