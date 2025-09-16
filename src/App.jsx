import React, { useState } from 'react'
import Header from './components/Header'
import CameraInterface from './components/CameraInterface'
import PoolTableAnalysis from './components/PoolTableAnalysis'
import PlayerProfile from './components/PlayerProfile'
import GameManager from './components/GameManager'
import PremiumUpgrade from './components/PremiumUpgrade'
import OnboardingTour from './components/OnboardingTour'

function App() {
  const [activeTab, setActiveTab] = useState('analysis')
  const [isPremium, setIsPremium] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [tableState, setTableState] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleImageAnalysis = (imageData) => {
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        balls: [
          { id: 'cue', x: 200, y: 150, type: 'cue', color: 'white' },
          { id: '1', x: 400, y: 200, type: 'solid', color: 'yellow', number: 1 },
          { id: '2', x: 450, y: 220, type: 'solid', color: 'blue', number: 2 },
          { id: '3', x: 500, y: 200, type: 'solid', color: 'red', number: 3 },
          { id: '8', x: 425, y: 200, type: 'eight', color: 'black', number: 8 },
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
        ]
      }
      setTableState(mockAnalysis)
      setAnalysisResult(mockAnalysis)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {showOnboarding && (
        <OnboardingTour onComplete={() => setShowOnboarding(false)} />
      )}
      
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isPremium={isPremium}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <CameraInterface 
              onImageAnalysis={handleImageAnalysis}
              isAnalyzing={tableState === null && analysisResult === null}
            />
            {tableState && (
              <PoolTableAnalysis 
                tableState={tableState}
                isPremium={isPremium}
                onPremiumRequired={() => setActiveTab('premium')}
              />
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <PlayerProfile 
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            isPremium={isPremium}
          />
        )}
        
        {activeTab === 'game' && (
          <GameManager 
            tableState={tableState}
            currentPlayer={currentPlayer}
            isPremium={isPremium}
          />
        )}
        
        {activeTab === 'premium' && (
          <PremiumUpgrade 
            onUpgrade={() => {
              setIsPremium(true)
              setActiveTab('analysis')
            }}
          />
        )}
      </main>
    </div>
  )
}

export default App