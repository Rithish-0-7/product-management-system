import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { formatCurrency, formatDate } from '../utils/format';

type SortBy = 'name' | 'price' | 'stock' | 'created_at';

type Props = {
  products: Product[];
  sortBy: SortBy;
  order: 'asc' | 'desc';
  onSort: (sortBy: SortBy) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
};

function SortButton({
  field,
  label,
  sortBy,
  order,
  onSort,
}: {
  field: SortBy;
  label: string;
  sortBy: SortBy;
  order: 'asc' | 'desc';
  onSort: (field: SortBy) => void;
}) {
  const active = sortBy === field;
  return (
    <button className="flex items-center gap-1" onClick={() => onSort(field)}>
      <span>{label}</span>
      <span className={`text-xs ${active ? 'text-primary' : 'text-gray-400'}`}>
        {active ? (order === 'asc' ? '▲' : '▼') : '↕'}
      </span>
    </button>
  );
}

function ProductTable({ products, sortBy, order, onSort, onDelete, deletingId }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-card shadow-soft">
      <div className="max-h-[560px] overflow-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="sticky top-0 z-10 bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-6 py-4"><SortButton field="name" label="Name" sortBy={sortBy} order={order} onSort={onSort} /></th>
              <th className="px-6 py-4"><SortButton field="price" label="Price" sortBy={sortBy} order={order} onSort={onSort} /></th>
              <th className="px-6 py-4"><SortButton field="stock" label="Stock" sortBy={sortBy} order={order} onSort={onSort} /></th>
              <th className="px-6 py-4"><SortButton field="created_at" label="Created At" sortBy={sortBy} order={order} onSort={onSort} /></th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-100 transition duration-200 ease-in-out hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{formatDate(product.created_at)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition duration-200 ease-in-out hover:scale-[1.02]"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="rounded-xl bg-danger px-3 py-2 text-xs font-semibold text-white shadow-sm transition duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-50"
                    >
                      {deletingId === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
