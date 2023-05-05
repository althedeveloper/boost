import { FormEvent } from "react";

interface ButtonProps {
    text: string;
    clickFunction(e: FormEvent): any;
}

const Button = (props:ButtonProps) => {

  return (
        <button
            type="submit"
            onClick={props.clickFunction}
            className="w-full md:w-fit bg-yellow text-darkBlue py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
            >
            {props.text}
        </button>

  )

}

export default Button