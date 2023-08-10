import { formatPrice } from "@/lib/format"
import { Space_Mono } from "next/font/google"

interface PriceTagProps{
    price:number,
    className?: string
}

export default function PriceTag({price, className}:PriceTagProps){
   
    return  <span className={`badge ${className}`}>{formatPrice(price)}</span>
}