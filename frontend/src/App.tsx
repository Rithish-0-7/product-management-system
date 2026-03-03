import { Navigate, Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/products/new" element={<AddProductPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
