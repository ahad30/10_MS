import { ChevronDown } from "lucide-react";
import parse from 'html-react-parser';


interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  return (
<section className="px-3">
        <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-800">
          {parse(title)}
        </span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 text-gray-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "" : "max-h-0"
        }`}
      >
        <div className="p-4 pl-6">
          <div className="max-w-none text-[#000000] text-lg space-y-3">
            {parse(content)}
          </div>
        </div>
      </div>
    </div>
</section>
  );
};


export default Accordion;