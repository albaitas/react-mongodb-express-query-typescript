import { useState } from 'react';
import './App.css';
import NewProduct from './components/NewProduct';
import ProductList from './components/ProductList';
import { IProduct } from './types';

function App() {
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  return (
    <div className='container'>
      <NewProduct productToEdit={productToEdit} setProductToEdit={setProductToEdit} />
      <div className='product_container'>
        <ProductList setProductToEdit={setProductToEdit} />
      </div>
    </div>
  );
}

export default App;
