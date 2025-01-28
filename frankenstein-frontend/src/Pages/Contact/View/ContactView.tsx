import { AtSymbolIcon, CalendarIcon, MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { defaultUserURL, imageURL } from "../../../core/Constants";
import { format, parseISO } from "date-fns";
import { IContact } from "../../../core/Interfaces";
import FLoadingComponent from "../../../layout/FLoadingComponent/FLoadingComponent";

const ContactView = () => {
  const [contact, setContact] = useState<IContact>();
  const [loadingData, setLoadingData] = useState<Boolean>(true);

  const { id } = useParams();

  const fetchContact = async (id: string | undefined) => {
    if (!id) return;
    try {
      let response = await fetch(`http://localhost:3000/api/v1/contact/${id}`);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      setContact(data);
    } catch (err: any) {
      Swal.fire({ title: "Error", text: err, icon: "error" });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchContact(id);
  }, []);

  return (
    <>
      <CardHeader className="bg-gray-900 p-5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <span className="text-white uppercase font-bold">Vizualize um contato</span>
      </CardHeader>

      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography color="gray" className="mt-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
          Vizualize um contato em sua agenda.
        </Typography>
        {loadingData && <FLoadingComponent />}
        {contact && !loadingData && (
          <div>
            <div className="grid grid-cols-5 gap-4 mt-5">
              <div id="userIcon" className="col-span-1">
                <label className="labelFileInput">
                  <img style={{ borderRadius: "50%" }} src={contact?.contactImage ? `${imageURL}${contact.contactImage}` : defaultUserURL} alt="contact_image" />
                </label>
              </div>
              <div className="col-span-4">
                <div className="mt-10">
                  <Input variant="static" label="Nome" icon={<UserIcon />} value={contact?.name ?? ""} readOnly onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
                </div>
                <div className="mt-7">
                  <Input
                    variant="static"
                    label="Sobrenome"
                    icon={<UserIcon />}
                    value={contact?.lastName ?? ""}
                    readOnly
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    crossOrigin=""
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="mt-7 col-span-1">
                <InputMask mask="99/99/9999" placeholder="__ / __ / ____" value={contact?.birthday ? format(parseISO(contact.birthday), "dd/MM/yyy") : ""} readOnly>
                  <Input variant="static" label="Aniversário" icon={<CalendarIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
                </InputMask>
              </div>
              <div className="mt-7 col-span-1">
                <InputMask mask="(99) 99999-9999" placeholder="(__) _____-____" value={contact?.phone ?? ""} readOnly>
                  <Input variant="static" label="Telefone" icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
                </InputMask>
              </div>
              <div className="mt-7 col-span-1">
                <InputMask mask="(99) 99999-9999" placeholder="(__) _____-____" value={contact?.whatsapp ?? ""} readOnly>
                  <Input variant="static" label="Whatsapp" icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
                </InputMask>
              </div>
            </div>
            <div className=" grid grid-cols-3 gap-4">
              <div className="mt-7 col-span-1">
                <InputMask mask="99999-999" placeholder="_____-___" value={contact?.zipCode ?? ""} readOnly>
                  <Input variant="static" label="CEP" placeholder="Digite o cep..." icon={<MapPinIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
                </InputMask>
              </div>
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Logadouro"
                  icon={<MapPinIcon />}
                  value={contact?.publicPlace ?? ""}
                  readOnly
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Bairro"
                  icon={<MapPinIcon />}
                  className="disabled"
                  value={contact?.neighborhood ?? ""}
                  readOnly
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
            </div>
            <div className=" grid grid-cols-3 gap-4">
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Cidade"
                  icon={<MapPinIcon />}
                  className="disabled"
                  value={contact?.city ?? ""}
                  readOnly
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Estado"
                  icon={<MapPinIcon />}
                  value={contact?.state ?? ""}
                  readOnly
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Número"
                  placeholder="Digite o número"
                  value={contact?.number ?? ""}
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                  readOnly
                  icon={<MapPinIcon />}
                />
              </div>
            </div>
            <div className=" grid grid-cols-3 gap-4">
              <div className="mt-7 col-span-1">
                <Input
                  variant="static"
                  label="Complemento"
                  icon={<MapPinIcon />}
                  value={contact?.complement ?? ""}
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                  readOnly
                />
              </div>
              <div className="mt-7 col-span-2">
                <Input
                  type="email"
                  variant="static"
                  label="E-mail"
                  icon={<AtSymbolIcon />}
                  value={contact?.email ?? ""}
                  readOnly
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </>
  );
};

export default ContactView;
