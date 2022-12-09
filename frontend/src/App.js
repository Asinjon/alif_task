import { useState, useEffect, useRef } from "react";
import { getComments } from "./api/comments";
import CommentModal from "./components/CommentModal";
import Table from "./components/Table";
import {useSelector, useDispatch} from "react-redux";
import { addComment} from "./redux/features/commentsSlice.js";
import Toast from "./components/Toast";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const pagesRef = useRef();
  const [fetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState({message: ""});
  const [successMessage, setSuccessMessage] = useState({message: ""});
  const dispatch = useDispatch();


  useEffect(() => {
    if (fetching) {
      getComments(currentPage, (data, success, error) => {
        if (success) {
          console.log("data: " + JSON.stringify(data));
          const {data: {comments, pageCount}} = data;
          pagesRef.current = pageCount;
          console.log("comments: " + JSON.stringify(comments));
          setCurrentPage(prev => prev + 1);
          currentPageRef.current = currentPageRef.current + 1;
          dispatch(addComment(comments));
          setFetching(false);
        } else if (error) {
          setErrorMessage({message: data.message});
        }
      });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    let result = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
    if (result < 200 && currentPageRef.current <= pagesRef.current) {
      setFetching(true);
    }
  }

  return (
    <div>
      <CommentModal props={[{setSuccessMessage, setErrorMessage}]} />
      <Table />
      {errorMessage.message.length > 0 && <Toast props={[{description: errorMessage.message, classname: "danger"}]} />}
      {successMessage.message.length > 0 && <Toast props={[{description: successMessage.message, classname: "success"}]} />}
      {errorMessage.message.length === 0 && fetching && <h3>Loading...</h3>}
    </div>
  );
}

export default App;
