import React from "react";
import classes from 'classnames';
import styles from './index.module.scss';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
  disabled?:boolean;
}

const Button:React.FC<ButtonProps>=({className, children,...props})=>{
  return (
    <button className={classes(styles.button, className)}{...props}>
      {children}
    </button>
  )
}

export default Button;