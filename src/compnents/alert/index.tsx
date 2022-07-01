import React from "react";
import Button from "../button";
import styles from './index.module.scss';

export interface AlertProps{
  title:string;
  children?:React.ReactElement;
  onConfirm?:()=>void;
}

const Alert:React.FC<AlertProps> = ({title,children,onConfirm})=>{
  return (
    <div className={styles.alert}>
      <div className={styles.main}>
        <div className={styles.header}>{title}</div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Button onClick={onConfirm}>I ALREADY KNOW</Button>
        </div>
      </div>
    </div>
  );
}

export default Alert;