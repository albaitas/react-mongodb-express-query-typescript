import { IProduct } from '../types';

export const getProducts = async () => {
  const response = await fetch('/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const deleteProduct = async (productId: string | undefined) => {
  const response = await fetch(`/products/${productId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return productId;
};

export const addProduct = async (newProduct: IProduct) => {
  const response = await fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const updateProduct = async (updatedProduct: IProduct) => {
  const response = await fetch(`/products/${updatedProduct._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
