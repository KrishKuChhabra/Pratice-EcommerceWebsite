'use client'

import { ComponentProps,  } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
type SubmitFormProps={
    children:React.ReactNode,
    className?:string,
} & ComponentProps<"button">

export default function FormSubmitButton({children, className, ...props}:SubmitFormProps){
    //for loadimg (it is in experimental mode)
    const {pending}= useFormStatus()
    return(
    <button {...props} className={`btn btn-primary ${className}`} type="submit" disabled={pending}>
    {pending && <span className="loading loading-spinner" />}
    {children}
    </button>
)
}