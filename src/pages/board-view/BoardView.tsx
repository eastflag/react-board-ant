import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Board} from "../../dto/Board";
import CommentList from "../../components/CommentList";
import {Button, Card, message, Modal, Row} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const BoardView = ({match, history}: any) => {
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: '삭제',
      icon: <ExclamationCircleOutlined />,
      content: '삭제하시겠습니까?',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: handleDelete
    });
  }

  const handleDelete = async () => {
    const res = await axios.delete(`/api/board?id=${match.params.id}`);
    if (res.status >= 200 && res.status < 300) {
      message.success('삭제되었습니다.');
      history.goBack();
    } else {
      message.error('error happened.')
    }
  }

  return (
    <>
      <Row justify="end" className="mb-3">
        <Button type="primary" onClick={() => history.push(`/board-edit/${match.params.id}`)}
          className="mr-2">수정</Button>
        <Button type="primary" danger onClick={() => confirmDelete()}>삭제</Button>
      </Row>
      <Card title={board.title}>
        <p>{board.content}</p>
      </Card>
      <Row justify="center" className="mt-3">
        <Button type="primary" ghost onClick={() => history.goBack()}>돌아가기</Button>
      </Row>
      <CommentList board_id={match.params.id}></CommentList>
    </>
  );
};

export default BoardView;
