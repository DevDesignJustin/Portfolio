import Footer from "./Footer";
const Contact = () => {
  return (
    <section className="bg-[#F8FBFF]" id="contact">
      <div className="container contact-content flex flex-col items-center justify-center h-[700px] text-[#3F6CA7]">
        <h1 className="md:text-9xl sm:text-8xl text-7xl font-bold mb-3.5">Let's Talk!</h1>
        <button className="bg-[#3F6CA7] text-white text-[12px] sm:text-[16px] font-semibold w-[200px] sm:w-[280px] h-[50px] sm:h-[60px] flex items-center justify-center gap-3 rounded-full">
          devdesignjustin@gmail.com{" "}
          <img src="/images/icons/arrow-dia.svg" className="size-4 sm:size-6" alt="" />
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
