import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CardBody, CardHeader, Input, Popover, PopoverContent, PopoverHandler, Typography } from "@material-tailwind/react";
import ImageCropper from "../../../components/ImageCropper/ImageCropper";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { ptBR } from "react-day-picker/locale";
import { ptBR as brazilian } from "date-fns/locale";
import { AtSymbolIcon, CalendarIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import InputMask from "react-input-mask";
import FLoadingSpinnerInput from "../../../layout/FLoadingSpinnerInput";
import { toast, Zoom } from "react-toastify";
import Swal from "sweetalert2";
import { imageURL } from "../../../core/Constants";

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthday: undefined as Date | undefined,
    phone: "",
    whatsapp: "",
    zipCode: "",
    publicPlace: "",
    neighborhood: "",
    city: "",
    state: "",
    number: "",
    complement: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loadingZipCode, setLoadingZipCode] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
  const [readOnlyInputs, setReadOnlyInputs] = useState<boolean>(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!["complement", "phone", "whatsapp", "deletedAt", "updatedAt", "userId"].includes(key) && !value) {
        newErrors[key] = true; // Marcar erro se não estiver preenchido e não for opcional
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchContactById = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/contact/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar contato.");
      const data = await response.json();
      setFormData({
        ...data,
        birthday: data.birthday ? parseISO(data.birthday) : undefined,
      });
      if (data.contactImage) {
        setImageFile(data.contactImage);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erro", text: "Não foi possível carregar os dados." });
    }
  };

  const handleUpdateContact = async () => {
    setLoadingButton(true);

    // Se houver erros, não envie o formulário
    if (!validateForm()) {
      setLoadingButton(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "birthday" && value) {
        formDataToSend.append(key, format(value as Date, "yyyy-MM-dd"));
      } else if (value) {
        formDataToSend.append(key, value.toString());
      }
    });

    // Remove qualquer entrada anterior antes de adicionar a nova imagem
    if (formDataToSend.has("contactImage")) {
      formDataToSend.delete("contactImage");
    }

    if (imageFile) {
      formDataToSend.append("contactImage", imageFile);
    }

    try {
      console.log(formData);
      const response = await fetch(`http://localhost:3000/api/v1/contact/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (response.ok) {
        toast.success("Contato atualizado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Zoom,
        });
        navigate("/contact");
      } else {
        const errorData = await response.json();
        Swal.fire({ icon: "error", title: "Erro", text: errorData.error.message || "Ocorreu um erro." });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Erro", text: "Não foi possível atualizar os dados." });
    } finally {
      setLoadingButton(false);
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

        setFormData(prev => ({
          ...prev,
          publicPlace: adressJson.logradouro,
          neighborhood: adressJson.bairro,
          city: adressJson.localidade,
          state: adressJson.estado,
        }));

        setDisabledInputs(false);
        setReadOnlyInputs(true);
      } catch (err) {
        setFormData(prev => ({
          ...prev,
          publicPlace: "",
          neighborhood: "",
          city: "",
          state: "",
        }));

        setDisabledInputs(false);
        setReadOnlyInputs(false);
      } finally {
        setLoadingZipCode(false);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        publicPlace: "",
        neighborhood: "",
        city: "",
        state: "",
      }));

      setDisabledInputs(true);
      setReadOnlyInputs(true);
    }
  };

  // é chamado toda vez que o zipcode muda
  useEffect(() => {
    getFullAdress(formData.zipCode);
  }, [formData.zipCode]);

  useEffect(() => {
    fetchContactById();
  }, [id]);

  return (
    <>
      <CardHeader className="bg-gray-900 p-5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <span className="text-white uppercase font-bold">Editar Contato</span>
      </CardHeader>
      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Edite os dados do contato.
        </Typography>
        <form id="contactForm">
          <div className="grid grid-cols-5 gap-4 mt-5">
            <div id="userIcon" className="col-span-1">
              <ImageCropper onImageCropped={file => setImageFile(file)} imageUrl={imageFile ? `${imageURL}${imageFile}` : null} />
            </div>
            <div className="col-span-4">
              <div className="mt-10">
                <Input
                  variant="static"
                  label="Nome"
                  placeholder="Digite o nome..."
                  icon={<UserIcon />}
                  value={formData.name}
                  onChange={e => handleInputChange("name", e.target.value)}
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
                  value={formData.lastName}
                  onChange={e => handleInputChange("lastName", e.target.value)}
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
                    value={formData.birthday ? format(formData.birthday, "P", { locale: brazilian }) : ""}
                    onChange={e => handleInputChange("birthday", e.target.value)}
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
                    selected={formData.birthday}
                    onSelect={date => handleInputChange("birthday", date)}
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
              <InputMask
                mask="(99) 99999-9999"
                placeholder="(__) _____-____"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
              >
                <Input
                  type="tel"
                  variant="static"
                  label="Telefone"
                  placeholder="Digite o telefone..."
                  icon={<PhoneIcon />}
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </InputMask>
            </div>
            <div className="mt-7 col-span-1">
              <InputMask
                mask="(99) 99999-9999"
                placeholder="(__) _____-____"
                value={formData.whatsapp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("whatsapp", e.target.value)}
              >
                <Input
                  type="tel"
                  placeholder="Digite o Whatsapp..."
                  variant="static"
                  label="Whatsapp"
                  icon={<PhoneIcon />}
                  onPointerEnterCapture=""
                  onPointerLeaveCapture=""
                  crossOrigin=""
                />
              </InputMask>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4">
            <div className="mt-7 col-span-1">
              <InputMask
                mask="99999-999"
                placeholder="_____-___"
                value={formData.zipCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("zipCode", e.target.value)}
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
                value={formData.publicPlace}
                onChange={e => handleInputChange("publicPlace", e.target.value)}
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
                value={formData.neighborhood}
                onChange={e => handleInputChange("neighborhood", e.target.value)}
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
                value={formData.city}
                onChange={e => handleInputChange("city", e.target.value)}
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
                value={formData.state}
                onChange={e => handleInputChange("state", e.target.value)}
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
                value={formData.number}
                onChange={e => handleInputChange("number", e.target.value)}
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
                value={formData.complement}
                onChange={e => handleInputChange("complement", e.target.value)}
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
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
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
                onClick={handleUpdateContact}
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

export default ContactEdit;
