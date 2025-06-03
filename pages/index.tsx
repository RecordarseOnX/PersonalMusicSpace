"use client"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase"
import Navigation from "../components/navigation"
import ModernUploadModal from "../components/modern-upload-modal"
import SongCard from "../components/song-card"
import EmptyState from "../components/empty-state"
import Footer from "../components/footer"

interface Song {
  id: string
  title: string
  artist: string
  description: string
  url: string
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

 const fetchSongs = async () => {
  try {
    const { data, error } = await supabase.from("songs").select("*")
    if (error) {
      console.error("Error fetching songs:", error)
      return
    }
    console.log("Fetched songs:", data)
    setSongs(data || [])
  } catch (error) {
    console.error("Error:", error)
  } finally {
    setIsLoading(false)
  }
}


  useEffect(() => {
    fetchSongs()
  }, [])

  const handleUploadSuccess = () => {
    fetchSongs()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation onUploadClick={() => setShowUpload(true)} />

      <main className="max-w-4xl mx-auto px-6 py-8 pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : songs.length === 0 ? (
          <EmptyState onUploadClick={() => setShowUpload(true)} />
        ) : (
          <div className="space-y-4">
            <div className="mb-8">
              <p className="text-gray-600">共 {songs.length} 首歌曲</p>
            </div>
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showUpload && <ModernUploadModal onClose={() => setShowUpload(false)} onUploadSuccess={handleUploadSuccess} />}
    </div>
  )
}
