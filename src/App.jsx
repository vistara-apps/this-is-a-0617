import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import CameraInterface from './components/CameraInterface'
import PoolTableAnalysis from './components/PoolTableAnalysis'
import PlayerProfile from './components/PlayerProfile'
import GameManager from './components/GameManager'
import PremiumUpgrade from './components/PremiumUpgrade'
import OnboardingTour from './components/OnboardingTour'
import AIVisionService from './services/aiVision'
import LLMCoachService from './services/llmCoach'

function App() {
  const [activeTab, setActiveTab] = useState('analysis')
  const [isPremium, setIsPremium] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [tableState, setTableState] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [coachingAdvice, setCoachingAdvice] = useState(null)

  // Initialize AI services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        await AIVisionService.initialize()
        console.log('AI services initialized')
      } catch (error) {
        console.warn('AI service initialization warning:', error)
      }
    }
    
    initializeServices()
  }, [])

  const handleImageAnalysis = async (imageData) => {
    setIsAnalyzing(true)
    setTableState(null)
    setAnalysisResult(null)
    
    try {
      // Detect balls using AI vision service
      const detectedBalls = await AIVisionService.detectBalls(imageData)
      
      // Define standard pockets
      const pockets = [
        { id: 'tl', x: 50, y: 50, position: 'top-left' },
        { id: 'tr', x: 750, y: 50, position: 'top-right' },
        { id: 'bl', x: 50, y: 350, position: 'bottom-left' },
        { id: 'br', x: 750, y: 350, position: 'bottom-right' },
        { id: 'tm', x: 400, y: 50, position: 'top-middle' },
        { id: 'bm', x: 400, y: 350, position: 'bottom-middle' },
      ]
      
      // Generate shot suggestions using AI
      const suggestedShots = AIVisionService.generateShotSuggestions(detectedBalls, pockets)
      
      const analysis = {
        balls: detectedBalls,
        pockets,
        suggestedShots,
        timestamp: Date.now(),
        imageData
      }
      
      // Generate coaching advice using LLM
      if (suggestedShots.length > 0) {
        const advice = await LLMCoachService.generateCoachingAdvice(
          { gameType: '8-ball' },
          suggestedShots[0],
          currentPlayer
        )
        setCoachingAdvice(advice)
      }
      
      setTableState(analysis)
      setAnalysisResult(analysis)
      
    } catch (error) {
      console.error('Analysis failed:', error)
      // Fallback to mock data on error
      handleFallbackAnalysis()
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFallbackAnalysis = () => {
    const mockAnalysis = {
      balls: [
        { id: 'cue', x: 200, y: 150, type: 'cue', color: 'white', confidence: 0.95 },
        { id: '1', x: 400, y: 200, type: 'solid', color: 'yellow', number: 1, confidence: 0.88 },
        { id: '2', x: 450, y: 220, type: 'solid', color: 'blue', number: 2, confidence: 0.92 },
        { id: '3', x: 500, y: 200, type: 'solid', color: 'red', number: 3, confidence: 0.85 },
        { id: '8', x: 425, y: 200, type: 'eight', color: 'black', number: 8, confidence: 0.98 },
      ],
      pockets: [
        { id: 'tl', x: 50, y: 50, position: 'top-left' },
        { id: 'tr', x: 750, y: 50, position: 'top-right' },
        { id: 'bl', x: 50, y: 350, position: 'bottom-left' },
        { id: 'br', x: 750, y: 350, position: 'bottom-right' },
        { id: 'tm', x: 400, y: 50, position: 'top-middle' },
        { id: 'bm', x: 400, y: 350, position: 'bottom-middle' },
      ],
      suggestedShots: [
        {
          id: 1,
          target: '1',
          pocket: 'tr',
          power: 0.6,
          angle: 25,
          confidence: 0.85,
          difficulty: 'Easy',
          description: 'Straight shot to corner pocket'
        },
        {
          id: 2,
          target: '2',
          pocket: 'tm',
          power: 0.4,
          angle: -15,
          confidence: 0.72,
          difficulty: 'Medium',
          description: 'Bank shot off side rail'
        }
      ],
      timestamp: Date.now()
    }
    
    setTableState(mockAnalysis)
    setAnalysisResult(mockAnalysis)
  }

  return (
    <div className="min-h-screen bg-bg text-text relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {showOnboarding && (
        <OnboardingTour onComplete={() => setShowOnboarding(false)} />
      )}
      
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isPremium={isPremium}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {activeTab === 'analysis' && (
          <div className="space-y-8 animate-fade-in">
            <CameraInterface 
              onImageAnalysis={handleImageAnalysis}
              isAnalyzing={isAnalyzing}
            />
            {tableState && (
              <PoolTableAnalysis 
                tableState={tableState}
                isPremium={isPremium}
                onPremiumRequired={() => setActiveTab('premium')}
                coachingAdvice={coachingAdvice}
              />
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <PlayerProfile 
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              isPremium={isPremium}
            />
          </div>
        )}
        
        {activeTab === 'game' && (
          <div className="animate-fade-in">
            <GameManager 
              tableState={tableState}
              currentPlayer={currentPlayer}
              isPremium={isPremium}
            />
          </div>
        )}
        
        {activeTab === 'premium' && (
          <div className="animate-fade-in">
            <PremiumUpgrade 
              onUpgrade={() => {
                setIsPremium(true)
                setActiveTab('analysis')
              }}
            />
          </div>
        )}
      </main>
      
      {/* Floating action button for quick analysis */}
      {activeTab !== 'analysis' && (
        <button
          onClick={() => setActiveTab('analysis')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-full shadow-glow hover:shadow-glow-strong transition-all duration-300 flex items-center justify-center z-50 animate-float"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default App