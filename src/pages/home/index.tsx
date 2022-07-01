import React, { ReactNode } from 'react';
import Alert from '../../compnents/alert';
import BookCheckCard, { Book } from '../../compnents/book-check';
import Button from '../../compnents/button';
import useBooks from '../../compnents/use-books';
import PickResults from '../pick-results';
import styles from './index.module.scss';



const Home = ()=>{
  const{
    books,
    pageProgress,
    showAlert,
    countsOfSelectedBooks,
    top4Books,
    unSucceedBooks,
    totalNumber,
    handleBookCardChange,
    handleSubmit,
    handleAlertActionClick,
  } = useBooks();
  const renderBookField = (book:Book):React.ReactElement=>{
    return (
      <BookCheckCard 
        key={book.id}
        book={book}
        value={book.selected}
        onChange={(value)=>handleBookCardChange(book.id, value)}
      />
    )
  };
  const renderAlert = ():React.ReactElement |null=>{
    if(showAlert)
      return (<Alert title='pick success!' onConfirm={handleAlertActionClick}>
        <div>
          <mark>X月X日</mark>公布投票结果,记得来看~
        </div>
      </Alert>)
    return null;
  };
  const renderFooterButton = ()=>{
    if(pageProgress==='SUBMITTED'){
      return <Button disabled>每个人只能pick一次~</Button>
    }
    if(pageProgress==='SUBMITTING'){
      return <Button disabled>正在提交...</Button>
    }
    if(pageProgress==='LOADED'){
      return <Button disabled={countsOfSelectedBooks===0} onClick={handleSubmit}>我选了{countsOfSelectedBooks}本</Button>
    }
    return null;
  };
  if(pageProgress === 'LOADING'){
    //添加渲染也行
    return null;
  };
  if(pageProgress==='RESULTS'){
    return(<PickResults 
      books={books}
      top4Books={top4Books}
      unSucceedBooks={unSucceedBooks}
      totalNumber={totalNumber} 
      ></PickResults>)
  };
  return (
    <div className={styles.home}>
      <img className={styles.pageImage} src='../../assets/first-screen.png' alt=''></img>
      <div className={styles.bookList}>{books.map(renderBookField)}</div>
      <div className={styles.footer}>{renderFooterButton()}</div>
      {renderAlert()}
    </div>
  )
}
export default Home;
