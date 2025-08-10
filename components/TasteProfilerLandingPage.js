import React, { useState } from 'react';
import { Sparkles, ChefHat, Search } from 'lucide-react';

export default function TasteProfilerLandingPage({ onStartQuiz }) {
  const [userQuestion, setUserQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const curatedQuestions = [
    "What kind of flour will give my bread a tangier flavor?",
    "How can I make my coffee taste less bitter and more fruity?",
    "What's the best way to get a crispy crust on my sourdough?",
    "Which herbs pair best with a spicy chicken dish?",
    "How does cold fermentation change the texture of dough?",
  ];

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setSubmittedQuestions([...submittedQuestions, userQuestion.trim()]);
      setUserQuestion('');
      console.log(`User submitted: "${userQuestion.trim()}"`);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans p-8 md:p-12 antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="flex flex-col items-center text-center space-y-4">
          <Sparkles className="text-pink-400 w-16 h-16" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Your Palate, Your Questions</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Explore the science of flavor and get answers tailored to your unique taste.
          </p>
        </header>

        <section className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-pink-400 flex items-center gap-2">
            <ChefHat /> Popular Questions About Taste
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {curatedQuestions.map((question, index) => (
              <div
                key={index}
                onClick={() => console.log(`User clicked on: "${question}"`)}
                className="bg-slate-900 p-4 rounded-xl cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <p className="text-slate-300 text-sm font-semibold">{question}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-pink-400 flex items-center gap-2">
            <Search /> Ask Your Own Question
          </h2>
          <p className="text-slate-300 mb-6">
            Have a specific question about taste or technique? Ask our specialized AI.
          </p>
          <form onSubmit={handleSubmitQuestion} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="E.g., How do I reduce the acidity in my tomato sauce?"
              className="flex-grow p-4 rounded-full bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-slate-700"
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-pink-600 hover:bg-pink-700 transition-colors rounded-full font-bold text-white shadow-lg shadow-pink-500/20"
            >
              Submit
            </button>
          </form>
          <div className="mt-8">
            <button
              onClick={onStartQuiz}
              className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-full font-bold text-white text-lg shadow-lg shadow-emerald-500/20"
            >
              Start Your Taste Profile Quiz
            </button>
          </div>
        </section>

        {submittedQuestions.length > 0 && (
          <section className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-pink-400">Your Submitted Questions</h2>
            <ul className="space-y-3">
              {submittedQuestions.map((q, index) => (
                <li key={index} className="text-slate-300 text-sm p-4 bg-slate-900 rounded-lg border border-slate-700">
                  {q}
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}
