import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";

type Props = {};

const ContactView = (props: Props) => {
  return (
    <>
      <CardHeader className="bg-gray-900 p-5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <span className="text-white uppercase font-bold">Vizualize um contato</span>
      </CardHeader>

      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography color="gray" className="mt-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
          Vizualize um contato em sua agenda.
        </Typography>

        <div>
          <div className="grid grid-cols-5 gap-4 mt-5">
            <div id="userIcon" className="col-span-1">
              <label className="labelFileInput">
                <UserCircleIcon className="h-48 w-48 text-black cursor-pointer" />
              </label>
            </div>
            <div className="col-span-4">
              <div className="mt-10">
                <Input variant="static" label="Nome" icon={<UserIcon />} value={"Nome"} readOnly onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </div>
              <div className="mt-7">
                <Input variant="static" label="Sobrenome" icon={<UserIcon />} value={"sobrenome"} readOnly onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  );
};

export default ContactView;
