import { Checklist } from '@/types/product';

interface CourseHighlightsProps {
  checklist: Checklist[];
}

const ChecklistItem: React.FC<{ item: Checklist }> = ({ item }) => (
  <div className="flex items-center space-x-2 mb-2">
    {item.icon && (
      <img src={item.icon} alt="Checklist icon" className="w-5 h-5" />
    )}
    <span style={{ color: item.color }}>{item.text}</span>
  </div>
);

const CourseHighlights: React.FC<CourseHighlightsProps> = ({ checklist }) => {
  const visibleChecklist = checklist.filter((item) => item.list_page_visibility);

  if (!visibleChecklist.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Course Highlights</h2>
      <div className="grid gap-2">
        {visibleChecklist.map((item) => (
          <ChecklistItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CourseHighlights;