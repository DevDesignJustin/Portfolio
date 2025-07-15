const Button = ({ variant, color, message, arrow }) => {
    let buttonStyles
    if (variant == 'fill') {
        buttonStyles = `bg-${color} `
    }
  return (
    <button className={`${buttonStyles} w-full h-[50px] rounded-full`}>
      <a href="">{message}</a>
      {arrow && (
        <img src={`images/icons/arrows-${arrow}.svg`} alt="" className="ml-2" />
      )}
    </button>
  );
};

export default Button;
