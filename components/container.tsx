interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <main className="flex-1">{children}</main>;
};

export default Container;
