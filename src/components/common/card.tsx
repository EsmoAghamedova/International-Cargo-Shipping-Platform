export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 p-6 rounded-xl shadow ${className}`}>
      {children}
    </div>
  );
}
