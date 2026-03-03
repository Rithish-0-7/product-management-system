import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { createProduct } from '../services/productService';

function AddProductPage() {
  const navigate = useNavigate();

  const handleSubmit = async (payload: { name: string; price: number; stock: number }) => {
    await createProduct(payload);
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <section className="mx-auto w-full max-w-xl">
        <h1 className="mb-6 text-center text-3xl font-semibold text-gray-900">Add Product</h1>
        <ProductForm onSubmit={handleSubmit} submitText="Create Product" loadingText="Creating..." />
      </section>
    </main>
  );
}

export default AddProductPage;
