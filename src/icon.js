import L from "leaflet";
import icon from "../images/icon-location.svg";

export default L.icon({
	iconSize: [30, 35],
	shadowSize: [50, 64],
	iconAnchor: [22, 94],
	popupAnchor: [2, -40],
	iconUrl: icon,
});
