import Image from "next/image";
import { Noto_Sans_Lao } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Button from "./components/Button";
import { useState } from "react";
import Modal from "./components/Modal";
import { graphhopperAPI } from "@/providers/apis";

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
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelFormSchema>({
    resolver: zodResolver(travelFormSchema),
  });

  const submitRoute = async (formData: any) => {
    console.log(formData);
    const a = await graphhopperAPI.get("/route", {
      params: { q: formData.origin, limit: 1 },
    });

    setContentModalRoute(<div>test</div>);
    setOpenRouteModal(true);
  };
  return (
    <main
      className={`flex justify-center items-center min-h-screen min-w-screen bg-slate-950 ${noto.className}`}
    >
      <section className="rounded-xl min-w-screen-2xl p-5 bg-slate-900">
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
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                  placeholder="Digite sua origem"
                  {...register("origin")}
                />
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                  <Image
                    width={100}
                    height={100}
                    src="/icons/origin.svg"
                    alt=""
                    className="w-4 h-4 text-blue-400 pointer-events-none"
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
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                  placeholder="Digite seu destino"
                  {...register("destination")}
                />
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                  <Image
                    width={100}
                    height={100}
                    src="/icons/destination.svg"
                    alt=""
                    className="w-4 h-4 text-blue-400 pointer-events-none"
                  />
                </span>
              </div>
              {errors.destination && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.destination.message}
                </p>
              )}
            </div>
            <div className="flex h-full justify-center items-center rounded-md px-4 py-1.5">
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
