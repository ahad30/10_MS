import parse from 'html-react-parser';
import { Section } from '@/types/product';

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

  if (!faqSection || !faqSection.values.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{faqSection.name}</h2>
      <div className="grid gap-2">
        {faqSection.values.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;