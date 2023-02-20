import { useEffect, useRef, useState } from "react";
import arrow from "../images/icon-arrow.svg";
import "./app.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import ChangeMarker from "./ChangeMarker";

function App() {
	const [ipAddress, setIpAddress] = useState("");
	const [address, setAddress] = useState({});
	const [timeZone, setTimeZone] = useState("");
	const [isp, setIsp] = useState("");
	const [position, setPosition] = useState([31.0, 35.94503]);
	console.log(import.meta.env.VITE_APP_API_KEY);
	const inputRef = useRef();
	const BASE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${
		import.meta.env.VITE_APP_API_KEY
	}`;
	useEffect(() => {
		axios.get(BASE_URL).then((response) => {
			const data = response.data;
			setIpAddress(data.ip);
			setAddress(data.location);
			setTimeZone(data.location.timezone);
			setIsp(data.isp);
			setPosition([data.location.lat, data.location.lng]);
		});
	}, []);
	const goToIpOrDomainFromInput = (e) => {
		const ipOrDomain = inputRef.current.value;
		if (e.key === "Enter" && checkIp(ipOrDomain)) {
			console.log(ipOrDomain);
			axios
				.get(BASE_URL, { params: { ipAddress: ipOrDomain } })
				.then((response) => {
					const data = response.data;
					setIpAddress(data.ip);
					setAddress(data.location);
					setTimeZone(data.location.timezone);
					setIsp(data.isp);
					setPosition([data.location.lat, data.location.lng]);
					console.log(timeZone);
				});
		} else if (e.key === "Enter" && checkDomain(ipOrDomain)) {
			axios
				.get(BASE_URL, { params: { domain: ipOrDomain } })
				.then((response) => {
					const data = response.data;
					setIpAddress(data.ip);
					setAddress(data.location);
					setTimeZone(data.location.timezone);
					setIsp(data.isp);
					setPosition([data.location.lat, data.location.lng]);
				});
		}
	};
	const gotoIpOrDomain = () => {
		const ipOrDomain = inputRef.current.value;
		if (checkIp(ipOrDomain)) {
			axios
				.get(BASE_URL, { params: { ipAddress: ipOrDomain } })
				.then((response) => {
					const data = response.data;
					setIpAddress(data.ip);
					setAddress(data.location);
					setTimeZone(data.location.timezone);
					setIsp(data.isp);
					setPosition([data.location.lat, data.location.lng]);
					console.log(timeZone);
				});
		} else if (checkDomain(ipOrDomain)) {
			axios
				.get(BASE_URL, { params: { domain: ipOrDomain } })
				.then((response) => {
					const data = response.data;
					setIpAddress(data.ip);
					setAddress(data.location);
					setTimeZone(data.location.timezone);
					setIsp(data.isp);
					setPosition([data.location.lat, data.location.lng]);
				});
		}
	};
	const checkIp = (str) => {
		return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi.test(
			str
		);
	};
	const checkDomain = (str) => {
		return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(
			str
		);
	};
	return (
		<div className="home">
			<div className="background"></div>
			<section className="top-section">
				<div className="title">IP Address Tracker</div>
				<div className="search-field">
					<input
						type="text"
						placeholder="Search for any Up Address or Domain"
						ref={inputRef}
						onKeyUp={goToIpOrDomainFromInput}
					/>
					<button onClick={goToIpOrDomainFromInput}>
						<img src={arrow} onClick={gotoIpOrDomain} />{" "}
					</button>
				</div>
				<section className="view-section">
					<div className="info">
						<p> IP Address</p>
						<h3> {ipAddress}</h3>
					</div>
					<div className="info">
						<p> Location</p>
						<h3>{`${address.country},${address.city}`}</h3>
					</div>
					<div className="info">
						<p> Timezone</p>
						<h3> UTC {timeZone}</h3>
					</div>
					<div className="info">
						<p>ISP</p>
						<h3> {isp}</h3>
					</div>
				</section>
			</section>
			<MapContainer
				className="map"
				center={position}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ChangeMarker position={position}></ChangeMarker>
			</MapContainer>
		</div>
	);
}

export default App;
