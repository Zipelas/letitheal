type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p
      className={`text-sm sm:text-base text-left text-color my-4 px-4 w-full max-w-2xl mx-auto ${className ?? ''}`}>
      {children}
    </p>
  );
}
