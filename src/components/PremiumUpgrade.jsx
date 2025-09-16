import React, { useState } from 'react'
import { Crown, Check, Eye, TrendingUp, Zap, X } from 'lucide-react'

const PremiumUpgrade = ({ onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [showPayment, setShowPayment] = useState(false)

  const features = [
    {
      icon: Eye,
      title: 'AR Coaching Overlay',
      description: 'Visualize shot trajectories and aim points in real-time',
      free: false,
      premium: true
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Detailed performance tracking and improvement insights',
      free: 'Limited',
      premium: true
    },
    {
      icon: Zap,
      title: 'Unlimited Analysis',
      description: 'Analyze as many shots as you want without restrictions',
      free: '5 per day',
      premium: true
    },
    {
      icon: Crown,
      title: 'Player Profiles',
      description: 'Create and manage multiple player profiles',
      free: '1 profile',
      premium: 'Unlimited'
    }
  ]

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      savings: null
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$79.99',
      period: '/year',
      savings: 'Save 33%'
    }
  ]

  const handleUpgrade = () => {
    setShowPayment(true)
  }

  const completePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onUpgrade()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
          <Crown className="w-8 h-8 text-bg" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="text-gray-400">
          Unlock advanced features and take your pool game to the next level
        </p>
      </div>

      {/* Feature Comparison */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-6">Feature Comparison</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-700">
            <div className="font-medium">Features</div>
            <div className="text-center font-medium">Free</div>
            <div className="text-center font-medium text-accent">Premium</div>
          </div>
          
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="grid grid-cols-3 gap-4 items-center py-3">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-gray-400">{feature.description}</div>
                  </div>
                </div>
                <div className="text-center">
                  {feature.free === true ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : feature.free === false ? (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-400">{feature.free}</span>
                  )}
                </div>
                <div className="text-center">
                  {feature.premium === true ? (
                    <Check className="w-5 h-5 text-accent mx-auto" />
                  ) : (
                    <span className="text-sm text-accent">{feature.premium}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-6">Choose Your Plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-6 rounded-lg border transition-colors text-left ${
                selectedPlan === plan.id
                  ? 'border-accent bg-accent/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                {plan.savings && (
                  <span className="bg-accent text-bg text-xs px-2 py-1 rounded-full font-medium">
                    {plan.savings}
                  </span>
                )}
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={handleUpgrade}
          className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
        >
          <Crown className="w-5 h-5" />
          <span>Upgrade to Premium</span>
        </button>
      </div>

      {/* Benefits Highlight */}
      <div className="card bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
        <div className="text-center space-y-4">
          <Crown className="w-12 h-12 text-accent mx-auto" />
          <h3 className="text-xl font-bold">Why Choose Premium?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <Eye className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-medium">AR Visualization</div>
              <div className="text-gray-300">See your shots before you take them</div>
            </div>
            <div>
              <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-medium">Advanced Analytics</div>
              <div className="text-gray-300">Track progress and identify weaknesses</div>
            </div>
            <div>
              <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="font-medium">Unlimited Access</div>
              <div className="text-gray-300">No limits on analysis or profiles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl p-6 max-w-md w-full animate-slide-up">
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-accent mx-auto mb-3" />
              <h3 className="text-xl font-bold">Complete Your Purchase</h3>
              <p className="text-gray-400">
                {selectedPlan === 'monthly' ? '$9.99/month' : '$79.99/year'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">Demo Mode</div>
                <p className="text-sm">This is a demo app. No actual payment will be processed.</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={completePayment}
                  className="btn-primary flex-1"
                >
                  Complete Purchase
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PremiumUpgrade