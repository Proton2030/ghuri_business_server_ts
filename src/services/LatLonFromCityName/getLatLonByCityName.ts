const getLatLonByCityName = async (city_name: string) => {
	// console.log("====>city name", city_name);
	try {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city_name}%20india`);
		const data = await response.json();

		// console.log("====>data", data);

		if (data && data.length > 0) {
			const { lat: jobLat, lon: jobLon } = data[0];
			console.log("Lat====>", jobLat);
			return { latitude: parseFloat(jobLat), longitude: parseFloat(jobLon) };
		} else {
			throw new Error("No matching coordinates found for the provided city name.");
		}
	} catch (error) {
		console.error("Error fetching latitude and longitude:", error);
		return null;
	}
};

export default getLatLonByCityName;
