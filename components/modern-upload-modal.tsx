"use client"

import { useState } from "react"
import { X, Upload, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "../utils/supabase"

interface UploadModalProps {
  onClose: () => void
  onUploadSuccess: () => void
}

export default function ModernUploadModal({ onClose, onUploadSuccess }: UploadModalProps) {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      alert("请填写完整信息并选择文件")
      return
    }

    setIsUploading(true)

    try {
      const filename = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from("music").upload(filename, file)

      if (uploadError) {
        alert("上传失败")
        return
      }

      const { data } = supabase.storage.from("music").getPublicUrl(filename)
      const url = data.publicUrl

      const { error: insertError } = await supabase.from("songs").insert([{ title, artist, description, url }])

      if (insertError) {
        alert("插入数据库失败")
        return
      }

      onUploadSuccess()
      onClose()
    } catch (error) {
      alert("上传过程中出现错误")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">上传歌曲</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">歌曲名称</label>
            <Input
              type="text"
              placeholder="输入歌曲名称"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">艺术家</label>
            <Input
              type="text"
              placeholder="输入艺术家名称"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">描述</label>
            <Textarea
              placeholder="添加歌曲描述（可选）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">音频文件</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                accept=".mp3,audio/mp3"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer text-sm text-gray-600 hover:text-purple-600">
                {file ? file.name : "点击选择 MP3 文件"}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            取消
          </Button>
          <Button
            onClick={handleUpload}
            disabled={isUploading || !file || !title || !artist}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isUploading ? "上传中..." : "确认上传"}
          </Button>
        </div>
      </div>
    </div>
  )
}
