export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            mp3 download website recommendation{" "}
            <a
              href="https://www.myfreemp3.com.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200 hover:underline"
            >
              www.myfreemp3.com.cn
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
