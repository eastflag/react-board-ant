import React from 'react';
import axios from 'axios';
import {Board} from "../../dto/Board";
import {Button, Form, Input, message} from "antd";

const BoardRegister: React.FC = (props: any) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);

    addBoard(values);
  };

  const addBoard = async (board: Board) => {
    const res = await axios.post('/api/board', board);
    console.log(res);

    if (res.status >= 200 && res.status < 300) {
      message.success('This is a success message');
      props.history.push('/');
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

export default BoardRegister;
