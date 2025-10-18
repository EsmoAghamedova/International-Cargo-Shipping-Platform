interface BadgeProps {
  status: string;
}

export function Badge({ status }: BadgeProps) {
  const color =
    status === 'PENDING_REVIEW'
      ? 'bg-yellow-200 text-yellow-800'
      : status === 'ACCEPTED'
        ? 'bg-green-200 text-green-800'
        : status === 'IN_TRANSIT'
          ? 'bg-blue-200 text-blue-800'
          : status === 'DELIVERED'
            ? 'bg-purple-200 text-purple-800'
            : 'bg-gray-200 text-gray-800';

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}
