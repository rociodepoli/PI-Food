import React from "react";

export function Pagination(props){

const pages=[];
for(var i=0; i<props.totalp; i++){
    pages.push(i+1)
}
    return(
        <div>
            <button onClick={()=>{props.previous()}} disabled={props.page <=1}>Prev</button>
            {pages.length>0 ? pages.map((page)=> <button key={`page${page}`} onClick={()=> props.pagenumber(page)}>{page}</button>) : ''}
            <button onClick={()=>{props.next()}} disabled={props.page>=props.totalp}>Next</button>
        </div>
    )
}