import parse from 'html-react-parser';
import { Section } from '@/types/product';

interface AboutCourseProps {
  sections: Section[];
}

const AboutCourse: React.FC<AboutCourseProps> = ({ sections }) => {
  const aboutSection = sections.find((s) => s.type === 'about');

  if (!aboutSection || !aboutSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{aboutSection.name}</h2>
      <div className="prose max-w-none">
        {aboutSection.values.map((item) => (
          <div key={item.id}>
            {item.title && parse(item.title)}
            {item.description && parse(item.description)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCourse;