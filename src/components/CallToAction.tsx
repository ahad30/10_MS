interface CallToActionProps {
  ctaText: string;
  price: number;
}

const CallToAction: React.FC<CallToActionProps> = ({ ctaText, price }) => (
  <section className="text-center">
    <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
      {ctaText} - ৳{price}
    </button>
  </section>
);

export default CallToAction;