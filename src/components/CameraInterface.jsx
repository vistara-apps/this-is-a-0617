import React, { useState, useRef } from 'react'
import { Camera, Upload, Loader, AlertCircle } from 'lucide-react'

const CameraInterface = ({ onImageAnalysis, isAnalyzing }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)

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
        setError('Please select a valid image file')
      }
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setError('')
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      const imageData = canvas.toDataURL('image/jpeg')
      setSelectedImage(imageData)
      
      // Stop camera
      const stream = video.srcObject
      stream.getTracks().forEach(track => track.stop())
      setCameraActive(false)
      
      onImageAnalysis(imageData)
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Shot Analysis</h2>
        <p className="text-gray-400">
          Upload a photo or use live camera to analyze your pool table
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!cameraActive && (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="card hover:bg-gray-700 transition-colors cursor-pointer text-center space-y-4 py-8"
            >
              <div className="w-12 h-12 bg-primary rounded-xl mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Upload Photo</h3>
                <p className="text-gray-400 text-sm">Select an image from your device</p>
              </div>
            </button>

            <button
              onClick={startCamera}
              disabled={isAnalyzing}
              className="card hover:bg-gray-700 transition-colors cursor-pointer text-center space-y-4 py-8"
            >
              <div className="w-12 h-12 bg-accent rounded-xl mx-auto flex items-center justify-center">
                <Camera className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Live Camera</h3>
                <p className="text-gray-400 text-sm">Use your device camera</p>
              </div>
            </button>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {cameraActive && (
        <div className="card space-y-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute inset-0 border-2 border-accent/50 rounded-lg pointer-events-none"></div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={capturePhoto}
              className="btn-primary flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Photo
            </button>
            <button
              onClick={stopCamera}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="card">
          <h3 className="font-semibold mb-4">Captured Image</h3>
          <div className="relative">
            <img
              src={selectedImage}
              alt="Pool table"
              className="w-full rounded-lg"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Loader className="w-8 h-8 animate-spin mx-auto text-accent" />
                  <p className="text-white font-medium">Analyzing table...</p>
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