interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-12 text-slate-600"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
