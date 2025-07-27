import { Section } from '@/types/product';
import parse from 'html-react-parser';
import { ChevronRight } from 'lucide-react';

interface InstructorsSectionProps {
  sections: Section[];
}


const InstructorsSection: React.FC<InstructorsSectionProps> = ({ sections }) => {
  const instructorsSection = sections.find((s) => s.type === 'instructors');

  if (!instructorsSection || !instructorsSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{instructorsSection.name}</h2>
      <div className="">
        {instructorsSection.values.map((instructor, index) => (
            <div key={index} className="flex items-center border space-x-4 px-4 py-3  rounded-lg">
   <div>
     {instructor.image && (
      <img src={instructor.image} alt={instructor.name} className="w-16 h-16 rounded-full object-cover" />
    )}
   </div>
    <div className=''>
      <h3 className="text-lg font-semibold flex items-center gap-1 hover:text-green-500 cursor-pointer">{instructor.name} <span><ChevronRight size={18} className=''/></span></h3>
      <div className="text-[16px]">{instructor.description && 
      parse(instructor.description)}</div>
    </div>
  </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorsSection;