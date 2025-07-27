import { Section } from '@/types/product';
import { Check } from 'lucide-react';

interface FeatureExplanationsProps {
  sections: Section[];
}

const FeatureExplanations: React.FC<FeatureExplanationsProps> = ({ sections }) => {
  const featureSection = sections.find((s) => s.type === 'feature_explanations');

  if (!featureSection || !featureSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{featureSection.name}</h2>
      <div className="border border-gray-300 rounded-md relative px-3">
        {featureSection.values.map((feature, index) => (
          <div key={index} className={`flex flex-col lg:flex-row gap-5 lg:justify-between p-4 ${index === 0 ? 'border-gray-300 border-b' : ''}`}>
          
          <div>
               <h3 className="font-semibold mb-4">{feature.title}</h3>
            {feature.checklist && (
              <ul className="list-none pl-5 text-gray-600 space-y-2">

            {feature.checklist.map((item, idx) => (
                   <>

                   <div className='flex gap-4 items-center'>
                     <p className='text-blue-600'><Check size={24}/></p>
                  <li key={idx}>{item}</li>
                   </div>
                   
                   </>
                ))}
          
    
               
              </ul>
            )}
          </div>
          
            <div>
                {feature.file_type === 'image' && feature.file_url && (
              <img src={feature.file_url} alt={feature.title} className="w-[220px] h-[220px] mb-2 object-cover" />
            )}
            </div>
          </div>
        ))}
       
      </div>
    </section>
  );
};

export default FeatureExplanations;