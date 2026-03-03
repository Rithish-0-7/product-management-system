type Props = {
  message: string;
  onRetry?: () => void;
};

function ErrorAlert({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
      <p className="text-sm font-medium">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-3 rounded-xl bg-danger px-3 py-2 text-sm font-semibold text-white transition duration-200 ease-in-out hover:scale-[1.02]"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

export default ErrorAlert;
