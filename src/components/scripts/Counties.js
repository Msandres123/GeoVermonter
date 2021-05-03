//import { Renderer } from "leaflet";
import { useState } from "react";
import InfoBar from "./InfoBar";
//----Function to create the modal display----//
//This modal is an on-Click function, when guess is clicked, modal pops-up as an dialog box
// In order to guess a county, modal is created with a list of all the counties in vermont
//if you would like to guess, select the county from the dropdown and click the guess option
//Assignment of functional variables
function Counties(props) {
  const [chosen, setChosen] = useState(null);
  //this state shows the selected county by the player
  const [countySelected, setCountySelected] = useState("");
  //this is the fetched county and it will be used to compare landed county and selected countya re same
  //const [countyCompare, setCountyCompare] = useState("")
  let countyCompare;
  //const [countyData, setCountyData] = useState({})
  const [data, setData] = useState();
  const [buttonToggle, setToggle] = useState(true);
  // const [score, setScore] = useState(props.score);
  let cancel = false


  // Function for changing the counties
  function changeSelection(evt) {
    setCountySelected(evt.target.value);
    // this function has data the real county data from the fetch.
    // this helps to find if the guessed option and real county are same
    RealCountyFetch();

  }

  //function for selecting the counties, on submit the selected value is equal to the county chosen
  function SubmitCountyForm(evt) {
    // this makes sure the page is not refreshed once the button is triggered
    evt.preventDefault();
    RealCountyFetch();
    GuessCorrect();
  }
  //Function for users guess
  function GuessCorrect() {
    // if player doesn't select a county and clicks guess button, 
    //it will alert them to click  an option from display
    if (countySelected !== "") {
      // here the player selected and the real fetched coordinated are compared
      if (countySelected !== countyCompare) {
        // when guess is wrong, the score is decreased
        props.setScore(props.score - 10);
        setToggle(true);
        alert("hoooo! Wrong Guess, Try Again");
      } else {
        setToggle(false);
        // when the guess is right, the details are shown in the info bar
        alert("Yipeee, you guessed it rite");
      }
    } else {
      alert("Ahhh! Choose a County");
    }
  }
  //fetching the data of the county to compare if guess is rite or wrong
  function RealCountyFetch() {
    //fetching the data from nominatim reverse lookup API 
    //randomly generated lat and long coordinates are passed here to do the reverse fetch
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${props.latRandom}&lon=${props.longRandom}&format=json`
    )
      .then((res) => res.json())
      //jsonObj acts as the placeholder to hold the fetched data
      .then((jsonObj) => {

        setData(jsonObj);
      });
    //initializing a variable to hold on the data to compare with the player guess
    countyCompare = data && data.address.county;


  }
  return (
    <>
      {/* until user guess the county , this will be shown in the info bar*/}
      {buttonToggle && (
        <InfoBar
         score={props.score}
          county={"?"}
          town={"?"}
          latitude={"?"}
          longitude={"?"}
        />
      )}
      {/* Once player guesses the county, the complete info will be fetched and displayed here*/}
      {!buttonToggle && (
        <InfoBar
          score={props.score}
          county={countyCompare}
          latitude={props.latRandom}
          longitude={props.longRandom}
          // county={data && data.address.county}
          town={
            (data && data.address.city) ||
            (data && data.address.village) ||
            (data && data.address.hamlet) ||
            (data && data.address.town)
          }
        />
      )}
      {cancel && (
        <InfoBar
          score={props.score}
          county={countyCompare}
          latitude={props.latRandom}
          longitude={props.longRandom}
          // county={data && data.address.county}
          town={
            (data && data.address.city) ||
            (data && data.address.village) ||
            (data && data.address.hamlet) ||
            (data && data.address.town)
          }
        />
      )}

      <div
        style={{
          height: "100px",
          width: "300px",
          border: "1px solid black",
          backgroundColor: "gray",
          position: "absolute",
          float: "left",
          marginLeft: 69,
          zIndex: 500,
        }}
      >
        <div>
          <h5>
            {chosen
              ? `Hello,you guessed ${countySelected}`
              : `Are you ready to Guess the County ?`}
          </h5>

          <form onSubmit={SubmitCountyForm}>
            {/* provides list of all counties and allows the player to choose */}
            <select
              name="County Selection"
              value={countySelected}
              onChange={changeSelection}
            >
              <option value="Choose a County">Please Choose a County</option>
              <option value="Addison County">Addison</option>
              <option value="Bennington County">Bennington</option>
              <option value="Caledonia County">Caledonia</option>
              <option value="Chittenden County">Chittenden</option>
              <option value="Essex County">Essex</option>
              <option value="Franklin County">Franklin</option>
              <option value="Grand Isle County">Grand Isle</option>
              <option value="Lamoille County">Lamoille</option>
              <option value="Orange County">Orange</option>
              <option value="Orlenes County">Orlenes</option>
              <option value="Rutland County">Rutland</option>
              <option value="Washington County">Washington</option>
              <option value="Windham County">Windham</option>
              <option value="Windsor County">Windsor</option>
            </select>
            <input type="submit" value="Guess" />
            <button
             
              onClick={(evt) => {
                cancel = true;

                props.guessBox(false);
                
                }} 
            >cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Counties;

