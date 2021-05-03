


//--Buttons that helps player to move in different directions--//

function DirectionButtons({
  moveNorth,
  moveSouth,
  moveEast,
  moveWest,
  returnToStart,
  buttonState,
}) {
  return (
    <>

      {/* as these buttons are clicked the marker moves N, S, E, W accordingly */}
      {/* North Button */}
      <button
        className="buttonStyle"
        onClick={moveNorth}
        disabled={!buttonState}
      >
        North
      </button>
      {/* South Button */}
      <button
        className="buttonStyle"
        onClick={moveSouth}
        disabled={!buttonState}
      >
        South
      </button>
      {/* East Button */}
      <button
        className="buttonStyle"
        onClick={moveEast}
        disabled={!buttonState}
      >
        East
      </button>
      {/* West Button */}
      <button
        className="buttonStyle"
        onClick={moveWest}
        disabled={!buttonState}
      >
        West
      </button>
      {/* Return to intial random point button */}
      <button
        className="buttonStyle"
        onClick={returnToStart}
        disabled={!buttonState}
      >
        Return
      </button>

    </>
  );
}

export default DirectionButtons;
