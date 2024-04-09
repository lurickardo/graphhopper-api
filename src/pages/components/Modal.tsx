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
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
				<div className={`${modalLayoutClass}`}>
					<div className="relative flex w-full flex-col rounded-lg border-0 bg-slate-800 shadow-lg outline-none focus:outline-none">
						<div className="items-start justify-between rounded-t border-b border-solid border-slate-500 p-3">
							<h3 className="text-center text-3xl font-semibold text-white dark:text-white-500">
								{title}
							</h3>
						</div>
						<div className="relative flex-auto overflow-y-auto overflow-x-hidden p-6">
							{children}
						</div>
						<div className="flex items-center justify-end rounded-b border-t border-solid border-slate-500 p-6">
							<Button layout="approved" onClick={() => onClose(false)}>
								{buttonText}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-40 bg-black opacity-25" />
		</>
	);
}
