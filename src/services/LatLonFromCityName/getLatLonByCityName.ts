const getLatLonByCityName = async (city_name: string) => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city_name)}%20india`
		);
		const data = await response.json();

		if (data && data.length > 0) {
			const { jobLat, jobLon } = data[0];
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
