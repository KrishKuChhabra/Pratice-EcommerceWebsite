import Link from "next/link";

interface PaginationBarProps{
    currentpage:number,
    totalpages:number
}

export default function PaginationBar({currentpage, totalpages}:PaginationBarProps){
   const maxPage=Math.min(totalpages, Math.max(currentpage + 4, 10))
   const MinPage= Math.max(1, Math.min(currentpage-5 , maxPage-9));

       const numberPageItems:JSX.Element[]=[]

   for (let page = MinPage; page < maxPage; page++) {
       numberPageItems.push(
        <Link
          href={"?page=" + page}
          key={page}
          className={`join-item btn ${currentpage===page ? "btn-active pointer-events-none " : ""}`}
        >
        {page}
        </Link>
       )
    
   }

   return (
    <>
    <div className=" join hidden sm:block">
       {numberPageItems}
    </div>
      <div className="join block sm:hidden">
         {currentpage>1 && 
           <Link href={"?page="+ (currentpage-1)} className="btn join-item">
               «
           </Link>
         }
         <button className="join-item btn pointer-events-none">
            page {currentpage}
         </button>
         {currentpage< totalpages &&
            <Link href={"?page="+ (currentpage+1)} className="btn join-item">
            »
           </Link>
         }
      </div>
    </>
   )
}