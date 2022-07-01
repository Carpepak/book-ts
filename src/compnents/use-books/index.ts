import { useEffect, useMemo, useRef, useState } from "react";
import axios from 'axios';
import { Book } from "../book-check";
import { toast } from "react-toastify";

export type pageProgress = 
'LOADING'| 'LOADED' |
'SUBMITTING'| 'SUBMITTED'|
'RESULTS';

export interface UnSucceedBook{
  sort : string|number;
  name: string;
  score:string;
}

const useBooks = ()=>{
  const [books, setBooks] = useState<Book[]>([]);
  const [pageProgress, setPageProgress] = useState<pageProgress>('LOADING');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [top4Books,setTop4Books] = useState<string[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [unSucceedBooks, setUnSucceedBooks] = useState([]);
  
  const termCode = useRef<any>();
  const warningToastId = useRef<string|number|undefined>();
  const countsOfSelectedBooks = useMemo(()=>{
    return books.filter((book)=>book.selected).length;
  },[books])

  useEffect(()=>{
    setPageProgress('LOADING');
    axios.get(url,{
      params:{from:''},
    }).then((data:any)=>{
      setBooks(data?.new_books_infos?.map((item:Record<string, any>):Book=>{
        return {
          id:item.id as string,
          title:item.name,
          cover:item.cover,
          author:item.author,
          vocabulary:item.vocabulary,
          selected:item.selected,
          summary:item.summary,
          level:item.level
        };
      }));
      termCode.current = data?.term_code;
      setTop4Books(data?.selected_book_infos);
      setTotalNumber(data?.totalNumber);
      setUnSucceedBooks(
        data?.pick_ressult?.map(
          (item:Record<string, any>, index:number):UnSucceedBook=>({
            sort:index+5,
            name:item?.name,
            score:item?.count+'click'
          })
        )
      );
      if(data?.show_status==='picked'){
        setPageProgress('RESULTS');
      }
      if(data?.has_select_done===true){
        setPageProgress('SUBMITTED');
      }else{
        setPageProgress('LOADED');
      }
    })
  },[]);
  const handleBookCardChange = (id:number|string, selected:boolean)=>{
    if(countsOfSelectedBooks>=3 && selected){
      if(warningToastId.current){
        toast.dismiss(warningToastId.current);
      }
      warningToastId.current = toast.warn('current choose can not more than 3~');
      return ;
    }
    setBooks(
      books.map((book)=>{
        if(book.id===id){
          book.selected = selected;
        }
        return book;
      })
    )
  };
  //submit re
  const handleSubmit = async()=>{
    const selectedBookIds = books.filter((book)=>book.selected).map((book)=>book.id);
    if(selectedBookIds.length===0){
      toast.warn('plz choose one book at least');
      return ;
    }
    try{
      setPageProgress('SUBMITTING');
      await axios.post(url,{
        term_code:termCode.current,
        new_book_ids:selectedBookIds
      });
      setPageProgress('SUBMITTED');
      setShowAlert(true);
    }catch(e){
      setPageProgress('LOADED');
      toast.error('failed to submit, plz try again!');
    }
  };
  //control the alert window
  const handleAlertActionClick = ()=>{
    setShowAlert(false);
  };
  return {
    books,
    pageProgress,
    showAlert,
    top4Books,
    totalNumber,
    unSucceedBooks,
    countsOfSelectedBooks,
    handleSubmit,
    handleBookCardChange,
    handleAlertActionClick
  }
};
export default useBooks;