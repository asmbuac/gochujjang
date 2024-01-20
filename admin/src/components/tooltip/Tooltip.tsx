import "./tooltip.scss";

type Props = {
  content: string;
};

const Tooltip: React.FC<Props> = ({ content }) => {
  return <div className="tooltip">{content}</div>;
};

export default Tooltip;
