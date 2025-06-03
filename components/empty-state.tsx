"use client"

import { Music, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onUploadClick: () => void
}

export default function EmptyState({ onUploadClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
        <Music className="w-12 h-12 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有上传任何歌曲</h3>
      <p className="text-gray-500 mb-8 max-w-md">开始上传您喜爱的音乐，打造属于您的个人音乐库</p>
      <Button
        onClick={onUploadClick}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Upload className="w-4 h-4 mr-2" />
        上传第一首歌曲
      </Button>
    </div>
  )
}
