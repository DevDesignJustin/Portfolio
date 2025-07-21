import Footer from "./Footer";
const Contact = () => {
  return (
    <section>
      <div className="container h-[700px] flex items-center justify-center">
        <div className="contact-content flex flex-col items-center">
          <h1 className="text-9xl font-bold mb-3.5">Let's Talk!</h1>
          <button className="bg-black text-white font-semibold w-[280px] h-[60px] flex items-center justify-center gap-3 rounded-full">devdesignjustin@gmail.com <img src="/images/icons/arrow-dia.svg" className="size-6" alt="" /></button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
