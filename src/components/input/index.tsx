/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from 'react-hook-form'


interface InputProps{
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export function Input({name, placeholder, type, register, error, rules }: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className='text-red-500 my-1'>{error}</p>}
    </div>
  )
}
