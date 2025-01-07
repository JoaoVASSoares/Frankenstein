import React from "react";
import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SidBar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card
      className="h-[calc(95vh-2rem)] w-full max-w-[20rem] p-4 bg-gray-200 rounded-none"
      id="sidBar"
      style={{ top: 23, zIndex: 100 }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <NavLink to="contact">
          <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <BookmarkIcon className="h-5 w-5" />
            </ListItemPrefix>
            Agenda
          </ListItem>
        </NavLink>

        <Accordion
          open={open === 2}
          icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <ListItem className="p-0" selected={open === 2} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SidBar;
