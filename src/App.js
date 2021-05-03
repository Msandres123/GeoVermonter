import "./styles/App.css";
import { useState } from "react";

//import { Renderer } from "leaflet
import leafletPip from "leaflet-pip";
import L from "leaflet";

//import functions of individual functions
import GameButtons from "./components/scripts/GameButtons";
import Map from "./components/scripts/Map";
import Counties from "./components/scripts/Counties";
import borderData from "./components/scripts/border";
import InfoBar from "./components/scripts/InfoBar";
import CountyCheck from "./components/scripts/VtCountyBorder";
import DirectionButtons from "./components/scripts/DirectionButtons";
import NavBar from "./components/scripts/NavBar";

function App() {
  //Variables for altering position of map marker
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [zoom, setZoom] = useState(8);

  //variables for random generated latitude and longitude
  const [latRandom, setLatRandom] = useState(43.88);
  const [longRandom, setLongRandom] = useState(-72.7317);

  //General game variables, start, quit and score
  const [score, setScore] = useState(100);
  const [start, setStart] = useState(true);
  const [quit, setQuit] = useState(false);

  //Button State enables game and directional buttons after start button has been click
  const [buttonState, setButtonState] = useState(false);
  const [guessBox, setGuessBox] = useState(false);

  //Variables for moving the marker N, S, E W
  const [moveNorthCount, setMoveNorthCount] = useState(0);
  const [moveSouthCount, setMoveSouthCount] = useState(0);
  const [moveEastCount, setMoveEastCount] = useState(0);
  const [moveWestCount, setMoveWestCount] = useState(0);

  //Random start function places marker in a random location within VT state borders
  function RandomStart() {
    //start by defining variables for max and min longitude and latitude
    let layerLength = 0;
    const vtMinLat = 42.730315121762715;
    const vtMaxLat = 45.00706691759828;
    const vtMinLong = -73.42494466485307;
    const vtMaxLong = -71.510225353531;

    let latRandGen;
    let longRandGen;
    //borderData is set with geoJason and it is assigned to a variable here to be passed as layer in leaflet pip
    let vtBorderData = L.geoJSON(borderData);
    //loop ensures marker will be within state border
    while (layerLength !== 1) {
      //Generates random latitude and longitude points
      latRandGen = Math.random() * (vtMaxLat - vtMinLat) + vtMinLat;
      longRandGen = Math.random() * (vtMaxLong - vtMinLong) + vtMinLong;
      //Vermont is a polygon shaped state
      //leaflet-pip is a library for finding out whether a point is inside a polygon
      // checking if the randomly generated co-ords are within the vermont border points
      layerLength = leafletPip.pointInLayer(
        [longRandGen, latRandGen],
        vtBorderData
      ).length;
    }
    //assigns random points to our latitude and longitude variables
    setLatRandom(latRandGen);
    setLongRandom(longRandGen);
    setCenter([latRandGen, longRandGen]);
  }
  //places the map marker in a random spot as well as disables start button and enables guess and quit buttons
  function startClickHandler() {
    setStart(false);
    setButtonState(!buttonState);
    setZoom(18);
    RandomStart();
  }

  //triggers the guess modal box to appear
  function guessClickHandler() {
    setGuessBox(!guessBox);
  }

  //Displays the players location and informs them of the county and town the marker has been placed in
  function quitClickHandler() {
    setButtonState(!buttonState)

    setQuit(true);
  }

  //function that returns player to the initial random spot
  function returnToStart() {
    setLatRandom(latRandom + moveSouthCount * 0.002 - moveNorthCount * 0.002)
    setLongRandom(longRandom + moveWestCount * 0.002 - moveEastCount * 0.002)
    setCenter([
      latRandom + moveSouthCount * 0.002 - moveNorthCount * 0.002,
      longRandom + moveWestCount * 0.002 - moveEastCount * 0.002,
    ]);
    setMoveNorthCount(0);
    setMoveSouthCount(0);
    setMoveWestCount(0);
    setMoveEastCount(0);
  }

  //function to move marker north when north button is pressed, for some reason directional buttons must be pressed twice before the changes are made
  function moveNorth() {
    setMoveNorthCount(moveNorthCount + 1);
    setLatRandom(latRandom + 0.002);
    setCenter([latRandom + 0.002, longRandom]);
    setScore(score - 1);
  }

  //function to marker south when south button is pressed
  function moveSouth() {
    setMoveSouthCount(moveSouthCount + 1);
    setLatRandom(latRandom - 0.002);
    setCenter([latRandom - 0.002, longRandom]);
    setScore(score - 1);
  }

  //function to move marker east when east button is pressed
  function moveEast() {
    setMoveEastCount(moveEastCount + 1);
    setLongRandom(longRandom + 0.002);
    setCenter([latRandom, longRandom + 0.002]);
    setScore(score - 1);
  }

  //function to move marker west when west button is pressed
  function moveWest() {
    setMoveWestCount(moveWestCount + 1);
    setLongRandom(longRandom - 0.002);
    setCenter([latRandom, longRandom - 0.002]);
    setScore(score - 1);
  }

  //JSX html
  return (
    //App div for CSS styling
    <div className="App">
      {/* NavBar, just displaying the header at the moment */}
      <NavBar />



      <div className="MapInfoBarWrap">
        <div className="directionButtons">
          {/* Directional buttons for moving marker N, S, E, W */}
          <DirectionButtons
            buttonState={buttonState}
            moveNorth={moveNorth}
            moveSouth={moveSouth}
            moveEast={moveEast}
            moveWest={moveWest}
            returnToStart={returnToStart}
          />
        </div>

        {/* declared to obtain map center and zoom*/}
        <Map center={center} zoom={zoom}  latRandom={latRandom} longRandom={longRandom} />

        {/* guessBox modal */}
        {guessBox && (
          <Counties
            score={score}
            setScore={setScore}
            guessBox={setGuessBox}
            latRandom={latRandom}
            longRandom={longRandom}
          />
        )}
        {/* function for fetching geographic data from nominatim */}
        {quit && (
          <CountyCheck
            score={score}
            checkQuit={quit}
            latRandom={latRandom}
            longRandom={longRandom}
          />
        )}

        {/* Info-Bar that displays score, county, town, lat long */}
        {!quit && !guessBox && (
          <InfoBar
            score={score}
            county={"?"}
            town={"?"}
            latitude={"?"}
            longitude={"?"}
          />
        )}
      </div>

      <div className="gameButtonWrap">
        {/* Game buttons, start, quit, guess */}
        <GameButtons
          startClickHandler={startClickHandler}
          buttonState={buttonState}
          quitClickHandler={quitClickHandler}
          guessClickHandler={guessClickHandler}
        />
      </div>
    </div>
  );
}

export default App;
