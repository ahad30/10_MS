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
<section className="px-2">
        <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full p-4  focus:outline-none hover:bg-gray-50 transition-colors hover:text-gray-900 "
        onClick={onToggle}
      >
        <span className="!text-lg font-bold text-gray-800 text-left lg:w-[100%]">
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
          <div className="max-w-none text-[#2C3240]  text-lg space-y-3">
            {parse(content)}
          </div>
        </div>
      </div>
    </div>
</section>
  );
};


export default Accordion;