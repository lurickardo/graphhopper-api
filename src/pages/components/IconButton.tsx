import Button from "./Button";
import React from "react";

interface IconButtonProps {
	children: React.ReactNode;
	onClick: () => void;
}
export default function IconButton(props: IconButtonProps) {
	return (
		<Button
			className="bg-amber-400 hover:bg-yellow-600"
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
}
