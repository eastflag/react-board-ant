import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Board} from "../../dto/Board";
import CommentList from "../../components/CommentList";
import {Button, Card, Row} from "antd";

const BoardView = ({match, history}: any) => {
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
      <Row justify="end" className="mb-3">
        <Button type="primary" onClick={() => history.push(`/board-edit/${match.params.id}`)}
          className="mr-2">수정</Button>
        <Button type="primary" danger onClick={() => handleShow()}>삭제</Button>
      </Row>
      <Card title={board.title}>
        <p>{board.content}</p>
      </Card>
      <Row justify="center" className="mt-3">
        <Button type="primary" ghost onClick={() => history.goBack()}>돌아가기</Button>
      </Row>
    </>
  );
};

export default BoardView;
