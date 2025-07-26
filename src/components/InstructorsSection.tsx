import { Section } from '@/types/product';
import parse from 'html-react-parser';

interface InstructorsSectionProps {
  sections: Section[];
}

const InstructorCard: React.FC<{  instructor: Section['values'][0] }> = ({ instructor }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
    {instructor.image && (
      <img src={instructor.image} alt={instructor.name} className="w-16 h-16 rounded-full object-cover" />
    )}
    <div>
      <h3 className="text-lg font-semibold">{instructor.name}</h3>
      <p className="text-gray-600">{instructor.short_description}</p>
      <div className="prose max-w-none">{instructor.description && 
      parse(instructor.description)}</div>
    </div>
  </div>
);

const InstructorsSection: React.FC<InstructorsSectionProps> = ({ sections }) => {
  const instructorsSection = sections.find((s) => s.type === 'instructors');

  if (!instructorsSection || !instructorsSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{instructorsSection.name}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {instructorsSection.values.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </section>
  );
};

export default InstructorsSection;