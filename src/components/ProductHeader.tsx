import parse from 'html-react-parser';

interface ProductHeaderProps {
  title: string;
  description: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, description }) => (
  <section className="lg:py-24 px-10 mb-3"
   style={{
           backgroundImage: `url("/ui_(1)_1716445506383.jpeg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 100%",
          }}
  
  >
   <div className='max-w-[1250px] mx-auto flex px-5'>
     <div className='w-[60%]'>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-[#A3A3A3] text-start">{parse(description)}</p>
     </div>
     <div className='w-[40%]'></div>
   </div>
  </section>
);

export default ProductHeader;