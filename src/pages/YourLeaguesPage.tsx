import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

/** YourLeaguesPage: Page showing user's leagues and option to create new league
 *
 * State:
 * - leagues: Array of user's leagues (will be populated from backend later)
 *
 * Props: None
 */

interface League {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  status: 'active' | 'upcoming' | 'completed';
  nextGame?: string;
}

function YourLeaguesPage() {
  const { user } = useContext(UserContext);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeagues([
        {
          id: '1',
          name: 'Downtown Basketball League',
          description: 'Competitive league for experienced players',
          memberCount: 12,
          maxMembers: 16,
          status: 'active',
          nextGame: 'Tomorrow at 7:00 PM'
        },
        {
          id: '2',
          name: 'Weekend Warriors',
          description: 'Casual weekend games for all skill levels',
          memberCount: 8,
          maxMembers: 12,
          status: 'upcoming',
          nextGame: 'Saturday at 2:00 PM'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Leagues</h1>
            <p className="text-lg text-gray-600 mb-8">Please sign in to view your leagues.</p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Leagues</h1>
              <p className="text-lg text-gray-600">Manage your basketball leagues and create new ones</p>
            </div>
            <Link
              to="/basketball"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Basketball
            </Link>
          </div>
        </div>

        {/* Create New League Tile */}
        <div className="mb-8">
          <Link to="/basketball/create-league" className="block">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">➕</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">Create New League</h2>
                    <p className="text-orange-100 text-lg">
                      Start your own basketball league and invite players to join. Set up games, manage teams, and track standings.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200">
                      <span className="text-white font-medium">Get Started</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Your Leagues Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Leagues</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : leagues.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">🏀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Leagues Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't joined any leagues yet. Create a new league or discover existing ones to get started!
              </p>
              <div className="space-x-4">
                <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200">
                  Create League
                </button>
                <Link
                  to="/basketball"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Discover Leagues
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leagues.map((league) => (
                <LeagueTile key={league.id} league={league} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** LeagueTile: Individual league card component */
function LeagueTile({ league }: { league: League }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'upcoming':
        return '🔵';
      case 'completed':
        return '⚫';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 text-xl">🏀</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(league.status)}`}>
                <span className="mr-1">{getStatusIcon(league.status)}</span>
                {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{league.description}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Members</span>
          <span className="font-medium">{league.memberCount}/{league.maxMembers}</span>
        </div>

        {league.nextGame && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Next Game</span>
            <span className="font-medium text-orange-600">{league.nextGame}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200">
          View League
        </button>
      </div>
    </div>
  );
}

export default YourLeaguesPage;
