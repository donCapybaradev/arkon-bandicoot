export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};
export default function Button({ variant, disabled, children, className, ...rest }: ButtonProps): import("react/jsx-runtime").JSX.Element;
