import "./MuteOrUnMute.css";

export const MuteOrUnMute = (props) => {
  return (
    <button
      className={props.mute ? "mute" : "unmute"}
      onClick={props.onClick}
    ></button>
  );
};
