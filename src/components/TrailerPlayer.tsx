"use client";
import YouTube from "react-youtube";
import { Checklist, Data, Medium } from "@/types/product";
import { useEffect, useRef, useState } from "react";

interface TrailerPlayerProps {
  media: Medium[];
  checklist: Checklist[];
  productData: Data;
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({
  media,
  checklist,
  productData,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showStickySection, setShowStickySection] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mainSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainSectionRef.current) {
        const rect = mainSectionRef.current.getBoundingClientRect();
        setShowStickySection(rect.bottom < 90);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter videos from preview_gallery
  const youtubeVideos = media.filter(
    (m) => m.resource_type === "video" && m.name === "preview_gallery"
  );
  const previewImages = media.filter(
    (m) => m.resource_type === "image" && m.name === "preview_gallery"
  );

  // Combine videos and images for thumbnail slider
  const allPreviewMedia = [...youtubeVideos, ...previewImages];

  if (!allPreviewMedia.length) return null;

  const currentMedia = allPreviewMedia[activeVideoIndex];

  const handleThumbnailClick = (index: number, mediaItem: Medium) => {
    const mediaIndex = allPreviewMedia.findIndex(
      (m) => m.resource_value === mediaItem.resource_value
    );
    if (mediaIndex !== -1) {
      setActiveVideoIndex(mediaIndex);
    }
  };

  const handlePrevVideo = () => {
    if (activeVideoIndex > 0) {
      setActiveVideoIndex(activeVideoIndex - 1);
    }
  };

  const handleNextVideo = () => {
    if (activeVideoIndex < allPreviewMedia.length - 1) {
      setActiveVideoIndex(activeVideoIndex + 1);
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <section className={`mb-12`} ref={mainSectionRef}>
        <div className="p-1 border border-gray-400 bg-white">
          {/* Video Player and Image Section */}

          <div className="relative">
            {currentMedia.resource_type === "video" ? (
              <div className=" relative">
                {!isPlaying ? (
                  // Custom thumbnail with play button overlay
                  <div
                    className="relative w-full h-[185px] bg-gray-200  overflow-hidden cursor-pointer group"
                    onClick={handlePlayClick}
                  >
                    {/* YouTube thumbnail */}
                    <img
                      src={currentMedia.thumbnail_url}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="rounded-full p-1 bg-white/50 backdrop-blur-0 shadow-md">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          {/* Play icon */}
                          <svg
                            className="w-10 h-10 text-green-600 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Actual YouTube player
                  <YouTube
                    videoId={currentMedia.resource_value}
                    className="w-full"
                    opts={{
                      width: "100%",
                      height: "185",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="relative w-full h-[185px] flex items-center justify-center">
                <img
                  src={currentMedia.resource_value}
                  alt="Preview Image"
                  className="object-contain"
                />
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="">
              <div className="absolute inset-y-0  left-0 flex items-center">
                <button
                  onClick={handlePrevVideo}
                  disabled={activeVideoIndex === 0}
                  className={`ml-2 p-1 rounded-full bg-white  text-white hover:bg-opacity-1 transition-all duration-200 ${
                    activeVideoIndex === 0
                      ? "opacity-30 disabled:cursor-not-allowed"
                      : "hover:scale-110"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={handleNextVideo}
                  disabled={activeVideoIndex === allPreviewMedia.length - 1}
                  className={`mr-2 p-1 rounded-full bg-white  text-white hover:bg-opacity-70 transition-all duration-200 ${
                    activeVideoIndex === allPreviewMedia.length - 1
                      ? "opacity-30 disabled:cursor-not-allowed"
                      : "hover:scale-110"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div className="mt-4 mb-10">
            <div className="flex space-x-3 overflow-x-auto pb-2 py-2 px-2 hide-scrollbar">
              {allPreviewMedia.map((mediaItem, index) => (
                <button
                  key={`${mediaItem.resource_type}-${index}`}
                  onClick={() => handleThumbnailClick(index, mediaItem)}
                  className={`flex-shrink-0 relative  overflow-hidden transition-all duration-200 ${
                    allPreviewMedia.findIndex(
                      (v) => v.resource_value === mediaItem.resource_value
                    ) === activeVideoIndex
                      ? "ring-1 ring-green-800 ring-offset-2 rounded-lg"
                      : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                  }`}
                >
                  <img
                    src={mediaItem.thumbnail_url || mediaItem.resource_value}
                    alt={`Preview ${index + 1}`}
                    className="w-[70px] h-[40px] object-cover"
                  />

                  {mediaItem.resource_type === "video" && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-red-600 bg-white rounded-full"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l7-5z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Course Price Section */}
          <div className="px-3">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">৳3850</span>
              <span className="text-2xl text-gray-500 line-through">৳5000</span>
              <span className="bg-[#F97B53] text-white px-2 py-1 rounded text-sm font-medium">
                ৳1150 ছাড়
              </span>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
              {productData?.cta_text?.name}
            </button>
          </div>

          {/* Checklist Section */}
          <div className=" bg-white">
            <div className=" p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                এই কোর্সে যা থাকছে
              </h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* scroll section */}
      <div
        className={`fixed  top-[70px] transition-transform duration-300 ease-in-out ${
          showStickySection ? "translate-y-0" : "hidden"
        }`}
      >
        {/* <div className="w-[65%]"></div> */}
        <div className="border border-gray-300 px-5 py-2">
          {/* Course Price Section */}
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl font-bold text-gray-900">৳3850</span>
              <span className="text-lg text-gray-500 line-through">৳5000</span>
              <span className="bg-[#F97B53] text-white px-2 py-1 rounded text-sm font-medium">
                ৳1150 ছাড়
              </span>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
              {productData?.cta_text?.name}
            </button>
          </div>

          {/* Compact Checklist Section */}
          <div className=" bg-white">
            <div className=" p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                এই কোর্সে যা থাকছে
              </h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrailerPlayer;
