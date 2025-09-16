class LLMCoachService {
  constructor() {
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    this.model = 'gpt-4-vision-preview';
    this.isEnabled = false; // Set to true when API key is available
  }

  async generateCoachingAdvice(gameState, shotAnalysis, playerProfile) {
    if (!this.isEnabled) {
      return this.generateFallbackAdvice(gameState, shotAnalysis, playerProfile);
    }

    try {
      const prompt = this.buildCoachingPrompt(gameState, shotAnalysis, playerProfile);
      const response = await this.callLLMAPI(prompt);
      return this.parseCoachingResponse(response);
    } catch (error) {
      console.warn('LLM coaching failed, using fallback:', error);
      return this.generateFallbackAdvice(gameState, shotAnalysis, playerProfile);
    }
  }

  buildCoachingPrompt(gameState, shotAnalysis, playerProfile) {
    return {
      role: 'system',
      content: `You are an expert pool/billiards coach with decades of experience. Analyze the current game situation and provide personalized coaching advice.

Game Context:
- Player: ${playerProfile?.name || 'Player'}
- Skill Level: ${playerProfile?.skillLevel || 'Intermediate'}
- Current Shot: ${shotAnalysis?.target || 'Unknown'} ball
- Difficulty: ${shotAnalysis?.difficulty || 'Medium'}
- Confidence: ${Math.round((shotAnalysis?.confidence || 0.5) * 100)}%
- Power Required: ${Math.round((shotAnalysis?.power || 0.5) * 100)}%
- Angle: ${shotAnalysis?.angle || 0}°

Player Stats:
- Games Played: ${playerProfile?.gamesPlayed || 0}
- Accuracy: ${playerProfile?.accuracy || 0}%
- Improvement Areas: ${playerProfile?.improvementAreas?.join(', ') || 'None identified'}

Provide coaching advice in this JSON format:
{
  "technique_tips": ["tip1", "tip2", "tip3"],
  "mental_advice": "motivational guidance",
  "shot_specific": "advice for this specific shot",
  "practice_suggestion": "what to practice next",
  "confidence_level": "assessment of player readiness"
}`
    };
  }

  async callLLMAPI(prompt) {
    // Placeholder for actual LLM API call
    // In production, this would make a real API call to OpenAI or similar service
    throw new Error('LLM API not configured');
  }

  parseCoachingResponse(response) {
    try {
      return JSON.parse(response);
    } catch (error) {
      return this.generateFallbackAdvice();
    }
  }

  generateFallbackAdvice(gameState, shotAnalysis, playerProfile) {
    const skillLevel = playerProfile?.skillLevel?.toLowerCase() || 'intermediate';
    const difficulty = shotAnalysis?.difficulty?.toLowerCase() || 'medium';
    const confidence = shotAnalysis?.confidence || 0.5;

    const techniqueTips = this.getTechniqueTips(skillLevel, difficulty);
    const mentalAdvice = this.getMentalAdvice(confidence, skillLevel);
    const shotSpecific = this.getShotSpecificAdvice(shotAnalysis);
    const practiceSuggestion = this.getPracticeSuggestion(playerProfile);

    return {
      technique_tips: techniqueTips,
      mental_advice: mentalAdvice,
      shot_specific: shotSpecific,
      practice_suggestion: practiceSuggestion,
      confidence_level: this.assessConfidenceLevel(confidence, skillLevel)
    };
  }

  getTechniqueTips(skillLevel, difficulty) {
    const tips = {
      beginner: {
        easy: [
          "Keep your bridge hand steady and low",
          "Focus on a smooth, straight stroke",
          "Aim for the center of the target ball"
        ],
        medium: [
          "Take extra time to line up your shot",
          "Use a lighter grip on the cue",
          "Follow through toward your target"
        ],
        hard: [
          "Consider an easier shot if available",
          "Practice your stance and alignment",
          "Don't rush - take your time"
        ]
      },
      intermediate: {
        easy: [
          "Maintain consistent tempo in your stroke",
          "Keep your head still during the shot",
          "Use controlled power for better accuracy"
        ],
        medium: [
          "Visualize the ball path before shooting",
          "Apply slight english for better position",
          "Keep your cue level throughout the stroke"
        ],
        hard: [
          "Plan your position for the next shot",
          "Consider using draw or follow",
          "Break down complex shots into simpler elements"
        ]
      },
      advanced: {
        easy: [
          "Focus on position play for your next shot",
          "Use this opportunity to improve table position",
          "Maintain rhythm and confidence"
        ],
        medium: [
          "Apply precise english for optimal position",
          "Consider multiple shot options",
          "Use this shot to control the game tempo"
        ],
        hard: [
          "Execute advanced techniques with precision",
          "Think several shots ahead",
          "Use this challenge to showcase your skills"
        ]
      }
    };

    return tips[skillLevel]?.[difficulty] || tips.intermediate.medium;
  }

  getMentalAdvice(confidence, skillLevel) {
    if (confidence > 0.8) {
      return "You've got this! Trust your instincts and execute with confidence.";
    } else if (confidence > 0.6) {
      return "Good shot selection. Take your time and focus on your fundamentals.";
    } else if (confidence > 0.4) {
      return "Challenging shot ahead. Stay calm, breathe, and commit to your decision.";
    } else {
      return "High-risk shot. Consider if there's a safer alternative, but if you go for it, commit fully.";
    }
  }

  getShotSpecificAdvice(shotAnalysis) {
    if (!shotAnalysis) return "Focus on your fundamentals and take your time.";

    const { difficulty, power, angle } = shotAnalysis;
    
    if (difficulty === 'Easy') {
      return `This is a straightforward shot. Use ${Math.round(power * 100)}% power and maintain smooth follow-through.`;
    } else if (difficulty === 'Medium') {
      return `Moderate difficulty shot requiring precision. Aim carefully at the ${Math.abs(angle) > 45 ? 'sharp' : 'shallow'} angle.`;
    } else {
      return `High difficulty shot. Consider the risk vs reward. If you attempt it, use controlled power and precise aim.`;
    }
  }

  getPracticeSuggestion(playerProfile) {
    const improvementAreas = playerProfile?.improvementAreas || [];
    const accuracy = playerProfile?.accuracy || 0;

    if (improvementAreas.includes('Bank shots')) {
      return "Practice bank shots by setting up balls at various angles and working on consistent contact points.";
    } else if (improvementAreas.includes('Position play')) {
      return "Focus on position play drills - practice controlling the cue ball for your next shot.";
    } else if (accuracy < 60) {
      return "Work on basic straight shots to improve accuracy. Practice shooting balls into pockets from various distances.";
    } else if (accuracy < 80) {
      return "Practice cut shots at different angles to improve your shot-making versatility.";
    } else {
      return "Work on advanced techniques like english, masse shots, and complex position play.";
    }
  }

  assessConfidenceLevel(confidence, skillLevel) {
    const level = confidence * 100;
    
    if (level > 85) return "Excellent - you're well-prepared for this shot";
    if (level > 70) return "Good - trust your preparation and execute";
    if (level > 55) return "Moderate - focus on fundamentals";
    if (level > 40) return "Challenging - consider alternatives";
    return "High risk - evaluate if this is the best option";
  }

  async generateGameStrategy(gameState, playerProfile) {
    const strategies = {
      '8-ball': this.get8BallStrategy(gameState, playerProfile),
      '9-ball': this.get9BallStrategy(gameState, playerProfile),
      'straight': this.getStraightPoolStrategy(gameState, playerProfile)
    };

    return strategies[gameState.gameType] || strategies['8-ball'];
  }

  get8BallStrategy(gameState, playerProfile) {
    return {
      primary_focus: "Control the table by pocketing your group systematically",
      key_principles: [
        "Identify and claim your group (solids or stripes) early",
        "Plan 2-3 shots ahead for better position",
        "Leave difficult shots for your opponent when possible",
        "Save the 8-ball for last - know the rules!"
      ],
      tactical_advice: "Focus on clearing your easiest balls first while maintaining good position for harder shots."
    };
  }

  get9BallStrategy(gameState, playerProfile) {
    return {
      primary_focus: "Always hit the lowest numbered ball first - look for combination opportunities",
      key_principles: [
        "Master the break shot for better ball spread",
        "Look for early 9-ball combinations",
        "Control the cue ball for optimal position",
        "Push out strategically when in trouble"
      ],
      tactical_advice: "9-ball is about precision and position - every shot should set up the next one."
    };
  }

  getStraightPoolStrategy(gameState, playerProfile) {
    return {
      primary_focus: "Maintain continuous play by planning break shots carefully",
      key_principles: [
        "Plan your break shot before clearing the rack",
        "Keep balls clustered for easier run-outs",
        "Develop consistent patterns and routes",
        "Practice safety play for defensive positioning"
      ],
      tactical_advice: "Straight pool rewards consistency and planning - think like a chess player."
    };
  }

  async analyzePlayerProgress(currentSession, historicalData) {
    const progress = {
      session_performance: this.analyzeSession(currentSession),
      improvement_trends: this.analyzeTrends(historicalData),
      recommendations: this.generateRecommendations(currentSession, historicalData),
      next_milestones: this.suggestMilestones(historicalData)
    };

    return progress;
  }

  analyzeSession(session) {
    const totalShots = session.shots?.length || 0;
    const successfulShots = session.shots?.filter(shot => shot.successful).length || 0;
    const accuracy = totalShots > 0 ? (successfulShots / totalShots) * 100 : 0;

    return {
      shots_taken: totalShots,
      successful_shots: successfulShots,
      session_accuracy: Math.round(accuracy),
      improvement_areas: this.identifySessionWeaknesses(session)
    };
  }

  analyzeTrends(historicalData) {
    if (!historicalData || historicalData.length < 2) {
      return { trend: 'insufficient_data', message: 'Play more games to see trends' };
    }

    const recent = historicalData.slice(-5);
    const older = historicalData.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, game) => sum + (game.accuracy || 0), 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, game) => sum + (game.accuracy || 0), 0) / older.length : recentAvg;

    const improvement = recentAvg - olderAvg;

    if (improvement > 5) {
      return { trend: 'improving', message: 'Your accuracy is trending upward!' };
    } else if (improvement < -5) {
      return { trend: 'declining', message: 'Focus on fundamentals to regain consistency' };
    } else {
      return { trend: 'stable', message: 'Consistent performance - ready for new challenges' };
    }
  }

  generateRecommendations(currentSession, historicalData) {
    const recommendations = [];
    
    const sessionAccuracy = currentSession.session_accuracy || 0;
    
    if (sessionAccuracy < 50) {
      recommendations.push("Focus on basic straight shots to build muscle memory");
      recommendations.push("Practice your stance and bridge for better stability");
    } else if (sessionAccuracy < 75) {
      recommendations.push("Work on cut shots at various angles");
      recommendations.push("Practice position play for better table control");
    } else {
      recommendations.push("Challenge yourself with advanced techniques");
      recommendations.push("Focus on strategic play and game management");
    }

    return recommendations;
  }

  suggestMilestones(historicalData) {
    const averageAccuracy = historicalData?.reduce((sum, game) => sum + (game.accuracy || 0), 0) / (historicalData?.length || 1) || 0;
    
    const milestones = [];
    
    if (averageAccuracy < 60) {
      milestones.push({ target: "60% accuracy", description: "Foundation level - consistent basic shots" });
    } else if (averageAccuracy < 75) {
      milestones.push({ target: "75% accuracy", description: "Intermediate level - reliable shot making" });
    } else if (averageAccuracy < 85) {
      milestones.push({ target: "85% accuracy", description: "Advanced level - precision and control" });
    } else {
      milestones.push({ target: "Tournament level", description: "Master advanced techniques and strategy" });
    }

    return milestones;
  }

  identifySessionWeaknesses(session) {
    const weaknesses = [];
    
    if (session.session_accuracy < 60) {
      weaknesses.push("Shot accuracy");
    }
    
    // Add more analysis based on shot patterns, timing, etc.
    if (session.shots && session.shots.length > 10) {
      const recentShots = session.shots.slice(-5);
      const recentAccuracy = recentShots.filter(s => s.successful).length / recentShots.length;
      
      if (recentAccuracy < 0.4) {
        weaknesses.push("Late-game pressure handling");
      }
    }

    return weaknesses;
  }
}

export default new LLMCoachService();