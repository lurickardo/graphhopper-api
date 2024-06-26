import { MapPin, Locate, ChevronsDown } from "lucide-react";
import {
	metersToKilometer,
	metersToMiles,
	translateWords,
} from "@/config/utils";

type Instruction = {
	text: string;
	distance: number;
	street_name: string;
};

type Location = { name: string; state: string; country: string };

type ContentRouteProps = {
	origin: Location;
	destination: Location;
	vehicle: string;
	distance: { miles: string; km: string };
	duration: string;
	instructions: Instruction[];
};

export default function ContentRouteModal({
	origin,
	destination,
	vehicle,
	distance,
	duration,
	instructions,
}: ContentRouteProps) {
	if (!origin || !destination) {
		return (
			<div className="mt-2 text-1xl font-bold text-red-600 dark:text-red-500">
				Origem ou destino não foram definidos.
			</div>
		);
	}

	return (
		<div className="text-white dark:text-white-500">
			<span className="mb-8 text-white dark:text-white-500">
				Direções de {origin?.name} - {origin?.state} em {origin?.country} para{" "}
				{destination?.name} - {destination?.state} em {destination?.country}{" "}
				{vehicle === "foot" ? "" : "de"}
				{` ${translateWords(vehicle)}`}
			</span>
			<br />
			<span className="mb-8">
				Distância Percorrida: {distance.miles} milhas / {distance.km} km Duração
				da viagem:
				{duration}
			</span>
			<ul role="list" className="divide-y py-2">
				{instructions.map((instruction: Instruction, key: number) => {
					let Icon;
					let iconClass = "";
					if (key === 0) {
						Icon = Locate;
						iconClass = "locate";
					} else if (key === instructions.length - 1) {
						Icon = MapPin;
						iconClass = "map-pin-last";
					} else {
						Icon = ChevronsDown;
						iconClass = "chevrons-down";
					}
					return (
						<div
							key={`${key}-${instruction.street_name}`}
							className={`py-2 icon-container ${iconClass}`}
						>
							<Icon className="inline-block mr-2" />
							{translateWords(instruction.text)} (
							{metersToKilometer(instruction.distance)} km /{" "}
							{metersToMiles(instruction.distance)} milhas)
						</div>
					);
				})}
			</ul>
		</div>
	);
}
