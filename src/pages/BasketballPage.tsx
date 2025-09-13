import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

/** BasketballPage: Main basketball page with navigation tiles
 *
 * State: None
 * Props: None
 */

function BasketballPage() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basketball</h1>
          <p className="text-lg text-gray-600">Choose your basketball experience</p>
        </div>

        {/* Main Tiles Container */}
        <div className="space-y-8">
          {/* Quickplay Tile */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to="/guest/basketball" className="block p-8">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🏀</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Quickplay</h2>
                  <p className="text-gray-600 text-lg">
                    Jump into a quick basketball game with friends. No setup required - just add players and start playing!
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Discover Leagues Tile */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🔍</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Leagues</h2>
                  <p className="text-gray-600 text-lg">
                    Find and join basketball leagues in your area. Connect with other players and compete in organized games.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Your Leagues Tile */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {user ? (
              <Link to="/basketball/your-leagues" className="block p-8">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Leagues</h2>
                    <p className="text-gray-600 text-lg">
                      Manage your leagues, view standings, and track your team's progress.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Leagues</h2>
                    <p className="text-gray-600 text-lg">
                      Sign in to view and manage your basketball leagues.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Play?</h3>
            <p className="text-gray-600 mb-6">
              Whether you're looking for a quick pickup game or want to join a competitive league,
              we've got you covered. Start with Quickplay to get going immediately!
            </p>
            <Link
              to="/guest/basketball"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Start Quickplay
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketballPage;