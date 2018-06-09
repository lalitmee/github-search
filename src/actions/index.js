import axios from "axios";

import FETCH_DATA from "./types";

const BASE_URL = "https://api.github.com/search/repositories";

// Fetch City Locality
export async function fetchResult(query) {
	try {
		const response = await axios.get(`${BASE_URL}?q=${query}&order=asc`);
		return {
			type: "FETCH_DATA",
			payload: response
		};
	} catch (error) {
		console.error(error);
	}
}
