'use client';

import React, { useState } from 'react';
import { Leaf, Award, UtensilsCrossed, Zap, Droplet, Layers } from 'lucide-react';

// This component simulates an advanced Flavor Genome Profiler demonstration.
// It showcases the AI's ability to handle complex flavor profiles beyond
// just sweet and salty, focusing on sour, bitter, and umami.

// Define the shape of our berry data with new properties for advanced flavor analysis.
type Berry = {
  name: string;
  sweetness: number;
  sourness: number;
  bitterness: number;
  umami: number;
  emoji: string;
};

// Define the shape of a recommended berry mix object.
type RecommendedBerry = {
  name: string;
  emoji: string;
  description: string;
};

// Define a union type for our sorting criteria to ensure type-safety.
type SortCriteria = 'sourest' | 'bitter' | 'umami' | 'complex';

const BERRIES: Berry[] = [
  { name: 'Strawberry', sweetness: 8.5, sourness: 3.0, bitterness: 1.0, umami: 0.5, emoji: '🍓' },
  { name: 'Raspberry', sweetness: 7.0, sourness: 5.5, bitterness: 2.0, umami: 1.5, emoji: ' малины' },
  { name: 'Blueberry', sweetness: 8.0, sourness: 2.5, bitterness: 2.0, umami: 0.5, emoji: '🫐' },
  { name: 'Blackberry', sweetness: 6.5, sourness: 4.5, bitterness: 3.5, umami: 1.0, emoji: '🍇' },
  { name: 'Cranberry', sweetness: 2.0, sourness: 9.5, bitterness: 4.0, umami: 0.5, emoji: '🍒' },
  { name: 'Cherry', sweetness: 7.5, sourness: 4.0, bitterness: 1.5, umami: 0.5, emoji: '🍒' },
  { name: 'Gooseberry', sweetness: 4.0, sourness: 8.5, bitterness: 3.0, umami: 1.0, emoji: '🥝' },
  { name: 'Elderberry', sweetness: 5.0, sourness: 6.0, bitterness: 5.0, umami: 2.0, emoji: '🍇' },
  { name: 'Lingonberry', sweetness: 3.5, sourness: 7.5, bitterness: 4.5, umami: 1.0, emoji: '🍓' },
  { name: 'Currant (Red)', sweetness: 3.0, sourness: 9.0, bitterness: 3.0, umami: 0.5, emoji: '🍇' },
  { name: 'Currant (Black)', sweetness: 5.5, sourness: 7.0, bitterness: 4.0, umami: 2.5, emoji: '🍇' },
  { name: 'Mulberry', sweetness: 8.0, sourness: 3.0, bitterness: 1.0, umami: 1.0, emoji: '🍇' },
  { name: 'Boysenberry', sweetness: 7.0, sourness: 6.0, bitterness: 2.5, umami: 1.5, emoji: '🍇' },
  { name: 'Cloudberry', sweetness: 6.0, sourness: 5.0, bitterness: 1.5, umami: 1.0, emoji: '🍊' },
  { name: 'Acai', sweetness: 4.5, sourness: 5.0, bitterness: 3.5, umami: 2.5, emoji: '🍇' },
  { name: 'Huckleberry', sweetness: 6.5, sourness: 4.0, bitterness: 2.5, umami: 1.0, emoji: '🫐' },
  { name: 'Juneberry', sweetness: 7.0, sourness: 3.5, bitterness: 1.5, umami: 0.5, emoji: '🫐' },
  { name: 'Salmonberry', sweetness: 5.0, sourness: 5.5, bitterness: 2.0, umami: 1.0, emoji: '🍑' },
  { name: 'Thimbleberry', sweetness: 6.0, sourness: 4.0, bitterness: 1.0, umami: 0.5, emoji: '🍓' },
  { name: 'Bilberry', sweetness: 7.5, sourness: 3.5, bitterness: 2.0, umami: 1.0, emoji: '🫐' },
  { name: 'Wineberry', sweetness: 7.0, sourness: 4.5, bitterness: 2.0, umami: 1.0, emoji: '🍓' },
  { name: 'Tayberry', sweetness: 7.0, sourness: 5.0, bitterness: 2.0, umami: 1.0, emoji: '🍓' },
  { name: 'Marionberry', sweetness: 7.5, sourness: 5.0, bitterness: 2.5, umami: 1.5, emoji: '🍇' },
  { name: 'Loganberry', sweetness: 6.5, sourness: 7.0, bitterness: 3.0, umami: 1.0, emoji: '🍓' },
  { name: 'Dewberry', sweetness: 7.0, sourness: 4.0, bitterness: 2.0, umami: 1.0, emoji: '🍇' },
  { name: 'Serviceberry', sweetness: 7.0, sourness: 3.0, bitterness: 1.0, umami: 0.5, emoji: '🫐' },
  { name: 'Buffaloberry', sweetness: 3.0, sourness: 8.0, bitterness: 5.0, umami: 1.5, emoji: '🍒' },
  { name: 'Crowberry', sweetness: 2.5, sourness: 6.5, bitterness: 4.5, umami: 2.0, emoji: '🍇' },
  { name: 'Saskatoon Berry', sweetness: 7.0, sourness: 3.0, bitterness: 1.0, umami: 1.0, emoji: '🫐' },
  { name: 'Goji Berry', sweetness: 6.0, sourness: 2.0, bitterness: 0.5, umami: 2.0, emoji: '🍒' },
  { name: 'Sea Buckthorn', sweetness: 1.0, sourness: 9.0, bitterness: 3.0, umami: 0.5, emoji: '🟠' },
  { name: 'Barberry', sweetness: 2.0, sourness: 8.5, bitterness: 3.5, umami: 1.0, emoji: '🔴' },
  { name: 'Bearberry', sweetness: 4.0, sourness: 2.0, bitterness: 2.5, umami: 1.0, emoji: '🔴' },
  { name: 'Chokeberry', sweetness: 2.0, sourness: 9.0, bitterness: 6.0, umami: 2.0, emoji: '🟣' },
  { name: 'Currant (White)', sweetness: 6.0, sourness: 3.0, bitterness: 1.0, umami: 1.0, emoji: '⚪' },
  { name: 'Nanking Cherry', sweetness: 7.0, sourness: 5.0, bitterness: 1.5, umami: 1.0, emoji: '🔴' },
  { name: 'Red Huckleberry', sweetness: 6.5, sourness: 4.5, bitterness: 2.0, umami: 1.0, emoji: '🔴' },
  { name: 'Salal Berry', sweetness: 5.5, sourness: 5.0, bitterness: 3.0, umami: 1.5, emoji: '🟣' },
  { name: 'Black Huckleberry', sweetness: 6.0, sourness: 4.0, bitterness: 3.0, umami: 1.5, emoji: '🫐' },
  { name: 'Black Mulberry', sweetness: 7.5, sourness: 4.0, bitterness: 2.0, umami: 1.0, emoji: '🍇' },
  { name: 'Black Raspberry', sweetness: 6.5, sourness: 5.0, bitterness: 3.0, umami: 1.5, emoji: ' малины' },
  { name: 'Chokecherry', sweetness: 2.5, sourness: 8.5, bitterness: 5.5, umami: 1.0, emoji: '🍒' },
  { name: 'Farkleberry', sweetness: 5.0, sourness: 3.0, bitterness: 2.5, umami: 0.5, emoji: '🫐' },
  { name: 'Himalayan Blackberry', sweetness: 7.0, sourness: 4.0, bitterness: 2.5, umami: 1.0, emoji: '🍇' },
  { name: 'Honeyberry', sweetness: 6.5, sourness: 3.0, bitterness: 1.0, umami: 1.0, emoji: '🫐' },
  { name: 'Jostaberry', sweetness: 6.0, sourness: 6.5, bitterness: 3.0, umami: 2.0, emoji: '🍇' },
  { name: 'Mayberry', sweetness: 5.5, sourness: 6.0, bitterness: 4.0, umami: 1.5, emoji: '🍇' },
  { name: 'Mallowberry', sweetness: 7.0, sourness: 2.0, bitterness: 0.5, umami: 0.5, emoji: '🍒' },
  { name: 'Partridgeberry', sweetness: 3.0, sourness: 7.0, bitterness: 4.0, umami: 1.0, emoji: '🔴' },
  { name: 'Snowberry', sweetness: 1.0, sourness: 1.0, bitterness: 0.5, umami: 0.5, emoji: '⚪' }
];

