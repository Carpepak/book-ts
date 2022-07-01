import React, { useMemo } from "react";
import classes from 'classnames';
import styles from './index.module.scss';

export interface Book{
  id:string|number;
  cover:string;
  title:string;
  author:string;
  vocabulary:string;
  summary:string;
  selected?:boolean;
  level?:string;
}

export interface BookCheckProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>,'onChange'>{
    name?:string;
    value?:boolean;
    onChange?:(value:boolean)=>void;
    book:Book;
  }

const BookCheckCard:React.FC<BookCheckProps>=({
  value,
  onChange,
  book,
  className
})=>{
  const bookLevel = useMemo(()=>{
    if(book.level==='classic'){
      return '经典';
    }
    if(book.level==='advanced'){
      return '进阶';
    }
    return '高级';
  },[book])

  return (<div
  className={classes(
    styles.bookCheck,
    value===true&&styles.checked,
    className
  )}
  onClick={()=>onChange?.(!value)}
  >
    <div className={styles.cover}>
      <span>{bookLevel}</span>
      <img src={book.cover} alt=''></img>
    </div>
    <div className={styles.descriptions}>
      <span>{book.author}</span>
      <span>{book.vocabulary}</span>
    </div>
    <div className={styles.summary}>{book.summary}</div>
    <div>
    </div>
  </div>)
}
export default BookCheckCard;