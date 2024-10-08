const TimeSetter = ({ title, onPlus, onMinus, value, name }) => {
  return (
    <div className="col-sm-4 mx-0">
      <h3 id={name + "-label"}>{title}</h3>
      <div className="control-group d-flex justify-content-center align-items-center">
        <button
          className="btn btn-success"
          id={name + "-increment"}
          onClick={onPlus}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </button>
        <div className="control-label" id={name + "-length"}>
          {value}
        </div>
        <button
          className="btn btn-success"
          id={name + "-decrement"}
          onClick={onMinus}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
};
export default TimeSetter;
