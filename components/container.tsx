interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <main className="flex-grow">{children}</main>;
};

export default Container;
