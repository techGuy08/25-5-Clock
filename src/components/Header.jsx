import TimeSetter from "./TimeSetter";
const Header = ({
  breakLength,
  onChangeBreakLength,
  sessionLength,
  onChangeSessionLength,
}) => {
  return (
    <header>
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <div className="row justify-content-center align-items-end">
          <TimeSetter
            title={"Break Length"}
            onPlus={() => onChangeBreakLength(breakLength + 1)}
            onMinus={() => onChangeBreakLength(breakLength - 1)}
            value={breakLength}
            name={"break"}
          />
          <TimeSetter
            title={"Session Length"}
            onPlus={() => onChangeSessionLength(sessionLength + 1)}
            onMinus={() => onChangeSessionLength(sessionLength - 1)}
            value={sessionLength}
            name={"session"}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
