interface ButtonProps {
    text: string;
    handleClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    styles?: string;
}

const Button = ({ text, handleClick, type, styles }: ButtonProps) => {
    return (
        <button type={type ? type : "button"} className={`bg-blue-400 hover:bg-blue-500 duration-300 text-white font-semibold px-3 py-2 rounded-md ${ styles ? styles : null }`} onClick={handleClick}>
            {text}
        </button>
    )
}

export default Button