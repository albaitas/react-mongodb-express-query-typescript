import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../services/services';
import { ProductItemProps } from './../types';

const ProductItem = ({ product, onEdit }: ProductItemProps) => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      console.error('Error deleting product:', error);
    }
  });

  const handleDelete = () => {
    deleteProductMutation.mutate(product._id);
  };

  return (
    <div className='product'>
      <img src={product.img} alt={product.title} className='product_img' />
      <div className='product_content'>
        <div className='product_title'>{product.title}</div>
        <p className='product_price'>{product.price} Eur</p>
        <div className='product_buttons'>
          <button className='product_button_edit' onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className='product_button_delete' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
