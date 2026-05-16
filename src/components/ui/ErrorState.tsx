interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-md border border-red-200 bg-red-50 px-4 py-6 text-center text-red-800"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
