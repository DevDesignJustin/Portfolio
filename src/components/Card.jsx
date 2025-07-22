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
    <div className="project-card w-[560px] pb-8 ">
      <div
        onMouseEnter={cardHover}
        onMouseLeave={cardHoverHide}
        onMouseDown={cardClick}
        onMouseMove={cardHoverMove}
        className="card-display w-full rounded-[25px] overflow-hidden relative"
      >
        <div
          ref={hoverBtn}
          className="view-project pointer-events-none hidden absolute rounded-full justify-center items-center size-18 bg-white  text-center"
        >
          <h6 className="text-[14px] ">Open Project</h6>
        </div>
        <img src={`images/projects/${image}.png`} alt="" />
      </div>
      <h6 className="text-2xl font-bold mt-[55px]">{title}</h6>
      <p className="text-[16px] mt-2">{message}</p>
    </div>
  );
};

export default Card;