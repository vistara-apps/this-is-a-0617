import React, { useState } from 'react'
import { Camera, Eye, TrendingUp, X } from 'lucide-react'

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      icon: Camera,
      title: 'Welcome to PocketPro AI',
      description: 'Your AI-powered billiards coach. Take a photo or use live camera to analyze your shots.',
      highlight: 'Get instant shot recommendations'
    },
    {
      icon: Eye,
      title: 'AR Coaching Overlay',
      description: 'See exactly where to aim with our augmented reality visualization system.',
      highlight: 'Visual learning made easy'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Monitor your improvement with detailed analytics and personalized coaching tips.',
      highlight: 'Become a better player'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl p-6 max-w-md w-full animate-slide-up">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <button
            onClick={onComplete}
            className="text-gray-400 hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
        <p className="text-gray-300 mb-4">{step.description}</p>
        
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 mb-6">
          <p className="text-accent text-sm font-medium">{step.highlight}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-primary' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingTour