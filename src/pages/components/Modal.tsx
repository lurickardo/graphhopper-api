import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

type ModalProps = {
	title: string;
	children: React.ReactNode;
	buttonText: string;
	onClose: Dispatch<SetStateAction<boolean>>;
	layout?: "default" | "large";
};

export default function Modal({
	title,
	children,
	buttonText,
	onClose,
	layout = "default",
}: ModalProps) {
	const modalLayoutClasses = {
		default: "relative w-auto my-6 mx-auto max-w-3xl",
		large: "relative my-6 mx-auto w-full max-w-6xl",
	};

	const modalLayoutClass =
		modalLayoutClasses[layout] || modalLayoutClasses.default;

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className={`${modalLayoutClass}`}>
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
						<div className=" items-start justify-between p-3 border-b border-solid border-slate-500 rounded-t">
							<h3 className="text-3xl font-semibold text-center">{title}</h3>
						</div>
						<div className="relative flex-auto overflow-x-hidden overflow-y-auto p-6">
							{children}
						</div>
						<div className="flex items-center justify-end p-6 border-t border-solid border-slate-500 rounded-b">
							<Button layout="approved" onClick={() => onClose(false)}>
								{buttonText}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black" />
		</>
	);
}
