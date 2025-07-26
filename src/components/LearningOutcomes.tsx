import { Section } from '@/types/product';

interface LearningOutcomesProps {
  sections: Section[];
}

const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ sections }) => {
  const pointersSection = sections.find((s) => s.type === 'pointers');

  if (!pointersSection || !pointersSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{pointersSection.name}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {pointersSection.values.map((pointer) => (
          <div key={pointer.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">{pointer.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningOutcomes;