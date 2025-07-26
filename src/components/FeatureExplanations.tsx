import { Section } from '@/types/product';

interface FeatureExplanationsProps {
  sections: Section[];
}

const FeatureExplanations: React.FC<FeatureExplanationsProps> = ({ sections }) => {
  const featureSection = sections.find((s) => s.type === 'feature_explanations');

  if (!featureSection || !featureSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{featureSection.name}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {featureSection.values.map((feature) => (
          <div key={feature.id} className="p-4 bg-gray-50 rounded-lg">
            {feature.file_type === 'image' && feature.file_url && (
              <img src={feature.file_url} alt={feature.title} className="w-12 h-12 mb-2" />
            )}
            <h3 className="font-semibold">{feature.title}</h3>
            {feature.checklist && (
              <ul className="list-disc pl-5 text-gray-600">
                {feature.checklist.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureExplanations;