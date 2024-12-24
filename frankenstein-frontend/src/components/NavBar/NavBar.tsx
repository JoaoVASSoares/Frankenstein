import React from "react";
import { Navbar, Typography, Button, IconButton, Collapse } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+24px)] overflow-hidden bg-gray-500 col-span-2">
      <Navbar className="sticky mt-4 top-5 z-10 h-max max-w-full rounded-none px-8 py-2 lg:px-8 lg:py-4" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
            <Link to="/" className="flex items-center gap-5">
              <img src="/assets/Images/logo.ico" alt="Logo" height={32} width={32} />
              <span className="font-mono font-bold uppercase">FrankenStain</span>
            </Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button variant="text" size="sm" className="hidden lg:inline-block" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
                <span>Log In</span>
              </Button>
              <Button variant="gradient" size="sm" className="hidden lg:inline-block" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
                <span>Sign in</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
              placeholder=""
              onPointerEnterCapture=""
              onPointerLeaveCapture=""
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
