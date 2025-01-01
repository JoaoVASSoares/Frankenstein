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
import { toast, Zoom } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  // Definição dos states utilizados em minha aplicação
  const [name, setName] = useState<string>("");
  const [lastName, setLatName] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>();
  const [phone, setPhone] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [publicPlace, setPublicPlace] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loadingZipCode, setLoadingZipCode] = useState<boolean>(false);
  const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
  const [readOnlyInputs, setReadOnlyInputs] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // Use navigate para termos navegações
  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    setLoadingButton(true);

    // Criação do objetos de erros.
    const newErrors: { [key: string]: boolean } = {};

    // Validar campos obrigatórios
    if (!name.trim()) newErrors.name = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!birthday) newErrors.birthday = true;
    if (!zipCode) newErrors.zipCode = true;
    if (!publicPlace) newErrors.publicPlace = true;
    if (!neighborhood) newErrors.neighborhood = true;
    if (!city) newErrors.city = true;
    if (!state) newErrors.state = true;
    if (!number) newErrors.number = true;
    if (!email) newErrors.email = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se o email esta no formato correto.
    if (!emailRegex.test(email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);

    // Se houver erros, não envie o formulário
    if (Object.keys(newErrors).length > 0) {
      setLoadingButton(false);
      return;
    }

    // Por ser ter imagem e o formato der "multipart/form-data" utilizando o form data para construir o body da request
    const newContactFormData = new FormData();
    newContactFormData.append("name", name);
    newContactFormData.append("lastName", lastName);
    newContactFormData.append("birthday", birthday ? format(birthday, "yyyy-MM-dd") : "");
    if (imageFile) {
      newContactFormData.append("contactImage", imageFile);
    }
    newContactFormData.append("email", email);
    newContactFormData.append("phone", phone ? phone.replace(/\D/g, "") : "");
    newContactFormData.append("whatsapp", whatsapp ? whatsapp.replace(/\D/g, "") : "");
    newContactFormData.append("zipCode", zipCode ? zipCode.replace(/\D/g, "") : "");
    newContactFormData.append("publicPlace", publicPlace);
    newContactFormData.append("neighborhood", neighborhood);
    newContactFormData.append("city", city);
    newContactFormData.append("state", state);
    newContactFormData.append("number", number);
    newContactFormData.append("complement", complement);

    try {
      const response = await fetch("http://localhost:3000/api/v1/contact", {
        method: "POST",
        body: newContactFormData, // Corpo da requisição com FormData
      });

      if (response.ok) {
        await response.json();

        // Notificação de sucesso
        toast.success("Contato criado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });

        navigate("/contact");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        Swal.fire({
          icon: "error",
          title: "Erro ao criar contato",
          text: errorData.error.message || "Ocorreu um erro inesperado.",
        });

        setLoadingButton(false);
      }
    } catch (error) {
      setLoadingButton(false);

      Swal.fire({
        icon: "error",
        title: "Erro na requisição",
        text: "Não foi possível enviar os dados. Verifique sua conexão e tente novamente. " + error,
      });
    }
  };

  const getFullAdress = async (zipCode: string) => {
    const zipCodeFormatted = zipCode ? zipCode.replace(/\D/g, "") : null;

    if (zipCodeFormatted && zipCodeFormatted.length == 8) {
      try {
        setLoadingZipCode(true);
        const response = await fetch(`https://viacep.com.br/ws/${zipCodeFormatted}/json/`);

        const adressJson = await response.json();

        if (adressJson.erro) {
          throw new Error("CEP não encontrado");
        }

        setPublicPlace(adressJson.logradouro);
        setNeighborhood(adressJson.bairro);
        setCity(adressJson.localidade);
        setState(adressJson.estado);
        setDisabledInputs(false);
        setReadOnlyInputs(true);
      } catch (err: any) {
        setDisabledInputs(false);
        setReadOnlyInputs(false);
        setPublicPlace("");
        setNeighborhood("");
        setCity("");
        setState("");
      } finally {
        setLoadingZipCode(false);
      }
    } else {
      setDisabledInputs(true);
      setReadOnlyInputs(true);
      setPublicPlace("");
      setNeighborhood("");
      setCity("");
      setState("");
    }
  };

  // é chamado toda vez que o zipcode muda
  useEffect(() => {
    getFullAdress(zipCode);
  }, [zipCode]);

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
                    readOnly
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
                      outside: "text-gray-500",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-7 col-span-1">
              <InputMask mask="(99) 99999-9999" placeholder="(__) _____-____" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}>
                <Input variant="static" label="Telefone" placeholder="Digite o telefone..." icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </InputMask>
            </div>
            <div className="mt-7 col-span-1">
              <InputMask mask="(99) 99999-9999" placeholder="(__) _____-____" value={whatsapp} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}>
                <Input placeholder="Digite o Whatsapp..." variant="static" label="Whatsapp" icon={<PhoneIcon />} onPointerEnterCapture="" onPointerLeaveCapture="" crossOrigin="" />
              </InputMask>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4">
            <div className="mt-7 col-span-1">
              <InputMask
                mask="99999-999"
                placeholder="_____-___"
                value={zipCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipCode(e.target.value)}
                disabled={loadingZipCode}
              >
                <Input
                  variant="static"
                  label="CEP"
                  placeholder="Digite o cep..."
                  icon={loadingZipCode ? <FLoadingSpinnerInput /> : <MapPinIcon />}
                  error={errors.zipCode ?? false}
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
                value={publicPlace}
                onChange={e => setPublicPlace(e.target.value)}
                className="disabled"
                error={errors.publicPlace ?? false}
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
                required
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
                required
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
                type="email"
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
                loading={loadingButton}
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
