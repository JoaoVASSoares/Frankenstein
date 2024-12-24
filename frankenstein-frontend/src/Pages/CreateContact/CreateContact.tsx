import "./createContact.css";
import { Button, CardBody, CardHeader, Input, Popover, PopoverContent, PopoverHandler, Typography } from "@material-tailwind/react";
import ImageCropper from "../../components/ImageCropper/ImageCropper";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "react-day-picker/locale";
import { ptBR as brazilian } from "date-fns/locale";
import { AtSymbolIcon, CalendarIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import FLoadingSpinnerInput from "../../layout/FLoadingSpinnerInput";

const CreateContact = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLatName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>();
  const [phone, setPhone] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
  const [readOnlyInputs, setReadOnlyInputs] = useState<boolean>(false);

  const handleSubmitForm = () => {
    const newErrors: { [key: string]: boolean } = {};

    // Validar campos obrigatórios
    if (!name.trim()) newErrors.name = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!birthday) newErrors.birthday = true;
    if (!cep) newErrors.cep = true;
    if (!logradouro) newErrors.logradouro = true;
    if (!neighborhood) newErrors.neighborhood = true;
    if (!city) newErrors.city = true;
    if (!state) newErrors.state = true;
    if (!number) newErrors.number = true;
    if (!email) newErrors.email = true;

    setErrors(newErrors);

    // Se houver erros, não envie o formulário
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newContact = {
      name: name,
      lastName: lastName,
      birthday: birthday ? format(birthday, "P") : "",
      phone: phone ? phone.replace(/\D/g, "") : "",
      whatsapp: whatsapp ? whatsapp.replace(/\D/g, "") : "",
      cep: cep ? cep.replace(/\D/g, "") : "",
      logradouro: logradouro,
      neighborhood: neighborhood,
      city: city,
      state: state,
      number: number,
      complement: complement,
      email: email,
      imageContact: imageFile,
    };
    console.log(newContact);
  };

  const getFullAdress = async (cep: string) => {
    const cepFormated = cep ? cep.replace(/\D/g, "") : null;

    if (cepFormated) {
      try {
        setLoadingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cepFormated}/json/`);

        const adressJson = await response.json();

        if (adressJson.erro) {
          throw new Error("CEP não encontrado");
        }

        setLogradouro(adressJson.logradouro);
        setNeighborhood(adressJson.bairro);
        setCity(adressJson.localidade);
        setState(adressJson.estado);
        setDisabledInputs(false);
        setReadOnlyInputs(true);
      } catch (err: any) {
        setDisabledInputs(false);
        setReadOnlyInputs(false);
        setLogradouro("");
        setNeighborhood("");
        setCity("");
        setState("");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep) {
        await getFullAdress(cep); // Aguarda a função assíncrona
      }
    };

    if (cep.length == 9) {
      fetchAddress(); // Chama a função assíncrona
    }
  }, [cep]);

  return (
    <>
      <CardHeader className="bg-gray-900 p-5" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <span className="text-white uppercase font-bold">Adicionar novo contato</span>
      </CardHeader>
      <CardBody placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
        <Typography color="gray" className="mt-1 font-normal" placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
          Adicione um novo contato em sua agenda.
        </Typography>
        <form id="contactForm">
          <div className="grid grid-cols-5 gap-4 mt-5">
            <div id="userIcon" className="col-span-1">
              <ImageCropper onImageCropped={file => setImageFile(file)} />
            </div>
            <div className="col-span-4">
              <div className="mt-10">
                <Input
                  variant="static"
                  label="Nome"
                  placeholder="Digite o nome..."
                  icon={<UserIcon />}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  error={errors.name ?? false}
                  required
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
              <div className="mt-7">
                <Input
                  variant="static"
                  label="Sobrenome"
                  placeholder="Digite o sobrenome..."
                  icon={<UserIcon />}
                  value={lastName}
                  onChange={e => setLatName(e.target.value)}
                  error={errors.lastName ?? false}
                  required
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mt-7 col-span-1">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Input
                    variant="static"
                    label="Data de nascimento"
                    placeholder="Selecione a data de nascimento..."
                    value={birthday ? format(birthday, "P", { locale: brazilian }) : ""}
                    onChange={(e: any) => setBirthday(e.target.value)}
                    icon={<CalendarIcon />}
                    required
                    error={errors.birthday ?? false}
                    onPointerEnterCapture=""
                    onPointerLeaveCapture=""
                    crossOrigin=""
                  />
                </PopoverHandler>
                <PopoverContent placeholder="" onPointerEnterCapture="" onPointerLeaveCapture="">
                  <DayPicker
                    locale={ptBR}
                    mode="single"
                    selected={birthday}
                    onSelect={setBirthday}
                    showOutsideDays
                    className="border-0"
                    hideNavigation
                    captionLayout="dropdown"
                    classNames={{
                      month_caption: "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "hidden",
                      button_previous: "absolute left-3 top-5",
                      button_next: "absolute right-3 top-5",
                      weekdays: "text-black",
                      day: "h-9 w-9 p-0 font-bold text-center text-black",
                      selected: "rounded-lg bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      today: "rounded-md bg-blue-200 text-blue-900",
                      dropdown: "mr-5 text-black bg-transparent",
                      button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-7 col-span-1">
              <InputMask mask="(99) 99999-9999" maskPlaceholder={null} value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}>
                <Input variant="static" label="Telefone" placeholder="Digite o telefone..." icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </InputMask>
            </div>
            <div className="mt-7 col-span-1">
              <InputMask mask="(99) 99999-9999" maskPlaceholder={null} value={whatsapp} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}>
                <Input placeholder="Digite o Whatsapp..." variant="static" label="Whatsapp" icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </InputMask>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4">
            <div className="mt-7 col-span-1">
              <InputMask mask="99999-999" maskPlaceholder={null} value={cep} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value)} disabled={loadingCep}>
                <Input
                  variant="static"
                  label="CEP"
                  placeholder="Digite o cep..."
                  icon={loadingCep ? <FLoadingSpinnerInput /> : <MapPinIcon />}
                  error={errors.cep ?? false}
                  required
                  className="disabled"
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </InputMask>
            </div>
            <div className="mt-7 col-span-1">
              <Input
                variant="static"
                label="Logadouro"
                placeholder="Digite o logadouro"
                icon={<MapPinIcon />}
                value={logradouro}
                onChange={e => setLogradouro(e.target.value)}
                className="disabled"
                error={errors.logradouro ?? false}
                disabled={disabledInputs}
                readOnly={readOnlyInputs}
                required
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
              />
            </div>
            <div className="mt-7 col-span-1">
              <Input
                variant="static"
                label="Bairro"
                placeholder="Digite o bairro"
                icon={<MapPinIcon />}
                className="disabled"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                error={errors.neighborhood ?? false}
                disabled={disabledInputs}
                readOnly={readOnlyInputs}
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
                placeholder="Digite o cidade"
                icon={<MapPinIcon />}
                className="disabled"
                value={city}
                onChange={e => setCity(e.target.value)}
                disabled={disabledInputs}
                readOnly={readOnlyInputs}
                required
                error={errors.city ?? false}
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
              />
            </div>
            <div className="mt-7 col-span-1">
              <Input
                variant="static"
                label="Estado"
                placeholder="Digite o estado"
                icon={<MapPinIcon />}
                className="disabled"
                value={state}
                onChange={e => setState(e.target.value)}
                error={errors.state ?? false}
                disabled={disabledInputs}
                readOnly={readOnlyInputs}
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
                value={number}
                onChange={e => setNumber(e.target.value)}
                error={errors.number ?? false}
                required
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
                icon={<MapPinIcon />}
              />
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4">
            <div className="mt-7 col-span-1">
              <Input
                variant="static"
                label="Complemento"
                placeholder="Digite o complemento"
                icon={<MapPinIcon />}
                value={complement}
                onChange={e => setComplement(e.target.value)}
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
              />
            </div>
            <div className="mt-7 col-span-1">
              <Input
                variant="static"
                label="E-mail"
                placeholder="Digite o e-mail..."
                icon={<AtSymbolIcon />}
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email ?? false}
                required
                onPointerEnterCapture=""
                onPointerLeaveCapture=""
                crossOrigin=""
              />
            </div>
            <div className="mt-7 col-span-1">
              <Button
                type="button"
                style={{ width: "100%" }}
                onClick={handleSubmitForm}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </>
  );
};

export default CreateContact;
