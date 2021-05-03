import { useState } from "react";
import { useEffect } from "react";
import InfoBar from "./InfoBar";
//finds the town, and county based on the lat and long in which the marker is currently placed
function CountyCheck(props) {
  const [data, setData] = useState();
  //fetches the data from nominatim based upon the marker's lat and long
  useEffect(() => {
    if (data) {
      return false;
    } else {
      if (props.checkQuit) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${props.latRandom}&lon=${props.longRandom}&format=json`
        )
          .then((res) => res.json())
          .then((jsonObj) => {
            setData(jsonObj);
          });
      } else {
        return false;
      }
    }
  });

  return (
    //InfoBar is updated based upon data fetched from nomination
    <div className="MapInfoBarWrap">
      <InfoBar
        score={props.score}
        county={data && data.address.county}
        town={
          (data && data.address.city) ||
          (data && data.address.village) ||
          (data && data.address.hamlet) ||
          (data && data.address.town)
        }
        latitude={data && data.lat}
        longitude={data && data.lon}
      />
    </div>

  );
}
export default CountyCheck;
