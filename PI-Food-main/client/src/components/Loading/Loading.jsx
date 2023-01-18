import React from "react";
import styles from './Loading.module.css'

export default function Loading(){

    return(
        <div className={styles.div}>
            <img className={styles.img} src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif" alt="loading" />
        </div>
    )
}