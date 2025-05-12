import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

const Section = ({
  children,
  className,
  fullWidth = false,
  id,
}: SectionProps) => {
  return (
    <section
      className={clsx(
        className,
        fullWidth ? "w-full" : "container mx-auto max-w-7xl",
      )}
      id={id}
    >
      {children}
    </section>
  );
};

export default Section;
