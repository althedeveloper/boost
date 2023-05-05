import Button from '../Button';
import React, { FormEvent} from "react";

interface FormProps {
    inputs: Array<{
        placeholder: string;
        type: string;
    }>
    error: string | null;
    location: any | string | null;
    submitFunction(e: FormEvent): any;
    onChangeFunction(e: FormEvent): any;
}

const Form = (props:FormProps) => {

  return (
  
    <form onSubmit={props.submitFunction} className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
        {
            props.inputs && props.inputs.length && (
                props.inputs.map((input, i) => (
                    <input 
                        key={i} 
                        type={input.type} 
                        placeholder={input.placeholder} 
                        value={props.location} 
                        onChange={props.onChangeFunction} 
                        className="py-2 px-4 w-full rounded-md border-none outline-none"
                    />
                ))
            )
        }
        <Button clickFunction={props.submitFunction} text="Search" />
        {props.error && (
            <p className="text-red-500 mt-4 font-semibold">{props.error}</p>
          )}
    </form>

  )

}

export default Form;