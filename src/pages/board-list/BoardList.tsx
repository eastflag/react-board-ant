import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Board} from "../../dto/Board";
import './BoardList.scss';
import {Button, Col, Row} from "antd";

const BoardList: React.FC = (props: any) => {
  // console.log(props);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    getBoardList();
  }, []);

  const getBoardList = async () => {
    // res는 http response의 header + body를 모두 갖고 있다.
    const res  = await axios.get('/api/boards');
    console.log(res);
    setBoardList(res.data);
  }

  return (
    <>
      <Row justify="end" className="register-button">
        <Col>
          <Button type="primary" onClick={() => props.history.push('/board-register')}>등 록</Button>
        </Col>
      </Row>
      {
        boardList.map((board: Board)=>
          <Row justify="space-between" className="board" onClick={() => props.history.push(`/board-view/${board.id}`)}>
            <Col span={18}>{board.title}</Col>
            <Col>
              <span>{board.created}</span>
            </Col>
          </Row>)
      }
    </>
  );
};

export default BoardList;
