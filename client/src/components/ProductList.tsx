import { IProduct, ProductListProps } from './../types';
import ProductItem from './ProductItem';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from './../services/services';

const ProductList = ({ setProductToEdit }: ProductListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const handleEditProduct = (product: IProduct) => {
    setProductToEdit(product);
  };

  if (error) return <h2 className='warning'>An error occurred: {(error as Error).message}</h2>;
  if (isLoading) return <h2 className='info'>Loading...</h2>;

  return <>{data && data.map((product: IProduct) => <ProductItem key={product._id} product={product} onEdit={handleEditProduct} />)}</>;
};

export default ProductList;
