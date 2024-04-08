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

type ContentRouteProps = {
  origin: { name: string; state: string; country: string };
  destination: { name: string; state: string; country: string };
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
  return (
    <div>
      <span className="mb-8">
        Direções de {origin.name} - {origin.state} em {origin.country} para{" "}
        {destination.name} - {destination.state} em {destination.country} de
        {` ${vehicle}`}
      </span>
      <br />
      <span className="mb-8">
        Distância Percorrida: {distance.miles} milhas / {distance.km} km Duração
        da viagem:
        {duration}
      </span>
      <br />
      <ul role="list" className="divide-y divide-gray-100">
        {instructions.map((instruction: Instruction, key: number) => {
          return (
            <div key={`${key}-${instruction.street_name}`}>
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
