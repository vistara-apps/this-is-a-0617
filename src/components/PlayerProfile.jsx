import React, { useState } from 'react'
import { User, TrendingUp, Target, Award, Lock, Plus } from 'lucide-react'

const PlayerProfile = ({ currentPlayer, setCurrentPlayer, isPremium }) => {
  const [showCreateProfile, setShowCreateProfile] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState('')

  // Mock player data
  const mockProfiles = [
    {
      id: 1,
      name: 'Alex Johnson',
      skillLevel: 'Intermediate',
      gamesPlayed: 45,
      accuracy: 72,
      avgShotsPerGame: 8.5,
      favoriteShot: 'Corner pocket',
      improvementAreas: ['Bank shots', 'Position play'],
      recentGames: [
        { date: '2024-01-15', opponent: 'Mike', result: 'Win', score: '8-6' },
        { date: '2024-01-14', opponent: 'Sarah', result: 'Loss', score: '5-8' },
        { date: '2024-01-13', opponent: 'David', result: 'Win', score: '8-4' },
      ]
    },
    {
      id: 2,
      name: 'Sarah Chen',
      skillLevel: 'Advanced',
      gamesPlayed: 78,
      accuracy: 84,
      avgShotsPerGame: 6.2,
      favoriteShot: 'Combination',
      improvementAreas: ['Break shots'],
      recentGames: []
    }
  ]

  const [profiles, setProfiles] = useState(mockProfiles)

  const handleCreateProfile = () => {
    if (newPlayerName.trim()) {
      const newProfile = {
        id: profiles.length + 1,
        name: newPlayerName.trim(),
        skillLevel: 'Beginner',
        gamesPlayed: 0,
        accuracy: 0,
        avgShotsPerGame: 0,
        favoriteShot: 'None yet',
        improvementAreas: [],
        recentGames: []
      }
      setProfiles([...profiles, newProfile])
      setCurrentPlayer(newProfile)
      setNewPlayerName('')
      setShowCreateProfile(false)
    }
  }

  const getSkillColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-yellow-400'
      case 'intermediate': return 'text-blue-400'
      case 'advanced': return 'text-green-400'
      case 'expert': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Player Profiles</h2>
        <p className="text-gray-400">
          Track your progress and analyze your gameplay
        </p>
      </div>

      {/* Player Selection */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Select Player</h3>
          <button
            onClick={() => setShowCreateProfile(!showCreateProfile)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Profile</span>
          </button>
        </div>

        {showCreateProfile && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProfile()}
              />
              <button
                onClick={handleCreateProfile}
                className="btn-primary"
                disabled={!newPlayerName.trim()}
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateProfile(false)
                  setNewPlayerName('')
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setCurrentPlayer(profile)}
              className={`text-left p-4 rounded-lg border transition-colors ${
                currentPlayer?.id === profile.id
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-600 hover:border-gray-500 bg-surface'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{profile.name}</h4>
                  <p className={`text-sm ${getSkillColor(profile.skillLevel)}`}>
                    {profile.skillLevel}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Games:</span>
                  <span className="ml-1 font-medium">{profile.gamesPlayed}</span>
                </div>
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="ml-1 font-medium">{profile.accuracy}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Player Details */}
      {currentPlayer && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Performance Stats</span>
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-accent">{currentPlayer.gamesPlayed}</div>
                  <div className="text-sm text-gray-400">Games Played</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{currentPlayer.accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{currentPlayer.avgShotsPerGame}</div>
                <div className="text-sm text-gray-400">Avg Shots Per Game</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Skill Level</span>
                  <span className={getSkillColor(currentPlayer.skillLevel)}>
                    {currentPlayer.skillLevel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Favorite Shot</span>
                  <span className="text-text">{currentPlayer.favoriteShot}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Improvement Areas</span>
            </h3>
            
            {currentPlayer.improvementAreas.length > 0 ? (
              <div className="space-y-3">
                {currentPlayer.improvementAreas.map((area, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{area}</span>
                      <Award className="w-4 h-4 text-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Practice recommended
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No improvement areas identified yet</p>
                <p className="text-sm">Play more games to get personalized insights</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Games */}
      {currentPlayer && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Games</h3>
            {!isPremium && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Premium feature</span>
              </div>
            )}
          </div>
          
          {isPremium ? (
            currentPlayer.recentGames.length > 0 ? (
              <div className="space-y-3">
                {currentPlayer.recentGames.map((game, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">vs {game.opponent}</div>
                      <div className="text-sm text-gray-400">{game.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        game.result === 'Win' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {game.result}
                      </div>
                      <div className="text-sm text-gray-400">{game.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No recent games recorded</p>
                <p className="text-sm">Start playing to track your progress</p>
              </div>
            )
          ) : (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 mb-3">Upgrade to Premium to track detailed game history</p>
              <button className="btn-primary">
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlayerProfile