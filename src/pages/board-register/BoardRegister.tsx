import React, {useState} from 'react';
import axios from 'axios';
import {Board} from "../../dto/Board";

const BoardRegister: React.FC = (props: any) => {
  const [validated, setValidated] = useState(false);

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
      title: form.titleInput.value,
      content: form.contentText.value
    }
    addBoard(board);
  };

  const addBoard = async (board: Board) => {
    const res = await axios.post('/api/board', board);
    console.log(res);

    props.history.push('/');
  }

  return (
    <>

    </>
  );
};

export default BoardRegister;
