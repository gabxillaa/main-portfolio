interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p
      className="font-(family-name:--font-super-warming) text-[10px] font-bold tracking-[0.22em] uppercase mb-1.5"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </p>
  );
}