import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
  
} from "react-leaflet";
import borderData from "./border";
import MapZoom from "./MapZoom";
//---Map Functionality---//
// Map border details with latitude and longitude defines the border points for state of VT
function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);
  return (
    <MapContainer
      center={props.center}
      zoom={8}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      style={{ height: "600px", width: "600px" }}
    >
      {/* added to allow the map to zoom in */}
      <MapZoom center={props.center} zoom={props.zoom} />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <Marker position={props.center} />
      <Polygon
        positions={vtOutline}
        pathOptions={{ color: "orange", fillOpacity: 0 }}
        zoom={props.zoom}
      />
    </MapContainer>
  );
}

export default Map;
