import { useRef } from "react";

const Card = ({ message, title, image, link }) => {
  const hoverBtn = useRef();
  let circleIsOn = false;

  const cardHover = () => {
    hoverBtn.current.style.display = 'flex';
    circleIsOn = true;
  };

  const cardHoverMove = (e) => {
    if (circleIsOn && hoverBtn.current) {
      const { offsetX, offsetY } = e.nativeEvent;
      hoverBtn.current.style.top = `${offsetY - hoverBtn.current.offsetHeight / 2}px`;
      hoverBtn.current.style.left = `${offsetX - hoverBtn.current.offsetWidth / 2}px`;
    }
  };

  const cardHoverHide = () => {
    hoverBtn.current.style.display = 'none';
    circleIsOn = false;
  };

  const cardClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="project-card w-full pb-10 ">
      <div
        onMouseEnter={cardHover}
        onMouseLeave={cardHoverHide}
        onMouseDown={cardClick}
        onMouseMove={cardHoverMove}
        className="card-display w-full rounded-[15px] md:rounded-[25px] overflow-hidden relative"
      >
        <div
          ref={hoverBtn}
          className="view-project pointer-events-none hidden absolute rounded-full justify-center items-center size-18 bg-white  text-center"
        >
          <h6 className="text-[14px] ">Open Project</h6>
        </div>
        <img src={`images/projects/${image}.png`} alt="" />
      </div>
      <h6 className="sm:text-2xl text-[18px] font-bold md:mt-[55px] mt-[20px]">{title}</h6>
      <p className="sm:text-[16px] text-[15px] sm:mt-2 mt-0">{message}</p>
    </div>
  );
};

export default Card;