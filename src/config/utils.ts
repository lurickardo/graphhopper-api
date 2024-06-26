export const formatLocationData = (geocodeData: any): GeocodeType => {
	const {
		name,
		state,
		country,
		point: { lat, lng },
	} = geocodeData.hits[0];
	return { name, state, country, lat, lng };
};

export const metersToMiles = (metros: number): string => {
	const milhas: number = metros / 1609.34;
	return milhas.toFixed(1);
};

// Função para converter metros em quilômetros
export const metersToKilometer = (metros: number): string => {
	const quilometros: number = metros / 1000;
	return quilometros.toFixed(1);
};

export const milisecondsToTime = (miliseconds: number): string => {
	const h = Math.floor(miliseconds / 1000 / 60 / 60);
	const m = Math.floor((miliseconds / 1000 / 60 / 60 - h) * 60);
	const s = Math.floor(((miliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60);

	const seconds = s < 10 ? `0${s}` : `${s}`;
	const minutes = m < 10 ? `0${m}` : `${m}`;
	const hours = h < 10 ? `0${h}` : `${h}`;

	return `${hours}h ${minutes}m ${seconds}s`;
};

const translationDict: { [key: string]: string } = {
	car: "carro",
	bike: "bicicleta",
	foot: "a pé",
	Keep: "Siga",
	right: "à direita",
	onto: "em direção a",
	Turn: "Vire",
	left: "à esquerda",
	Arrive: "Chegue",
	at: "ao",
	destination: "destino",
	and: "e",
	drive: "dirija",
	toward: "em direção a",
};

export const translateWords = (sentence: string): string => {
	const englishWords = Object.keys(translationDict).join("|");
	const regexPattern = new RegExp(`\\b(?:${englishWords})\\b`, "g");
	return sentence.replace(regexPattern, (match) => {
		return translationDict[match] || match;
	});
};
