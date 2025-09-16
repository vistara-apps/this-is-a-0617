import React from 'react'
import { Camera, User, Trophy, Crown, Zap } from 'lucide-react'

const Header = ({ activeTab, setActiveTab, isPremium }) => {
  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: Camera, gradient: 'from-accent to-primary' },
    { id: 'profile', label: 'Profile', icon: User, gradient: 'from-primary to-accent-secondary' },
    { id: 'game', label: 'Game', icon: Trophy, gradient: 'from-accent-secondary to-accent' },
    { id: 'premium', label: 'Premium', icon: Crown, gradient: 'from-warning to-accent' },
  ]

  return (
    <header className="bg-surface-glass backdrop-blur-md border-b border-accent/20 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-xl blur opacity-30 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                PocketPro AI
              </h1>
              <p className="text-xs text-text-muted font-mono">v2.0 • Neural Enhanced</p>
            </div>
          </div>
          
          {isPremium && (
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 shadow-inner-glow">
              <Crown className="w-5 h-5 text-accent animate-glow-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                PREMIUM
              </span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        <nav className="flex space-x-2 pb-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-3 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap group ${
                  isActive
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-glow transform scale-105`
                    : 'text-text-secondary hover:text-accent hover:bg-surface-elevated border border-transparent hover:border-accent/20 hover:shadow-inner-glow'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl blur opacity-50 -z-10 animate-pulse`}></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'} transition-transform duration-300`} />
                <span className="font-medium">{tab.label}</span>
                {tab.id === 'premium' && !isPremium && (
                  <div className="w-2.5 h-2.5 bg-warning rounded-full animate-pulse shadow-neon"></div>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>
      </div>
      
      {/* Scanning line effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent scan-line"></div>
    </header>
  )
}

export default Header