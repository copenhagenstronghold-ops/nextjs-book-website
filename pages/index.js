import React, { useState } from 'react';
import TasteProfilerLandingPage from '../components/TasteProfilerLandingPage';
import ImageQuestionnaire from '../components/ImageQuestionnaire';

export default function App() {
  // 'landing' is the initial view. We will switch to 'quiz' and then 'results'.
  const [view, setView] = useState('landing');
  const [tasteProfile, setTasteProfile] = useState({});

  // This function is passed to the landing page component to trigger the view switch.
  const handleStartQuiz = () => {
    setView('quiz');
  };

  // This function receives the completed profile and switches to the results view.
  const handleQuizComplete = (profile) => {
    setTasteProfile(profile);
    setView('results');
    // In a real app, you would send the taste profile to your database here.
    console.log("Final taste profile collected:", profile);
  };

  // The component conditionally renders based on the 'view' state.
  return (
    <>
      {view === 'landing' && <TasteProfilerLandingPage onStartQuiz={handleStartQuiz} />}
      {view === 'quiz' && <ImageQuestionnaire onQuizComplete={handleQuizComplete} />}
      {view === 'results' && (
        <div className="bg-slate-900 min-h-screen text-white flex items-center justify-center p-8">
          <div className="bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg text-center border border-slate-700">
            <h2 className="text-3xl font-bold mb-4 text-emerald-400">Profile Complete!</h2>
            <p className="text-slate-400 text-lg mb-6">
              Your unique taste profile has been saved. We can now provide you with tailored recommendations.
            </p>
            <div className="text-left bg-slate-900 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-2 text-pink-400">Your Preferences:</h3>
              <ul className="space-y-2">
                {Object.entries(tasteProfile).map(([key, value]) => (
                  <li key={key} className="text-slate-300">
                    <span className="font-semibold capitalize text-white">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setView('landing')}
              className="mt-8 px-8 py-3 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-colors"
            >
              Go Back to Start
            </button>
          </div>
        </div>
      )}
    </>
  );
}
