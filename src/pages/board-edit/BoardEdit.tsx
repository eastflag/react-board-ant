import React, {useEffect, useRef, useState} from 'react';
import {Board} from "../../dto/Board";
import axios from "axios";

const BoardEdit: React.FC = ({match, history}: any) => {
  const [validated, setValidated] = useState(false);
  const [board, setBoard] = useState<Board>({
    title: '',
    content: ''
  });

  const setField = (field: string, value: string) => {
    setBoard({
      ...board,
      [field]: value
    })
  }

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    setBoard(res.data);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(false);
      return;
    }

    setValidated(true);
    // Form.Grou의 controlid는 control의 id를 생성 => form[id] => control 노드 로 접근
    console.log(form.titleInput.value);
    const board = {
      id: match.params.id,
      title: form.titleInput.value,
      content: form.contentText.value
    }
    updateBoard(board);


  };

  const updateBoard = async (board: Board) => {
    const res = await axios.put('/api/board', board);
    console.log(res);

    history.push('/');
  }

  return (
    <>
    </>
  );
};

export default BoardEdit;
