export interface IProduct {
  _id?: string;
  title: string;
  price: string;
  img: string;
}

export interface ProductsResponse {
  products: IProduct[];
}

export interface ProductListProps {
  setProductToEdit: (product: IProduct | null) => void;
}

export interface NewProductProps {
  productToEdit: IProduct | null;
  setProductToEdit: (product: IProduct | null) => void;
}

export interface ProductItemProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
}
