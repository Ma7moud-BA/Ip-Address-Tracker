import React, { useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import icon from "./icon";

const ChangeMarker = ({ position }) => {
	const map = useMap();
	useEffect(() => {
		map.flyTo(position, 13);
	}, [map, position]);
	return <Marker icon={icon} position={position}></Marker>;
};

export default ChangeMarker;

// to make the flyto method work make sure to sperate in a component
//so you can initinate the useMap hook since you cant call it unless its in the MapContainer
