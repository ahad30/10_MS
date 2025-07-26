'use client';
import YouTube from 'react-youtube';
import { Medium } from '@/types/product';

interface TrailerPlayerProps {
  media: Medium[];
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({ media }) => {
  const youtubeVideo = media.find((m) => m.resource_type === 'video' && m.name === 'preview_gallery');

  if (!youtubeVideo) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Course Trailer</h2>
      <div className="">
        <YouTube
          videoId={youtubeVideo.resource_value}
          className="w-full"
          opts={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  );
};

export default TrailerPlayer;