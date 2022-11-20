import "./Heart.css";

export const Heart = (props) => (
  <div className="center">
    <div className="text">{props.text}</div>
    <div className="heart"></div>
  </div>
);
