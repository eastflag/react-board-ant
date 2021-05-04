import React, {useEffect, useRef, useState} from 'react';
import {Board} from "../../dto/Board";
import axios from "axios";
import {Button, Form, Input, message} from "antd";

const BoardEdit: React.FC = ({match, history}: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(match);
    getBoard(match.params.id);
  }, []);

  const getBoard = async (id: string) => {
    const res = await axios.get(`/api/board/${id}`);
    console.log(res.data);
    form.setFieldsValue({
      title: res.data.title,
      content: res.data.content,
    });
  }

  const handleSubmit = (values: any) => {
    updateBoard(values);
  };

  const updateBoard = async (board: Board) => {
    const res = await axios.put('/api/board', board);
    console.log(res);
    if (res.status >= 200 && res.status < 300) {
      message.success('수정되었습니다.');
      history.push('/');
    } else {
      message.error('error happened.')
    }
  }

  return (
    <>
      <Form
        name="boardForm"
        layout="vertical"
        form={form}
        requiredMark={true}
        onFinish={handleSubmit}
      >
        <Form.Item label="제목" name="title" rules={[
          {
            required: true,
            message: '제목을 입력하세요',
          }
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="내용" name="content" rules={[
          {
            required: true,
            message: '내용을 입력하세요',
          }
        ]}>
          <Input.TextArea rows={15} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BoardEdit;
