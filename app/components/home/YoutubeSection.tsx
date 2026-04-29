const videos = [
  { id: 1, thumbnail: "/youtube/youtube1.jpg", title: "Tandoori Pomfret", youtubeUrl: "https://youtube.com/watch?v=VIDEO_ID_1" },
  { id: 2, thumbnail: "/youtube/youtube2.jpg", title: "Bhai Style Biryani in 20 Minutes!", youtubeUrl: "https://youtube.com/watch?v=VIDEO_ID_2" },
  { id: 3, thumbnail: "/youtube/youtube3.jpg", title: "Cook like a Chef with TenderCuts", youtubeUrl: "https://youtube.com/watch?v=VIDEO_ID_3" },
  { id: 4, thumbnail: "/youtube/youtube4.jpg", title: "Get Ready to be Vahhhed!!!", youtubeUrl: "https://youtube.com/watch?v=VIDEO_ID_4" },
];

export default function YoutubeSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <h2 className="text-gray-900 font-bold text-lg md:text-xl mb-3 md:mb-4">Youtube Videos</h2>

      {/* Mobile: 2 col, Desktop: 4 col */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="w-full h-[120px] md:h-[160px] bg-gray-200 overflow-hidden">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600 ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}