const createBerryKey = (berry: Berry) => `${berry.name}-${berry.sweetness}-${berry.sourness}`;

export default function App() {
  const [berries, setBerries] = useState(BERRIES);
  const [sortOrder, setSortOrder] = useState<SortCriteria>('sourest');
  const [recommendedMix, setRecommendedMix] = useState<RecommendedBerry[] | null>(null);
  const [flavorProfile, setFlavorProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the sorting logic
  const handleSort = (criteria: SortCriteria) => {
    setSortOrder(criteria);
    const sortedBerries = [...berries];
    if (criteria === 'sourest') {
      sortedBerries.sort((a, b) => b.sourness - a.sourness);
    } else if (criteria === 'bitter') {
      sortedBerries.sort((a, b) => b.bitterness - a.bitterness);
    } else if (criteria === 'umami') {
      sortedBerries.sort((a, b) => b.umami - a.umami);
    } else { // complex
      sortedBerries.sort((a, b) => {
        const aComplex = a.sourness + a.bitterness + a.umami;
        const bComplex = b.sourness + b.bitterness + b.umami;
        return bComplex - aComplex;
      });
    }
    setBerries(sortedBerries);
  };

  // Function to simulate the AI generating a recipe
  const generateRecipe = () => {
    setIsLoading(true);
    setTimeout(() => {
      let newMix: RecommendedBerry[] = [];
      const lowercasedProfile = flavorProfile.toLowerCase();

      // The AI logic (simulated)
      if (lowercasedProfile.includes('bitter') && lowercasedProfile.includes('sour')) {
          newMix = [
              { name: 'Chokeberry', emoji: '🟣', description: 'Provides a powerful, tannic bitterness and sharp sourness.' },
              { name: 'Elderberry', emoji: '🍇', description: 'Adds depth with its complex bitter and earthy notes.' },
              { name: 'Lingonberry', emoji: '🍓', description: 'Offers a bright, tart counterpoint to the bitter flavors.' }
          ];
      } else if (lowercasedProfile.includes('umami')) {
          newMix = [
              { name: 'Acai', emoji: '�', description: 'Forms an umami-rich base with earthy, chocolatey notes.' },
              { name: 'Black Currant', emoji: '🍇', description: 'Adds a savory depth and aromatic finish.' },
              { name: 'Goji Berry', emoji: '🍒', description: 'Provides a slightly sweet, savory complexity.' }
          ];
      } else if (lowercasedProfile.includes('sour')) {
          newMix = [
              { name: 'Cranberry', emoji: '🍒', description: 'The dominant source of intense, mouth-puckering sourness.' },
              { name: 'Gooseberry', emoji: '🥝', description: 'Adds a tangy, acidic punch.' },
              { name: 'Red Currant', emoji: '🍇', description: 'Finishes with a sharp, clean tartness.' }
          ];
      } else {
          newMix = [
              { name: 'Raspberry', emoji: ' малины', description: 'A versatile berry with balanced sweet and sour notes.' },
              { name: 'Huckleberry', emoji: '🫐', description: 'Provides a pleasant, mildly tart flavor.' },
              { name: 'Blackberry', emoji: '🍇', description: 'Adds a deeper, earthy undertone.' }
          ];
      }
      setRecommendedMix(newMix);
      setIsLoading(false);
    }, 1500); // Simulate a network delay for the AI
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <Leaf className="text-emerald-500 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Flavor Genome Profiler</h1>
          <p className="text-lg text-gray-600 mt-2">
            Showcasing AI-powered flavor discovery beyond the obvious.
          </p>
        </header>

        {/* Sorting Controls */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Layers className="text-sky-500" /> Advanced Flavor Analysis</h2>
          <p className="text-gray-600 mb-6">
            The AI has analyzed berries on a multi-dimensional scale. This demonstrates a deeper
            understanding of flavor than simple sweet/salty metrics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleSort('sourest')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${sortOrder === 'sourest' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-orange-200'}`}
            >
              <Zap /> Most Sour
            </button>
            <button
              onClick={() => handleSort('bitter')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${sortOrder === 'bitter' ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-amber-200'}`}
            >
              <Droplet /> Most Bitter
            </button>
            <button
              onClick={() => handleSort('umami')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${sortOrder === 'umami' ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-fuchsia-200'}`}
            >
              <Award /> Most Umami
            </button>
            <button
              onClick={() => handleSort('complex')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${sortOrder === 'complex' ? 'bg-lime-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-lime-200'}`}
            >
              <Layers /> Most Complex
            </button>
          </div>
        </section>

        {/* Recipe Recommender Section */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><UtensilsCrossed className="text-rose-500" /> AI Chef: Complex Recipe Recommender</h2>
          <p className="text-gray-600 mb-4">
            Enter a desired flavor profile (e.g., &quot;bitter and sour&quot; or &quot;umami-rich&quot;) and let the AI suggest
            the perfect berry mix for a sophisticated culinary creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="e.g., bitter and sour"
              value={flavorProfile}
              onChange={(e) => setFlavorProfile(e.target.value)}
              className="flex-grow p-3 rounded-full bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={generateRecipe}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>

          {recommendedMix && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2 text-rose-500">Recommended Mix:</h3>
              <ul className="space-y-3">
                {recommendedMix.map((berry, index) => (
                  <li key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-2xl">{berry.emoji}</span>
                    <div>
                      <p className="font-semibold">{berry.name}</p>
                      <p className="text-sm text-gray-500">{berry.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Berry List */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-emerald-500">Berry Database</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {berries.map((berry) => (
              <div key={createBerryKey(berry)} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:scale-105 transition-transform duration-200">
                <span className="text-4xl">{berry.emoji}</span>
                <span className="mt-2 text-sm font-semibold text-gray-900">{berry.name}</span>
                <div className="text-xs text-gray-500 mt-1">
                  <p>Sour: <span className="font-mono">{berry.sourness.toFixed(1)}</span></p>
                  <p>Bitter: <span className="font-mono">{berry.bitterness.toFixed(1)}</span></p>
                  <p>Umami: <span className="font-mono">{berry.umami.toFixed(1)}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
