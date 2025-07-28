import parse from 'html-react-parser';
import { Section } from '@/types/product';
import Accordion from './common/Accordion/Accordion';
import { useState } from 'react';

interface FAQProps {
  sections: Section[];
}

const FAQItem: React.FC<{ faq: Section['values'][0] }> = ({ faq }) => (
  <div className="p-4 bg-gray-50 rounded-lg mb-2">
    <h3 className="font-semibold">{faq.question}</h3>
    {faq.answer && <div className="prose max-w-none">{parse(faq.answer)}</div>}
  </div>
);

const FAQ: React.FC<FAQProps> = ({ sections }) => {
  const faqSection = sections.find((s) => s.type === 'faq');
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  
  if (!faqSection || !faqSection.values.length) return null;

  const handleToggle = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{faqSection.name}</h2>
      <div className="border border-gray-200 rounded-lg">
        {faqSection.values.map((faq, index) => (
             <Accordion
            key={faq.id}
            title={faq.question || `Section ${index + 1}`}
            content={faq.answer || ''}
            isOpen={!!openItems[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;