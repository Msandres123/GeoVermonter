import { useMap } from "react-leaflet";
//Function used to zoom in on the map after clicking  the start button
function MapZoom(props) {
  //UseMap -created by the function is used to access the child components using the hook
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
}
export default MapZoom;
