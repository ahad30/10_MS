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
      <div className="grid grid-cols-1  md:grid-cols-2 bg-[#111827] px-4 py-2 rounded-md">
        {featuresSection.values.map((feature) => (
          <div key={feature.id} className="py-8 px-2 flex gap-3">
            {feature.icon && (
              <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-2" />
            )}
           <div>
             <h3 className="font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-[15px] leading-[22px]">{feature.subtitle}</p>
           </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseFeatures;