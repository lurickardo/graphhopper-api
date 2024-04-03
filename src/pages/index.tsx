import Image from "next/image";
import { Noto_Sans_Lao } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Button from "./components/Button";
import { useState } from "react";
import Modal from "./components/Modal";
import { graphhopperAPI } from "@/providers/apis";
import {
  formatLocationData,
  metersToKilometer,
  metersToMiles,
  milisecondsToTime,
} from "@/config/utils";
import Spinner from "./components/Spinner";

const noto = Noto_Sans_Lao({ subsets: ["latin"] });

const travelFormSchema = z.object({
  origin: z
    .string({
      errorMap: (issue: any, _ctx: any): { message: string } => ({
        message: "Preencha sua localização de origem.",
      }),
    })
    .min(1, { message: "Preencha sua localização de origem." })
    .max(125, { message: "Localização de origem muito longa." }),
  destination: z
    .string({
      errorMap: (issue: any, _ctx: any): { message: string } => ({
        message: "Preencha sua localização de destino.",
      }),
    })
    .min(1, { message: "Preencha sua localização de destino." })
    .max(125, { message: "Localização de destino muito longa." }),
});

type TravelFormSchema = z.infer<typeof travelFormSchema>;

export default function Home() {
  const [contentModalRoute, setContentModalRoute] = useState(<div />);
  const [vehicleForm, setVehicleForm] = useState<VehiclesType>("car");
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelFormSchema>({
    resolver: zodResolver(travelFormSchema),
  });

  const submitRoute = async (travelForm: TravelFormSchema) => {
    setOpenRouteModal(true);
    setContentModalRoute(<Spinner color="blue" />);
    const [{ data: originGeocode }, { data: destinationGeocode }] =
      await Promise.all([
        graphhopperAPI.get("/geocode", {
          params: { q: travelForm.origin, limit: 1 },
        }),
        graphhopperAPI.get("/geocode", {
          params: { q: travelForm.destination, limit: 1 },
        }),
      ]);

    const origin = formatLocationData(originGeocode);

    const destination = formatLocationData(destinationGeocode);

    const { data: routes } = await graphhopperAPI.post("/route", {
      points: [
        [origin.lng, origin.lat],
        [destination.lng, destination.lat],
      ],
      profile: vehicleForm,
    });

    setContentModalRoute(
      <div>
        <span className="mb-8">
          Direções de {origin.name} - {origin.state} em {origin.country} para{" "}
          {destination.name} - {destination.state} em {destination.country} de
          {" carro"}
        </span>
        <br />
        <span className="mb-8">
          Distância Percorrida: {metersToMiles(routes.paths[0].distance)} milhas
          / {metersToKilometer(routes.paths[0].distance)} km Duração da viagem:
          {` ${milisecondsToTime(routes.paths[0].time)}`}
        </span>
        <br />
        <ul role="list" className="divide-y divide-gray-100">
          {routes.paths[0].instructions.map((instruction: any) => {
            return (
              <div>
                {instruction.text} ({metersToKilometer(instruction.distance)} km
                / {metersToMiles(instruction.distance)} milhas)
              </div>
            );
          })}
        </ul>
      </div>,
    );
  };
  return (
    <main
      className={`min-w-screen flex min-h-screen items-center justify-center bg-slate-950 ${noto.className}`}
    >
      <section className="min-w-screen-2xl rounded-xl bg-slate-900 p-5">
        <div className="flex flex-col items-center text-center  sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={100}
            height={100}
            src="/travel.png"
            alt=""
            className="max-w-[100px]"
          />
          <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Pesquisar informações de viagem
          </h2>
        </div>
        <div className="flex flex-col items-center text-left sm:mx-auto sm:w-full">
          <form
            className="space-y-2"
            onSubmit={handleSubmit(submitRoute)}
            id="formSupplements"
          >
            <div>
              <label
                htmlFor="input-size"
                className="block text-lg font-medium text-gray-700 dark:text-gray-100"
              >
                Origem
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="input-origin"
                  className="mt-1 block h-10 w-full rounded border pl-8 pr-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Digite sua origem"
                  {...register("origin")}
                />
                <span className="absolute inset-y-0 left-0 ml-2 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src="/icons/origin.svg"
                    alt=""
                    className="pointer-events-none h-4 w-4 text-blue-400"
                  />
                </span>
              </div>
              {errors.origin && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.origin.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="input-size"
                className="block text-lg font-medium text-gray-700 dark:text-gray-100"
              >
                Destino
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="input-destination"
                  className="mt-1 block h-10 w-full rounded border pl-8 pr-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Digite seu destino"
                  {...register("destination")}
                />
                <span className="absolute inset-y-0 left-0 ml-2 flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src="/icons/destination.svg"
                    alt=""
                    className="pointer-events-none h-4 w-4 text-blue-400"
                  />
                </span>
              </div>
              {errors.destination && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.destination.message}
                </p>
              )}
            </div>
            <div className="flex h-full items-center justify-center rounded-md px-4 py-1.5">
              <Button layout="approved" success>
                Gerar rota
              </Button>
            </div>
          </form>
        </div>
      </section>
      {openRouteModal && (
        <Modal
          title="Informações da viagem"
          buttonText="OK"
          layout="large"
          onClose={setOpenRouteModal}
        >
          {contentModalRoute}
        </Modal>
      )}
    </main>
  );
}
