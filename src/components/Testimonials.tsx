'use client';
import parse from 'html-react-parser';
import YouTube from 'react-youtube';
import { Section } from '@/types/product';

interface TestimonialsProps {
  sections: Section[];
}

const TestimonialCard: React.FC<{ testimonial: Section['values'][0] }> = ({ testimonial }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    {testimonial.profile_image && (
      <img src={testimonial.profile_image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-2" />
    )}
    <h3 className="font-semibold">{testimonial.name}</h3>
    <p className="text-gray-600">{testimonial.description}</p>
    {/* {testimonial.testimonial && (
      <div className="prose max-w-none">{parse(testimonial.testimonial)}</div>
    )} */}
    {testimonial.video_url && (
      <div className="mt-4">
        <YouTube
          videoId={testimonial.video_url}
          className="w-full"
          opts={{ width: '100%', height: '200' }}
        />
      </div>
    )}
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ sections }) => {
  const testimonialsSection = sections.find((s) => s.type === 'testimonials');

  if (!testimonialsSection || !testimonialsSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{testimonialsSection.name}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonialsSection.values.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;