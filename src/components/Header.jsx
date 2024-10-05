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
        <div className="row justify-content-center">
          <div className="col-sm-4 mx-0">
            <h3 id="break-label">Break Length</h3>
            <div className="control-group d-flex justify-content-center align-items-center">
              <button
                className="btn btn-success"
                id="break-increment"
                onClick={() => onChangeBreakLength(breakLength + 1)}
              >
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <div className="control-label" id="break-length">
                {breakLength}
              </div>
              <button
                className="btn btn-success"
                id="break-decrement"
                onClick={() => onChangeBreakLength(breakLength - 1)}
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </div>
          <div className="col-sm-4 mx-0">
            <h3 id="session-label">Session Length</h3>
            <div className="control-group d-flex justify-content-center align-items-center">
              <button
                className="btn btn-success"
                id="session-increment"
                onClick={() => onChangeSessionLength(sessionLength + 1)}
              >
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <div className="control-label" id="session-length">
                {sessionLength}
              </div>
              <button
                className="btn btn-success"
                id="session-decrement"
                onClick={() => onChangeSessionLength(sessionLength - 1)}
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
