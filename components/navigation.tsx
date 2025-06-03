"use client"

import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  onUploadClick: () => void
}

export default function Navigation({ onUploadClick }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MUSIC
            </h1>
          </div>
          <Button
            onClick={onUploadClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            上传
          </Button>
        </div>
      </div>
    </nav>
  )
}
