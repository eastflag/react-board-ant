import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Board} from "../../dto/Board";
import './BoardList.scss';

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

    </>
  );
};

export default BoardList;
