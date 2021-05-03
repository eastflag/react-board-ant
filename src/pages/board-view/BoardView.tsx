import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Board} from "../../dto/Board";
import CommentList from "../../components/CommentList";

const MyComponent = ({match, history}: any) => {
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });
  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  const handleDelete = async () => {
    const res = await axios.delete(`/api/board?id=${match.params.id}`);
    setShow(false);
    history.goBack();
  }

  return (
    <>

    </>
  );
};

export default MyComponent;
