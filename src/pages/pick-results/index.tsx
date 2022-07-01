import React from 'react';
import { Book } from '../../compnents/book-check';
import { UnSucceedBook } from '../../compnents/use-books';
import styles from './index.module.scss';

export interface PickResultsProps{
  books:Book[];
  top4Books:string[];
  totalNumber:number;
  unSucceedBooks:UnSucceedBook[];
}

const PickResults:React.FC<PickResultsProps> = ({
  books,
  top4Books,
  totalNumber,
  unSucceedBooks
})=>{
  return (
    <div className={styles.pickResults}>
      <div className={styles.header}>
        <img src='../../assets/results-header' alt=''/>
        <div className={styles.resultsNumber}>参与人数:<span>{totalNumber}</span></div>
      </div>

      <div className={styles.divider}></div>
      <div className={styles.availableBooks}>
        <div className={styles.sectionTitle}>本次备选的书单有</div>
        <div className={styles.main}>
          {books.map((book, index) => (
            <p key={book.id}>
              书单{index + 1}：{book.title}
            </p >
          ))}
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.results}>
        <div className={styles.sectionTitle}>Pick结果如下</div>
        <div className={styles.barChart}>
          {top4Books.map((item, index) => (
            <div key={index}>
              <div className={styles.number}>{index+1}</div>
              <div className={styles.bar} />
              <div className={styles.label}>《{item}》</div>
            </div>
          ))}
        </div>
        <div className={styles.rankList}>
          {unSucceedBooks?.map((book) => (
            <div className={styles.item} key={book.sort}>
              <div className={styles.sort}>{book.sort}</div>
              <div className={styles.name}>《{book.name}》</div>
              <div className={styles.score}>{book.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
export default PickResults;