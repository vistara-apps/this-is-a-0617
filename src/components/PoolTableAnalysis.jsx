import React, { useState } from 'react'
import { Target, Zap, Eye, Lock, TrendingUp } from 'lucide-react'

const PoolTableAnalysis = ({ tableState, isPremium, onPremiumRequired }) => {
  const [selectedShot, setSelectedShot] = useState(0)
  const [showAR, setShowAR] = useState(false)

  if (!tableState) return null

  const { balls, pockets, suggestedShots } = tableState
  const currentShot = suggestedShots[selectedShot]

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-400'
    if (confidence >= 0.6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Table Analysis Complete</h2>
        <p className="text-gray-400">
          {balls.length} balls detected • {suggestedShots.length} shots analyzed
        </p>
      </div>

      {/* Pool Table Visualization */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Table Layout</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAR(!showAR)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                showAR 
                  ? 'bg-accent text-bg font-medium' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
              disabled={!isPremium}
            >
              <Eye className="w-4 h-4" />
              <span>AR Overlay</span>
              {!isPremium && <Lock className="w-3 h-3" />}
            </button>
          </div>
        </div>
        
        <div className="relative bg-green-600 rounded-lg overflow-hidden" style={{ aspectRatio: '2/1' }}>
          {/* Table borders */}
          <div className="absolute inset-2 border-4 border-yellow-700 rounded"></div>
          
          {/* Pockets */}
          {pockets.map((pocket) => (
            <div
              key={pocket.id}
              className="absolute w-6 h-6 bg-black rounded-full border-2 border-yellow-700"
              style={{
                left: `${(pocket.x / 800) * 100}%`,
                top: `${(pocket.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          
          {/* Balls */}
          {balls.map((ball) => (
            <div
              key={ball.id}
              className={`absolute w-4 h-4 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                ball.type === 'cue' 
                  ? 'bg-white border-gray-300 text-black' 
                  : ball.type === 'eight'
                  ? 'bg-black border-white text-white'
                  : ball.color === 'yellow'
                  ? 'bg-yellow-400 border-yellow-600 text-black'
                  : ball.color === 'blue'
                  ? 'bg-blue-500 border-blue-700 text-white'
                  : 'bg-red-500 border-red-700 text-white'
              }`}
              style={{
                left: `${(ball.x / 800) * 100}%`,
                top: `${(ball.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {ball.number && ball.number}
            </div>
          ))}
          
          {/* AR Overlay */}
          {showAR && isPremium && currentShot && (
            <>
              {/* Shot trajectory line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="trajectory" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <line
                  x1="25%"
                  y1="37.5%"
                  x2="62.5%"
                  y2="25%"
                  stroke="url(#trajectory)"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <circle cx="25%" cy="37.5%" r="8" fill="none" stroke="#10b981" strokeWidth="2" />
                <circle cx="62.5%" cy="25%" r="6" fill="#10b981" fillOpacity="0.5" />
              </svg>
            </>
          )}
          
          {!isPremium && showAR && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={onPremiumRequired}
                className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-accent/90 transition-colors"
              >
                <Lock className="w-5 h-5" />
                <span>Upgrade for AR Overlay</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shot Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-accent" />
            <span>Suggested Shots</span>
          </h3>
          
          <div className="space-y-3">
            {suggestedShots.map((shot, index) => (
              <button
                key={shot.id}
                onClick={() => setSelectedShot(index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedShot === index
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-600 hover:border-gray-500 bg-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Shot {shot.id}</span>
                  <span className={`text-sm ${getConfidenceColor(shot.confidence)}`}>
                    {Math.round(shot.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{shot.description}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className={getDifficultyColor(shot.difficulty)}>
                    {shot.difficulty}
                  </span>
                  <span className="text-gray-500">Power: {Math.round(shot.power * 100)}%</span>
                  <span className="text-gray-500">Angle: {shot.angle}°</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Shot Details</span>
          </h3>
          
          {currentShot && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Target Ball</div>
                  <div className="text-lg font-bold">{currentShot.target}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Target Pocket</div>
                  <div className="text-lg font-bold capitalize">
                    {currentShot.pocket.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">Power</div>
                  <div className="text-xl font-bold text-accent">
                    {Math.round(currentShot.power * 100)}%
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">Angle</div>
                  <div className="text-xl font-bold text-primary">
                    {currentShot.angle}°
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-400 mb-1">Success</div>
                  <div className={`text-xl font-bold ${getConfidenceColor(currentShot.confidence)}`}>
                    {Math.round(currentShot.confidence * 100)}%
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span>Coaching Tips</span>
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Aim for the center of the target ball</li>
                  <li>• Use smooth, consistent stroke</li>
                  <li>• Follow through toward the pocket</li>
                  {currentShot.difficulty === 'Medium' && (
                    <li>• Consider adding slight top spin for better control</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PoolTableAnalysis