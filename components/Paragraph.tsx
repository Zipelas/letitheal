type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p
      className={`text-sm sm:text-base text-left text-color m-4 px-4 w-[90vw] sm:w-[50vw] mx-auto ${className ?? ''}`}>
      {children}
    </p>
  );
}
