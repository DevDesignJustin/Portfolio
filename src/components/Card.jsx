import { useRef } from "react";

const Card = ({ message, title, image, link}) => {
  const hoverBtn = useRef()
  let circleIsOn = false
  const cardHover= () => {
    hoverBtn.current.style.display ='flex'
    circleIsOn = true
    
  }

  document.addEventListener('mousemove', (e) => {
    if(circleIsOn){
      hoverBtn.current.style.top = `${e.clientY - hoverBtn.current.offsetHeight / 2}px`;
      hoverBtn.current.style.left = `${e.clientX - hoverBtn.current.offsetWidth / 2}px`;
    } 
  })

  const cardHoverHide = () => {
    hoverBtn.current.style.display ='none'
    circleIsOn = false
  }

  const cardClick = () => {
    window.open({link}, '_blank')
  }

  return (
    <div className="project-card w-[579px] ">
      <div onMouseEnter={cardHover} onMouseLeave={cardHoverHide} onMouseDown={cardClick} className="card-display w-full h-[402px] rounded-[25px] overflow-hidden">
        <div ref={hoverBtn} className="view-project pointer-events-none hidden absolute rounded-full justify-center items-center size-18 bg-white opacity-85 backdrop-blur-lg text-center">
          <h6 className="text-[14px] ">Open Project</h6>
        </div>
        <img src={`images/projects/${image}.png`} alt="" />
      </div>
      <h6 className="text-2xl font-bold mt-[55px]">{title}</h6>
      <p className="text-[16px] mt-2">{message}</p>
    </div>
  );
}

export default Card