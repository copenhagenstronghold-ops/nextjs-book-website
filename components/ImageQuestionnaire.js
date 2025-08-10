import React, { useState } from 'react';
import { Heart, X, Check, ArrowRight } from 'lucide-react';

export default function ImageQuestionnaire({ onQuizComplete }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userPreferences, setUserPreferences] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const images = [
    { url: 'https://placehold.co/600x400/90B880/ffffff?text=Earthy+Mushrooms', category: 'Earthy' },
    { url: 'https://placehold.co/600x400/C19642/ffffff?text=Spicy+Curry', category: 'Spicy' },
    { url: 'https://placehold.co/600x400/3E2723/ffffff?text=Bitter+Dark+Chocolate', category: 'Bitter' },
    { url: 'https://placehold.co/600x400/F5C242/ffffff?text=Tangy+Citrus', category: 'Tangy' },
    { url: 'https://placehold.co/600x400/A084E8/ffffff?text=Sweet+Berries', category: 'Sweet' },
    { url: 'https://placehold.co/600x400/78909C/ffffff?text=Salty+Seafood', category: 'Salty' },
  ];

  const handlePreference = (preference) => {
    const currentCategory = images[currentImageIndex].category;
    const newPreferences = { ...userPreferences, [currentCategory]: preference };
    setUserPreferences(newPreferences);

    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setQuizCompleted(true);
      onQuizComplete(newPreferences);
    }
  };

  const progress = ((currentImageIndex + (quizCompleted ? 1 : 0)) / images.length) * 100;

  if (quizCompleted) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center p-8">
        <div className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border border-slate-700">
          <Check className="text-emerald-400 w-20 h-20 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4 text-white">All Done!</h2>
          <p className="text-slate-400 text-lg">
            Thanks for sharing your tastes with us. This data will help us build a more personalized experience just for you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-xl bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 border border-slate-700">

        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-slate-400 text-sm">{currentImageIndex + 1} of {images.length}</p>

        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-slate-700">
          <img
            src={images[currentImageIndex].url}
            alt={`Image for ${images[currentImageIndex].category}`}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="flex justify-between items-center gap-4 pt-4">
          <button
            onClick={() => handlePreference('dislike')}
            className="flex-1 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
          >
            <X className="inline-block mr-2" /> Dislike
          </button>
          <button
            onClick={() => handlePreference('like')}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Heart className="inline-block mr-2" /> Like
          </button>
        </div>
      </div>
    </div>
  );
}
