import React from 'react'
import { Camera, User, Trophy, Crown } from 'lucide-react'

const Header = ({ activeTab, setActiveTab, isPremium }) => {
  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: Camera },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'game', label: 'Game', icon: Trophy },
    { id: 'premium', label: 'Premium', icon: Crown },
  ]

  return (
    <header className="bg-surface border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-bg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">PocketPro AI</h1>
              <p className="text-xs text-gray-400">Elevate Your Pool Game</p>
            </div>
          </div>
          
          {isPremium && (
            <div className="hidden sm:flex items-center space-x-2 bg-accent/20 px-3 py-1 rounded-full">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Premium</span>
            </div>
          )}
        </div>
        
        <nav className="flex space-x-1 pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-text hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'premium' && !isPremium && (
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header