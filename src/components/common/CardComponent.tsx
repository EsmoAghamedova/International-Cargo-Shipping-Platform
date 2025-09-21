export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-b from-white to-gray-50 border border-gray-200 p-8 rounded-2xl shadow-lg w-full ${className}`}
      style={{
        transition: 'box-shadow 0.2s',
      }}
    >
      {children}
    </div>
  );
}
