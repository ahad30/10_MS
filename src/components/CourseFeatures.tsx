import { Section } from '@/types/product';

interface CourseFeaturesProps {
  sections: Section[];
}

const CourseFeatures: React.FC<CourseFeaturesProps> = ({ sections }) => {
  const featuresSection = sections.find((s) => s.type === 'features');

  if (!featuresSection || !featuresSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{featuresSection.name}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {featuresSection.values.map((feature) => (
          <div key={feature.id} className="p-4 bg-gray-50 rounded-lg">
            {feature.icon && (
              <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-2" />
            )}
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseFeatures;