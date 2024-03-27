// const getDistanceByLatLon = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
// 	const earthRadiusInKm = 6371;
// 	// const kmToMilesConversionFactor = 0.621371;

// 	const deg2rad = (degree: number): number => {
// 		return degree * (Math.PI / 180);
// 	};

// 	const dLat: number = deg2rad(lat2 - lat1);
// 	const dLon: number = deg2rad(lon2 - lon1);

// 	const a: number =
// 		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// 		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

// 	const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// 	const distanceInKm: number = earthRadiusInKm * c;
// 	const distanceInMiles: number = distanceInKm;

// 	return distanceInMiles;
// };

// export default getDistanceByLatLon;

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
