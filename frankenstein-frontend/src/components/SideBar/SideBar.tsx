import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside>
      <Card
        className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-2 p-1">
          <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Link to="/" className="flex items-center gap-5">
              <img src="/assets/Images/logo.ico" alt="Logo" height={32} width={32} />
              <span className="font-mono font-bold uppercase">FrankenStain</span>
            </Link>
          </Typography>
        </div>
        <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <NavLink to={"/contact  "}>
            <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Contatos
            </ListItem>
          </NavLink>
        </List>
      </Card>
    </aside>
  );
}
