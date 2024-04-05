"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDistanceByLatLon = (lat1, lon1, lat2, lon2) => {
    const earthRadiusInKm = 6371;
    // const kmToMilesConversionFactor = 0.621371;
    const deg2rad = (degree) => {
        return degree * (Math.PI / 180);
    };
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = earthRadiusInKm * c;
    const distanceInMiles = distanceInKm;
    return distanceInMiles;
};
exports.default = getDistanceByLatLon;
