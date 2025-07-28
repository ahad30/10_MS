'use client';
import parse from 'html-react-parser';
import YouTube from 'react-youtube';
import { useState } from 'react';
import { Section, SectionValue } from '@/types/product';
import { ReusableSlider } from './common/Slider/ReusableSlider';

interface TestimonialsProps {
  sections: Section[]
}

const TestimonialCard: React.FC<{ testimonial: Section['values'][0] }> = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <>
      {/* Added mt-6 to create space for the quote icon */}
      <div className="relative py-5 px-5 border border-gray-300 rounded-lg overflow-visible mt-6">
        {/* Quote icon positioned absolutely */}
        <div className="absolute -top-[19px] left-[40px] transform -translate-x-1/2 bg-[#FCE0D6] flex items-center justify-center w-[38px] h-[38px] rounded-full z-10 " id="quote">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30">
              <path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path>
            </svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30">
              <path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path>
            </svg>
          </div>
        </div>
        
        {testimonial.video_url && (
          <div className="mt-4 relative">
            {!isPlaying ? (
              // Custom thumbnail with play button overlay
              <div 
                className="relative w-full h-[185px] bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                onClick={handlePlayClick}
              >
                {/* YouTube thumbnail */}
                <img 
                  src={testimonial.thumb} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
        <div className="rounded-full p-5 bg-white/50 backdrop-blur-0 shadow-md">
  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
    {/* Play icon */}
    <svg 
      className="w-10 h-10 text-red-600 ml-1" 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z"/>
    </svg>
  </div>
</div>

                </div>
              </div>
            ) : (
              // Actual YouTube player
              <YouTube
                videoId={testimonial.video_url}
                className="w-full rounded-lg"
                opts={{ 
                  width: '100%', 
                  height: '185',
                  playerVars: {
                    autoplay: 1,
                  }
                }}
              />
            )}
          </div>
        )}
        
        <div className='flex gap-4 items-center mt-5'>
          {testimonial.profile_image && (
            <img src={testimonial.profile_image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
          )}
          <div>
            <h3 className="font-semibold text-sm">{testimonial.name}</h3>
            <p className="text-gray-600 text-sm">{testimonial.description}</p>
          </div>
        </div>
        {/* {testimonial.testimonial && (
          <div className="prose max-w-none">{parse(testimonial.testimonial)}</div>
        )} */}
      </div>
    </>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ sections }) => {
  const testimonialsSection = sections.find((s) => s.type === 'testimonials');
  const testimonialsSectionFilter = testimonialsSection?.values?.filter((s) => s?.video_url !== "") || [];
  
  if (!testimonialsSection || !testimonialsSection.values.length) return null;
  
  const sliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <section className="mb-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {testimonialsSection.name}
      </h2>
      
      {/* Added pt-6 to the slider container to provide space for quote icons */}
      <div className="pt-6">
        <ReusableSlider {...sliderSettings} className="testimonial-slider">
          {testimonialsSectionFilter.map((testimonial: SectionValue) => (
            <div key={testimonial.id} className="px-2">
              {testimonial.video_url !== "" && (
                <TestimonialCard testimonial={testimonial} />
              )}
            </div>
          ))}
        </ReusableSlider>
      </div>
    </section>
  );
};

export default Testimonials;