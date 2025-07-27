import { Section } from '@/types/product';
import { Check } from 'lucide-react';

interface LearningOutcomesProps {
  sections: Section[];
}

const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ sections }) => {
  const pointersSection = sections.find((s) => s.type === 'pointers');

  if (!pointersSection || !pointersSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{pointersSection.name}</h2>
      <div className="grid  grid-cols-1 md:grid-cols-2 border border-gray-300 rounded-md">
        {pointersSection.values.map((pointer) => (
          <div key={pointer.id} className="flex gap-3 p-4">
            <p className='text-blue-500'><Check size={20}/></p>
            <p className="text-[#111827]">{pointer.text}</p>
          
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningOutcomes;