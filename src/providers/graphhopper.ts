import Axios, { AxiosInstance } from "axios";

export const getAPIGrasshopperClient = (ctx?: any): AxiosInstance => {
	return Axios.create({
		baseURL: process.env.GRAPHHOPPER_BASE_URL,
		params: { key: process.env.GRAPHHOPPER_API_KEY },
	});
};
