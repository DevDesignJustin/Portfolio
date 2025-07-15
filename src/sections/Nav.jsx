const Nav = () => {
  return (
    <nav className="flex w-full mt-14">
      <div className="logo flex  items-center">
        <img className="size-4" src="/images/logo.svg" alt="" />{" "}
        <h6 className="text-2xl ml-0.5">ustin</h6>
      </div>
      <div className="nav-container w-[calc(100%-63px)] justify-center flex">
        <ul className="flex h-[50px] w-[460px] justify-between items-center rounded-full bg-black">
          <li className="nav-item w-[41px] active ml-[4.5px]">
            <a href="">
              <img src="/images/icons/home.svg" alt="" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
