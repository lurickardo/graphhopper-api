import { CarFront } from "lucide-react";
import Button from "./Button";
import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
}
export const IconButton = (props: IconButtonProps) => {
  return (
    <Button className="bg-amber-400 hover:bg-yellow-600">
      {props.children}
    </Button>
  );
};
