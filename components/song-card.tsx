import { Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Song {
  id: string
  title: string
  artist: string
  description: string
  url: string
}

interface SongCardProps {
  song: Song
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-lg">{song.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{song.artist}</p>
            {song.description && <p className="text-gray-500 text-sm mb-4 line-clamp-2">{song.description}</p>}
            <div className="mt-4">
              <audio
                controls
                src={song.url}
                className="w-full h-8 rounded-lg"
                style={{
                  filter: "sepia(20%) saturate(70%) hue-rotate(315deg) brightness(95%) contrast(105%)",
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
