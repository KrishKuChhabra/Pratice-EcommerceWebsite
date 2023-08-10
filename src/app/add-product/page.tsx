import FormSubmitButton from "@/components/SubmitFormButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata={
    title:"Add-Product - KrishCart"
}

 async function addProduct(formData:FormData) {
    'use server';

    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }
    const name= formData.get("name")?.toString();
    const description= formData.get("description")?.toString();
    const imageUrl= formData.get("imageUrl")?.toString();
    const price= Number(formData.get("price") || 0)

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing required fields")
    }

    
        await prisma.product.create({
            data:{name, description, imageUrl, price}
        });
        
    
 
    redirect("/")
 }
export default async function ProductPage(){
    const session= await getServerSession(authOptions)

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }
   return(
      <div>
        <h1 className="text-lg mb-3 font-bold "> Add Product</h1>
        <form action={addProduct}>
            <input 
            className="input input-bordered mb-3 w-full "
            type="text"
            required
            name="name"
            placeholder="Name"
             />

             <textarea
             required
             name="description"
             placeholder="Description"
             className=" textarea-bordered textarea mb-3 w-full"
             />

            <input 
            className="input input-bordered mb-3 w-full "
            type="url"
            required
            name="imageUrl"
            placeholder="Image URL"
             />

            <input 
            className="input input-bordered mb-3 w-full "
            type="number"
            required
            name="price"
            placeholder="price"
             />
             <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
        </form>
      </div>
   )
}