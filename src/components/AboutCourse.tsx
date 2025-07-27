import { Section } from '@/types/product';
import { useState } from "react";
import Accordion from './common/Accordion';


interface AboutCourseProps {
  sections: Section[];
}

const AboutCourse: React.FC<AboutCourseProps> = ({ sections }) => {
  const aboutSection = sections.find((s) => s.type === 'about');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  if (!aboutSection || !aboutSection.values.length) return null;

  const handleToggle = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {aboutSection.name}
      </h2>
      
      <div className="border border-gray-200 rounded-lg">
        {aboutSection.values.map((item, index) => (
          <Accordion
            key={item.id}
            title={item.title || `Section ${index + 1}`}
            content={item.description || ''}
            isOpen={!!openItems[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutCourse;