import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductForm from '../components/ProductForm';
import { getProductById, updateProduct } from '../services/productService';
import type { Product } from '../types/product';

function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      if (!Number.isInteger(productId) || productId <= 0) {
        setError('Invalid product id');
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch {
        setError('Unable to load product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const handleSubmit = async (payload: { name: string; price: number; stock: number }) => {
    await updateProduct(productId, payload);
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <section className="mx-auto w-full max-w-xl">
        <h1 className="mb-6 text-center text-3xl font-semibold text-gray-900">Edit Product</h1>
        {loading ? (
          <div className="rounded-2xl bg-card p-8 shadow-soft">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorAlert message={error} />
        ) : product ? (
          <ProductForm
            initialValues={product}
            onSubmit={handleSubmit}
            submitText="Update Product"
            loadingText="Updating..."
          />
        ) : null}
      </section>
    </main>
  );
}

export default EditProductPage;
