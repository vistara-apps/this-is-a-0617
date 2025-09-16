import React, { useState, useRef, useEffect } from 'react'
import { Camera, Upload, Loader, AlertCircle, Zap, Scan, Target, Play, Square } from 'lucide-react'

const CameraInterface = ({ onImageAnalysis, isAnalyzing }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Simulate analysis progress
  useEffect(() => {
    if (isAnalyzing) {
      setAnalysisProgress(0)
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setSelectedImage(e.target.result)
          setError('')
          onImageAnalysis(e.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        setError('Please select a valid image file (JPG, PNG, WebP)')
      }
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setError('')
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions for optimal experience.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      setIsCapturing(true)
      
      // Add capture animation delay
      setTimeout(() => {
        const canvas = document.createElement('canvas')
        const video = videoRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg', 0.9)
        setSelectedImage(imageData)
        
        // Stop camera
        const stream = video.srcObject
        stream.getTracks().forEach(track => track.stop())
        setCameraActive(false)
        setIsCapturing(false)
        
        onImageAnalysis(imageData)
      }, 300)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      stream.getTracks().forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-accent/30">
          <Zap className="w-6 h-6 text-accent animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Neural Vision Analysis
          </h2>
        </div>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Advanced computer vision powered by neural networks for real-time pool table analysis
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card bg-error/10 border-error/30 animate-slide-down">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-error animate-pulse" />
            <p className="text-error font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!cameraActive && !selectedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="card glow-on-hover group relative overflow-hidden p-8 text-center space-y-6 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all duration-300 group-hover:scale-110">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">Upload Image</h3>
                <p className="text-text-secondary">Select a high-quality photo of your pool table</p>
              </div>
            </div>
          </button>

          <button
            onClick={startCamera}
            disabled={isAnalyzing}
            className="card glow-on-hover group relative overflow-hidden p-8 text-center space-y-6 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-2xl mx-auto flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all duration-300 group-hover:scale-110">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors">Live Camera</h3>
                <p className="text-text-secondary">Real-time analysis during gameplay</p>
              </div>
            </div>
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,image/heic,image/heif"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Camera View */}
      {cameraActive && (
        <div className="card-elevated space-y-6 animate-scale-in">
          <div className="relative overflow-hidden rounded-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover rounded-2xl"
            />
            
            {/* Camera Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner guides */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent rounded-br-lg"></div>
              
              {/* Center crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Target className="w-8 h-8 text-accent/60 animate-pulse" />
              </div>
              
              {/* Scanning line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan"></div>
            </div>

            {/* Capture Flash Effect */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white animate-pulse"></div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={capturePhoto}
              disabled={isCapturing}
              className="btn-primary flex-1 flex items-center justify-center space-x-3 py-4 disabled:opacity-50"
            >
              <Camera className="w-5 h-5" />
              <span className="font-semibold">{isCapturing ? 'Capturing...' : 'Capture & Analyze'}</span>
            </button>
            <button
              onClick={stopCamera}
              className="btn-secondary flex items-center justify-center space-x-3 py-4 sm:w-auto"
            >
              <Square className="w-5 h-5" />
              <span>Stop Camera</span>
            </button>
          </div>
        </div>
      )}

      {/* Image Analysis View */}
      {selectedImage && (
        <div className="card-elevated space-y-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl flex items-center space-x-3">
              <Scan className="w-6 h-6 text-accent" />
              <span>Analysis in Progress</span>
            </h3>
            {!isAnalyzing && (
              <button
                onClick={() => setSelectedImage(null)}
                className="btn-ghost text-sm"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={selectedImage}
              alt="Pool table analysis"
              className="w-full aspect-video object-cover rounded-2xl"
            />
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-accent/20 rounded-full animate-spin">
                      <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    </div>
                    <Zap className="w-8 h-8 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-white">Neural Processing</h4>
                    <p className="text-text-secondary">Analyzing ball positions and trajectory calculations...</p>
                    
                    {/* Progress Bar */}
                    <div className="w-64 mx-auto">
                      <div className="flex justify-between text-sm text-text-muted mb-2">
                        <span>Progress</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-300 shadow-glow"
                          style={{ width: `${Math.min(analysisProgress, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CameraInterface