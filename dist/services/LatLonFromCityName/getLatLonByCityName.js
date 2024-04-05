"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLatLonByCityName = (city_name) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("====>city name", city_name);
    try {
        const response = yield fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city_name}%20india`);
        const data = yield response.json();
        // console.log("====>data", data);
        if (data && data.length > 0) {
            const { lat: jobLat, lon: jobLon } = data[0];
            console.log("Lat====>", jobLat);
            return { latitude: parseFloat(jobLat), longitude: parseFloat(jobLon) };
        }
        else {
            throw new Error("No matching coordinates found for the provided city name.");
        }
    }
    catch (error) {
        console.error("Error fetching latitude and longitude:", error);
        return null;
    }
});
exports.default = getLatLonByCityName;
