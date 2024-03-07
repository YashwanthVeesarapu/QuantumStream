import "./styles.scss";
const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: any;
}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
