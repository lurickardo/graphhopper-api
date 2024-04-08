import Image from "next/image";
import { ComponentProps } from "react";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "flex items-center rounded text-sm font-medium text-zinc-900 bg-emerald-500 hover:bg-emerald-600",
  variants: {
    layout: {
      default: "h-9 px-4",
      sm: "h-8 px-3",
      xs: "h-6 px-2 text-xs flex",
      alert:
        "px-4 h-9 text-sm rounded font-medium text-zinc-900 bg-yellow-500 hover:bg-yellow-600",
      approved:
        "h-9 px-4 text-sm rounded font-medium text-zinc-900 bg-emerald-500 hover:bg-emerald-600",
    },
    success: {
      true: "bg-emerald-500 hover:bg-emerald-600",
    },
  },
  defaultVariants: {
    layout: "default",
    success: false,
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    success?: boolean;
  };

export default function Button({
  success,
  layout,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={button({ layout, success, className })}
      {...props}
    >
      {success && (
        <Image
          width={100}
          height={100}
          src="/icons/geo-fill.svg"
          alt=""
          className="w-4 h-4 text-blue-400 pointer-events-none"
        />
      )}

      {props.children}
    </button>
  );
}
