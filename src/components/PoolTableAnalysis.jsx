import React, { useState, useEffect, useRef } from 'react'
import { Target, Zap, Eye, Lock, TrendingUp, Brain, Cpu, Activity, ChevronRight, Play, RotateCcw, Maximize2 } from 'lucide-react'

const PoolTableAnalysis = ({ tableState, isPremium, onPremiumRequired, coachingAdvice }) => {
  const [selectedShot, setSelectedShot] = useState(0)
  const [showAR, setShowAR] = useState(false)
  const [animateTrajectory, setAnimateTrajectory] = useState(false)
  const [showCoaching, setShowCoaching] = useState(false)
  const [ballAnimations, setBallAnimations] = useState({})
  const svgRef = useRef(null)

  useEffect(() => {
    if (showAR && isPremium) {
      setAnimateTrajectory(true)
      const timer = setTimeout(() => setAnimateTrajectory(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [selectedShot, showAR, isPremium])

  useEffect(() => {
    if (coachingAdvice) {
      setShowCoaching(true)
    }
  }, [coachingAdvice])

  if (!tableState) return null

  const { balls, pockets, suggestedShots } = tableState
  const currentShot = suggestedShots[selectedShot]

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-success'
    if (confidence >= 0.6) return 'text-warning'
    return 'text-error'
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-success'
      case 'medium': return 'text-warning'
      case 'hard': return 'text-error'
      default: return 'text-text-muted'
    }
  }

  const getBallStyle = (ball) => {
    const baseStyle = "absolute w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-125 cursor-pointer shadow-glow"
    
    if (ball.type === 'cue') {
      return `${baseStyle} bg-white border-accent text-black hover:shadow-glow-strong`
    } else if (ball.type === 'eight') {
      return `${baseStyle} bg-black border-accent text-white hover:shadow-glow-strong`
    } else {
      const colorMap = {
        'yellow': 'bg-yellow-400 border-yellow-300 text-black',
        'blue': 'bg-blue-500 border-blue-400 text-white',
        'red': 'bg-red-500 border-red-400 text-white',
        'purple': 'bg-purple-500 border-purple-400 text-white',
        'orange': 'bg-orange-500 border-orange-400 text-white',
        'green': 'bg-green-500 border-green-400 text-white',
        'maroon': 'bg-red-800 border-red-700 text-white'
      }
      return `${baseStyle} ${colorMap[ball.color] || 'bg-gray-500 border-gray-400 text-white'} hover:shadow-glow-strong`
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-success/20 to-accent/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-success/30">
          <Activity className="w-6 h-6 text-success animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
            Neural Analysis Complete
          </h2>
        </div>
        <div className="flex items-center justify-center space-x-6 text-text-secondary">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-accent" />
            <span className="font-medium">{balls.length} balls detected</span>
          </div>
          <div className="w-1 h-1 bg-accent rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-medium">{suggestedShots.length} shots analyzed</span>
          </div>
          <div className="w-1 h-1 bg-accent rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-accent-secondary" />
            <span className="font-medium">AI Confidence: {Math.round(currentShot?.confidence * 100 || 0)}%</span>
          </div>
        </div>
      </div>

      {/* Enhanced Pool Table Visualization */}
      <div className="card-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h3 className="font-bold text-xl flex items-center space-x-3">
            <Eye className="w-6 h-6 text-accent" />
            <span>Interactive Table Layout</span>
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAR(!showAR)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                showAR 
                  ? 'bg-gradient-to-r from-accent to-primary text-white shadow-glow transform scale-105' 
                  : 'bg-surface-elevated hover:bg-surface text-text-secondary hover:text-accent border border-accent/20 hover:border-accent/40'
              }`}
              disabled={!isPremium}
            >
              <Eye className="w-5 h-5" />
              <span>Neural AR</span>
              {!isPremium && <Lock className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setAnimateTrajectory(!animateTrajectory)}
              className="btn-ghost p-2"
              disabled={!showAR || !isPremium}
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="relative pool-table rounded-2xl overflow-hidden shadow-card-elevated" style={{ aspectRatio: '2/1' }}>
          {/* Enhanced table borders with neon effect */}
          <div className="absolute inset-3 border-4 border-pool-rail rounded-lg shadow-inner">
            <div className="absolute inset-0 border border-accent/20 rounded-lg"></div>
          </div>
          
          {/* Pockets with enhanced styling */}
          {pockets.map((pocket) => (
            <div
              key={pocket.id}
              className="absolute w-8 h-8 bg-black rounded-full border-2 border-pool-rail shadow-glow-strong animate-pulse-slow"
              style={{
                left: `${(pocket.x / 800) * 100}%`,
                top: `${(pocket.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-black rounded-full"></div>
            </div>
          ))}
          
          {/* Enhanced balls with animations */}
          {balls.map((ball) => (
            <div
              key={ball.id}
              className={getBallStyle(ball)}
              style={{
                left: `${(ball.x / 800) * 100}%`,
                top: `${(ball.y / 400) * 100}%`,
                transform: `translate(-50%, -50%) ${ballAnimations[ball.id] ? 'scale(1.2)' : 'scale(1)'}`,
                zIndex: ball.type === 'cue' ? 20 : 10
              }}
              onClick={() => setBallAnimations(prev => ({
                ...prev,
                [ball.id]: !prev[ball.id]
              }))}
            >
              {ball.number && ball.number}
              {ball.confidence && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono bg-black/80 text-accent px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity">
                  {Math.round(ball.confidence * 100)}%
                </div>
              )}
            </div>
          ))}
          
          {/* Advanced AR Overlay */}
          {showAR && isPremium && currentShot && (
            <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="trajectoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="1" />
                  <stop offset="50%" stopColor="hsl(260, 100%, 70%)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(300, 100%, 60%)" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main trajectory line */}
              <path
                d="M 25% 37.5% Q 45% 25% 62.5% 25%"
                stroke="url(#trajectoryGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray={animateTrajectory ? "10,5" : "none"}
                className={animateTrajectory ? "animate-pulse" : ""}
                filter="url(#glow)"
              />
              
              {/* Cue ball marker */}
              <circle 
                cx="25%" 
                cy="37.5%" 
                r="12" 
                fill="none" 
                stroke="hsl(180, 100%, 50%)" 
                strokeWidth="3"
                className="animate-pulse"
                filter="url(#glow)"
              />
              
              {/* Target ball marker */}
              <circle 
                cx="62.5%" 
                cy="25%" 
                r="10" 
                fill="hsl(180, 100%, 50%)" 
                fillOpacity="0.3"
                stroke="hsl(180, 100%, 50%)"
                strokeWidth="2"
                className="animate-pulse"
                filter="url(#glow)"
              />
              
              {/* Power indicator */}
              <g transform="translate(25%, 37.5%)">
                <circle r="20" fill="none" stroke="hsl(180, 100%, 50%)" strokeWidth="2" strokeOpacity="0.3" />
                <path
                  d={`M 0 -20 A 20 20 0 0 1 ${20 * Math.sin(2 * Math.PI * (currentShot.power || 0.5))} ${-20 * Math.cos(2 * Math.PI * (currentShot.power || 0.5))}`}
                  stroke="hsl(180, 100%, 50%)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
              </g>
              
              {/* Angle indicator */}
              <line
                x1="25%"
                y1="37.5%"
                x2={`${25 + 15 * Math.cos((currentShot.angle || 0) * Math.PI / 180)}%`}
                y2={`${37.5 + 15 * Math.sin((currentShot.angle || 0) * Math.PI / 180)}%`}
                stroke="hsl(300, 100%, 60%)"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="animate-pulse"
                filter="url(#glow)"
              />
            </svg>
          )}
          
          {/* Premium upgrade overlay */}
          {!isPremium && showAR && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full mx-auto flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Neural AR Locked</h4>
                  <p className="text-text-secondary mb-4">Upgrade to unlock advanced trajectory visualization</p>
                  <button
                    onClick={onPremiumRequired}
                    className="btn-primary flex items-center space-x-2 mx-auto"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Upgrade Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Scanning overlay effect */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan opacity-30"></div>
        </div>
      </div>

      {/* Enhanced Shot Suggestions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="card-elevated">
          <h3 className="font-bold text-xl mb-6 flex items-center space-x-3">
            <Target className="w-6 h-6 text-accent" />
            <span>Neural Shot Analysis</span>
            <div className="ml-auto text-sm font-mono text-text-muted bg-surface px-2 py-1 rounded">
              {suggestedShots.length} options
            </div>
          </h3>
          
          <div className="space-y-4">
            {suggestedShots.map((shot, index) => (
              <button
                key={shot.id}
                onClick={() => setSelectedShot(index)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group ${
                  selectedShot === index
                    ? 'border-accent bg-gradient-to-r from-accent/10 to-primary/10 shadow-glow transform scale-105'
                    : 'border-accent/20 hover:border-accent/40 bg-surface-elevated hover:bg-surface hover:shadow-inner-glow'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedShot === index ? 'bg-accent text-white' : 'bg-surface text-accent border border-accent/30'
                    }`}>
                      {shot.id}
                    </div>
                    <span className="font-semibold text-lg">Shot Option {shot.id}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                      shot.confidence >= 0.8 ? 'bg-success/20 text-success' :
                      shot.confidence >= 0.6 ? 'bg-warning/20 text-warning' :
                      'bg-error/20 text-error'
                    }`}>
                      {Math.round(shot.confidence * 100)}%
                    </span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      selectedShot === index ? 'rotate-90 text-accent' : 'text-text-muted group-hover:text-accent'
                    }`} />
                  </div>
                </div>
                
                <p className="text-text-secondary mb-3 text-sm leading-relaxed">{shot.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      shot.difficulty === 'Easy' ? 'bg-success/20 text-success' :
                      shot.difficulty === 'Medium' ? 'bg-warning/20 text-warning' :
                      'bg-error/20 text-error'
                    }`}>
                      {shot.difficulty}
                    </span>
                    <span className="text-text-muted">Power: {Math.round(shot.power * 100)}%</span>
                    <span className="text-text-muted">Angle: {shot.angle}°</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Shot Details */}
          <div className="card-elevated">
            <h3 className="font-bold text-xl mb-6 flex items-center space-x-3">
              <Zap className="w-6 h-6 text-primary" />
              <span>Shot Analysis</span>
            </h3>
            
            {currentShot && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-elevated rounded-xl p-4 border border-accent/10 hover:border-accent/20 transition-colors">
                    <div className="text-sm text-text-muted mb-2 font-medium">Target Ball</div>
                    <div className="text-2xl font-bold text-accent">{currentShot.target}</div>
                  </div>
                  <div className="bg-surface-elevated rounded-xl p-4 border border-accent/10 hover:border-accent/20 transition-colors">
                    <div className="text-sm text-text-muted mb-2 font-medium">Target Pocket</div>
                    <div className="text-2xl font-bold text-primary capitalize">
                      {currentShot.pocket.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 text-center border border-accent/20">
                    <div className="text-sm text-text-muted mb-2 font-medium">Power</div>
                    <div className="text-3xl font-bold text-accent">
                      {Math.round(currentShot.power * 100)}%
                    </div>
                    <div className="w-full bg-surface rounded-full h-2 mt-2">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                        style={{ width: `${currentShot.power * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center border border-primary/20">
                    <div className="text-sm text-text-muted mb-2 font-medium">Angle</div>
                    <div className="text-3xl font-bold text-primary">
                      {currentShot.angle}°
                    </div>
                    <div className="text-xs text-text-muted mt-2">
                      {Math.abs(currentShot.angle) > 45 ? 'Sharp cut' : 'Shallow angle'}
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br rounded-xl p-4 text-center border ${
                    currentShot.confidence >= 0.8 ? 'from-success/10 to-success/5 border-success/20' :
                    currentShot.confidence >= 0.6 ? 'from-warning/10 to-warning/5 border-warning/20' :
                    'from-error/10 to-error/5 border-error/20'
                  }`}>
                    <div className="text-sm text-text-muted mb-2 font-medium">Success Rate</div>
                    <div className={`text-3xl font-bold ${getConfidenceColor(currentShot.confidence)}`}>
                      {Math.round(currentShot.confidence * 100)}%
                    </div>
                    <div className="w-full bg-surface rounded-full h-2 mt-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          currentShot.confidence >= 0.8 ? 'bg-success' :
                          currentShot.confidence >= 0.6 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${currentShot.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Coaching Advice */}
          {coachingAdvice && showCoaching && (
            <div className="card-elevated bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-primary" />
                  <span>AI Coach</span>
                </h3>
                <button 
                  onClick={() => setShowCoaching(false)}
                  className="btn-ghost p-1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface-elevated rounded-xl p-4 border border-accent/10">
                  <h4 className="font-semibold text-accent mb-2 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Technique Tips</span>
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {coachingAdvice.technique_tips?.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-surface-elevated rounded-xl p-4 border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Mental Game</h4>
                  <p className="text-sm text-text-secondary">{coachingAdvice.mental_advice}</p>
                </div>
                
                <div className="bg-surface-elevated rounded-xl p-4 border border-accent-secondary/10">
                  <h4 className="font-semibold text-accent-secondary mb-2">Shot-Specific Advice</h4>
                  <p className="text-sm text-text-secondary">{coachingAdvice.shot_specific}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PoolTableAnalysis