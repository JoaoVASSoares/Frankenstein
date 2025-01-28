export interface IContact {
  id: number;
  birthday: string;
  city: string;
  complement: string;
  contactImage: string;
  email: string;
  lastName: string;
  name: string;
  neighborhood: string;
  number: string;
  phone: string;
  public_place: string;
  state: string;
  user_id: null;
  whatsapp: string;
  zip_code: string;
}

export interface IMetaPagination {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IContactPagination {
  items: IContact[];
  meta: IMetaPagination;
}
