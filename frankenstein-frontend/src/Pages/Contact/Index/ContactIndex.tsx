import { ChevronUpDownIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { defaultUserURL, imageURL } from "../../../core/Constants";
import { format, parseISO } from "date-fns";
import { formatPhoneNumber } from "../../../core/Formatters";
import FLoadingComponent from "../../../layout/FLoadingComponent/FLoadingComponent";
import Swal from "sweetalert2";
import "./ContactIndex.css";
import { toast, Zoom } from "react-toastify";
import { IContact, IMetaPagination } from "../../../core/Interfaces";
import FPaginationButtons from "../../../layout/FPaginationButtons";

const ContactIndex = () => {
  const [allContact, setAllContact] = useState<Array<IContact>>([]);
  const [paginateValue, setPaginateValue] = useState<IMetaPagination>();
  const [loadingData, setLoadingData] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string | null>("");

  const navigate = useNavigate();

  const fetchContacts = async (page: number = 1, search: string | null = null) => {
    try {
      let response = await fetch(`http://localhost:3000/api/v1/contact?limit=5${page ? `&page=${page}` : ""}${search ? `&search=${search}` : ""}`);

      if (search) {
        setPage(1);
      }

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      setAllContact(data.items); // Atualiza a lista de contatos
      setPaginateValue(data.meta); // Atualiza o valor dos paginate
    } catch (err: any) {
      Swal.fire({ title: "Error", text: err, icon: "error" });
    } finally {
      setLoadingData(false);
    }
  };

  // Debounce para evitar chamadas frequentes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search); // Atualiza o valor "debounced" após o atraso
    }, 700); // Aguarda 500ms antes de executar

    return () => clearTimeout(timeoutId); // Limpa o timeout anterior ao mudar o "search"
  }, [search]);

  // Fetch contacts com debounce
  useEffect(() => {
    fetchContacts(page, debouncedSearch); // Usa o valor debounced
  }, [page, debouncedSearch]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        // TODO: lógica do delete aqui dentro
        setAllContact(prev => prev.filter(contact => contact.id !== id));
        toast.success("Contato excluido com sucesso!", {
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
      }
    });
  };

  return (
    <>
      <CardHeader className="bg-gray-900 p-5 flex items-center justify-between" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <span className="text-white uppercase font-bold">Contatos</span>
        <Link to="/contact/create">
          <Button className="flex gap-2 items-center text-black bg-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <UserPlusIcon className="h-5 w-5" />
            Adicionar acontato
          </Button>
        </Link>
      </CardHeader>
      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Card className="h-full w-full mb-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-2">
              <div className="w-full md:w-72">
                <Input
                  variant="static"
                  label="Pesquisar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {loadingData && <FLoadingComponent />}
            {!loadingData && (
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Contato <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      </Typography>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 w-48">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Data de aniversário <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      </Typography>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 w-48">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Telefone <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      </Typography>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 w-48">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-center gap-2 font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Whatsapp <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      </Typography>
                    </th>
                    <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 w-48">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-center font-normal leading-none opacity-70 "
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Opções
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allContact.length > 0 ? (
                    allContact.map(({ id, contactImage, name, lastName, email, birthday, phone, whatsapp }, index) => {
                      const isLast = index === allContact.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={contactImage ? `${imageURL}${contactImage}` : defaultUserURL}
                                alt={name}
                                size="sm"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                  placeholder={undefined}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  {`${name} ${lastName}`}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                  placeholder={undefined}
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                >
                                  {email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={`${classes} text-center`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {birthday ? format(parseISO(birthday), "dd/MM/yyy") : ""}
                            </Typography>
                          </td>
                          <td className={`${classes} text-center`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {phone ? formatPhoneNumber(phone) : " - "}
                            </Typography>
                          </td>
                          <td className={`${classes} text-center`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            >
                              {whatsapp ? formatPhoneNumber(whatsapp) : " - "}
                            </Typography>
                          </td>
                          <td className={`${classes} text-center`}>
                            <Tooltip content="Vizualizar Contato">
                              <IconButton
                                variant="text"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                onClick={() => navigate(`/contact/view/${id}`)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Editar Contato">
                              <IconButton
                                variant="text"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                onClick={() => navigate(`/contact/edit/${id}`)}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Excluir Contato">
                              <IconButton
                                variant="text"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                onClick={() => handleDelete(id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <th id="noContactTh">
                          <div>Nenhum contato cadastrado...</div>
                        </th>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </CardBody>
          <CardFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex justify-end">
              <FPaginationButtons totalPage={paginateValue?.totalPages || 1} onPageChange={page => setPage(page)} />
            </div>
          </CardFooter>
        </Card>
      </CardBody>
    </>
  );
};

export default ContactIndex;
