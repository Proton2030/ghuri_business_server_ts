const getDistanceByLatLon = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
	const earthRadiusInKm = 6371;
	// const kmToMilesConversionFactor = 0.621371;

	const deg2rad = (degree: number): number => {
		return degree * (Math.PI / 180);
	};

	const dLat: number = deg2rad(lat2 - lat1);
	const dLon: number = deg2rad(lon2 - lon1);

	const a: number =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distanceInKm: number = earthRadiusInKm * c;
	const distanceInMiles: number = distanceInKm;

	return distanceInMiles;
};

export default getDistanceByLatLon;
