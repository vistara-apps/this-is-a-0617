import React, { useState } from 'react'
import { Trophy, Users, Clock, Target, RotateCcw } from 'lucide-react'

const GameManager = ({ tableState, currentPlayer, isPremium }) => {
  const [gameState, setGameState] = useState({
    gameType: '8-ball',
    player1: currentPlayer?.name || 'Player 1',
    player2: 'Player 2',
    currentTurn: 1,
    score1: 0,
    score2: 0,
    gameTime: 0,
    shots: [],
    isActive: false
  })

  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isActive: true,
      gameTime: 0,
      shots: [],
      score1: 0,
      score2: 0,
      currentTurn: 1
    }))
    setGameStarted(true)
  }

  const switchTurn = () => {
    setGameState(prev => ({
      ...prev,
      currentTurn: prev.currentTurn === 1 ? 2 : 1
    }))
  }

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isActive: false
    }))
    setGameStarted(false)
  }

  const addShot = (successful = true) => {
    const newShot = {
      id: gameState.shots.length + 1,
      player: gameState.currentTurn,
      successful,
      timestamp: Date.now()
    }
    
    setGameState(prev => ({
      ...prev,
      shots: [...prev.shots, newShot],
      ...(successful && {
        [`score${prev.currentTurn}`]: prev[`score${prev.currentTurn}`] + 1
      })
    }))
    
    if (!successful) {
      switchTurn()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Game Manager</h2>
        <p className="text-gray-400">
          Automated turn tracking and game flow management
        </p>
      </div>

      {/* Game Setup */}
      {!gameStarted && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">New Game Setup</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Game Type
              </label>
              <select
                value={gameState.gameType}
                onChange={(e) => setGameState(prev => ({ ...prev, gameType: e.target.value }))}
                className="input-field w-full"
              >
                <option value="8-ball">8-Ball</option>
                <option value="9-ball">9-Ball</option>
                <option value="straight">Straight Pool</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Player 1
                </label>
                <input
                  type="text"
                  value={gameState.player1}
                  onChange={(e) => setGameState(prev => ({ ...prev, player1: e.target.value }))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Player 2
                </label>
                <input
                  type="text"
                  value={gameState.player2}
                  onChange={(e) => setGameState(prev => ({ ...prev, player2: e.target.value }))}
                  className="input-field w-full"
                />
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Start Game</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Game */}
      {gameStarted && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Player 1 Score */}
            <div className={`card text-center ${
              gameState.currentTurn === 1 ? 'ring-2 ring-accent' : ''
            }`}>
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{gameState.player1}</h3>
              <div className="text-3xl font-bold text-accent">{gameState.score1}</div>
              {gameState.currentTurn === 1 && (
                <div className="text-sm text-accent font-medium mt-2">Current Turn</div>
              )}
            </div>

            {/* Game Info */}
            <div className="card text-center">
              <div className="w-12 h-12 bg-surface rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg">{gameState.gameType}</h3>
              <div className="text-sm text-gray-400">
                {gameState.shots.length} shots taken
              </div>
              <button
                onClick={switchTurn}
                className="btn-secondary mt-2 flex items-center space-x-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Switch Turn</span>
              </button>
            </div>

            {/* Player 2 Score */}
            <div className={`card text-center ${
              gameState.currentTurn === 2 ? 'ring-2 ring-accent' : ''
            }`}>
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{gameState.player2}</h3>
              <div className="text-3xl font-bold text-accent">{gameState.score2}</div>
              {gameState.currentTurn === 2 && (
                <div className="text-sm text-accent font-medium mt-2">Current Turn</div>
              )}
            </div>
          </div>

          {/* Shot Actions */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Record Shot</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => addShot(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Successful Shot</span>
              </button>
              <button
                onClick={() => addShot(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Missed Shot</span>
              </button>
            </div>
          </div>

          {/* Table Integration */}
          {tableState && (
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">AI Assistant</h3>
              <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
                <p className="text-accent font-medium mb-2">
                  Current player: {gameState.currentTurn === 1 ? gameState.player1 : gameState.player2}
                </p>
                <p className="text-sm text-gray-300">
                  Based on the current table layout, I recommend focusing on the corner pocket shots 
                  for the highest success probability.
                </p>
              </div>
            </div>
          )}

          {/* Game Controls */}
          <div className="flex space-x-4">
            <button
              onClick={endGame}
              className="btn-secondary flex-1"
            >
              End Game
            </button>
            <button
              onClick={() => {
                setGameState(prev => ({ ...prev, score1: 0, score2: 0, shots: [] }))
              }}
              className="btn-primary flex-1"
            >
              New Game
            </button>
          </div>
        </>
      )}

      {/* Shot History */}
      {gameStarted && gameState.shots.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Shot History</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {gameState.shots.slice(-10).reverse().map((shot) => (
              <div key={shot.id} className="flex items-center justify-between py-2 px-3 bg-gray-800 rounded">
                <span className="text-sm">
                  {shot.player === 1 ? gameState.player1 : gameState.player2}
                </span>
                <span className={`text-sm font-medium ${
                  shot.successful ? 'text-green-400' : 'text-red-400'
                }`}>
                  {shot.successful ? 'Made' : 'Missed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GameManager