type Props = {
  page: number;
  totalPages: number;
  onChange: (nextPage: number) => void;
};

function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
            pageNumber === page
              ? 'bg-primary text-white shadow-md'
              : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
