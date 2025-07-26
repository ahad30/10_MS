import parse from 'html-react-parser';

interface ProductHeaderProps {
  title: string;
  description: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, description }) => (
  <section className="mb-12">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
    <div className="prose max-w-none">{parse(description)}</div>
  </section>
);

export default ProductHeader;