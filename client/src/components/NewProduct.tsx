import React, { useState, useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, updateProduct } from '../services/services';
import { IProduct, NewProductProps } from './../types';

const NewProduct = ({ productToEdit, setProductToEdit }: NewProductProps) => {
  const initialFormState: IProduct = useMemo(
    () => ({
      title: '',
      price: '',
      img: '/images/product-10.png'
    }),
    []
  );
  const [product, setProduct] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct(initialFormState);
    }
  }, [productToEdit, initialFormState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product.title || !product.price || /^\s*$/.test(product.title) || /^\s*$/.test(product.price)) return;

    if (productToEdit) {
      updateProductMutation.mutate(product);
    } else {
      addProductMutation.mutate(product);
    }

    setProduct(initialFormState);
    setProductToEdit(null);
  };

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      setMessage('Product added successfully!');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (error: any) => {
      console.error('Error adding product:', error);
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      setMessage('Product updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
    }
  });

  const handleCancel = () => {
    setProduct(initialFormState);
    setProductToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} className='new_product'>
      {message && <p className='info'>{message}</p>}
      <input type='text' placeholder='Add a title' name='title' value={product.title} onChange={handleChange} className='product_input' required />
      <input type='text' placeholder='Add a price' name='price' value={product.price} onChange={handleChange} className='product_input' required />
      <button className='product-button'>{productToEdit ? 'Update Product' : 'Add new Product'}</button>
      <button type='button' className='product-button' onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewProduct;
