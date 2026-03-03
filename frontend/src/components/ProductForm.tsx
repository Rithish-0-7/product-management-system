import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Product, ProductInput } from '../types/product';
import ErrorAlert from './ErrorAlert';

type Props = {
  initialValues?: Product;
  onSubmit: (payload: ProductInput) => Promise<void>;
  submitText: string;
  loadingText: string;
};

function ProductForm({ initialValues, onSubmit, submitText, loadingText }: Props) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [price, setPrice] = useState(initialValues?.price.toString() ?? '');
  const [stock, setStock] = useState(initialValues?.stock.toString() ?? '0');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!price || Number(price) <= 0) return 'Price must be a positive number';
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) return 'Stock must be an integer >= 0';
    return '';
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
      });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Failed to save product';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-card p-8 shadow-soft">
      {error ? <ErrorAlert message={error} /> : null}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">Name</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring"
          placeholder="Enter product name"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">Price</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring"
          placeholder="0.00"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">Stock</label>
        <input
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring"
          placeholder="0"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-60"
      >
        {submitting ? loadingText : submitText}
      </button>
    </form>
  );
}

export default ProductForm;
