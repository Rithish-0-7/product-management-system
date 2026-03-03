import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import ProductTable from '../components/ProductTable';
import { useDebounce } from '../hooks/useDebounce';
import { deleteProduct, getProducts } from '../services/productService';
import type { Product } from '../types/product';

type SortBy = 'name' | 'price' | 'stock' | 'created_at';

const DEFAULT_LIMIT = 10;

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const query = useMemo(
    () => ({
      page,
      limit: DEFAULT_LIMIT,
      search: debouncedSearch,
      sortBy,
      order,
    }),
    [page, debouncedSearch, sortBy, order],
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getProducts(query);
      setProducts(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch {
      setError('Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, order]);

  const handleSort = (field: SortBy) => {
    if (field === sortBy) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortBy(field);
    setOrder('asc');
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    const previousProducts = products;
    setProducts((current) => current.filter((item) => item.id !== id));

    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch {
      setProducts(previousProducts);
      setError('Delete failed. Changes rolled back.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <section className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-gray-900">Product Management</h1>
          <Link
            to="/products/new"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-200 ease-in-out hover:scale-[1.02]"
          >
            Add Product
          </Link>
        </header>

        <div className="mb-5">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-md outline-none ring-primary/30 transition focus:ring"
          />
        </div>

        {error ? <ErrorAlert message={error} onRetry={fetchProducts} /> : null}

        <div className="mt-4">
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-card shadow-soft">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-card p-12 text-center text-gray-500 shadow-soft">
              No products found
            </div>
          ) : (
            <ProductTable
              products={products}
              sortBy={sortBy}
              order={order}
              onSort={handleSort}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </section>
    </main>
  );
}

export default ProductListPage;
