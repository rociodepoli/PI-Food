import React from "react";
import styles from './Pagination.module.css'

export function Pagination(props) {
  const pages = [];
  for (var i = 0; i < props.totalp; i++) {
    pages.push(i + 1);
  }
  return (
    <div className={styles.container}>
      <button
      className={styles.botonprev}
        onClick={() => {
          props.previous();
        }}
        disabled={props.page <= 1}
      >
        Prev
      </button>
      {pages.length > 0
        ? pages.map((page) => (
            <button className={styles.pages} key={`page${page}`} onClick={() => props.pagenumber(page)}>
              {page}
            </button>
          ))
        : ""}
      <button 
      className={styles.botonnext}
        onClick={() => {
          props.next();
        }}
        disabled={props.page >= props.totalp}
      >
        Next
      </button>
    </div>
  );
}
