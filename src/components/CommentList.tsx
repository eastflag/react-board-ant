import React, {createElement, useEffect, useState} from 'react';
import axios from "axios";
import "./CommentList.scss";
import {Comment, Avatar, Button, Form, Input, List, Tooltip} from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

interface Props {
  board_id: number;
}

const CommentList: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [submitting, setSubmitting] = useState(false);
  const [myLike, setMyLike] = useState(0);

  useEffect(() => {
    if (!props.board_id) {
      return;
    }

    getComments(props.board_id);
  }, [props.board_id]);

  const getComments = async (board_id: number) => {
    const res = await axios.get(`/api/comments?board_id=${props.board_id}`);
    setComments(res.data);
  }

  const handleSubmit = async (values: any) => {
    console.log(values);
    const comment = {
      board_id: props.board_id,
      content: values.content
    }

    setSubmitting(true);

    let res = await axios.post('/api/comment', comment);
    console.log(res);
    res = await axios.get(`/api/comment?id=${res.data.id}`);

    const newComments = [...comments];
    newComments.unshift(res.data);
    setComments(newComments);

    setSubmitting(false);
  };

  const like = (id: number) => {
    // 서버에 좋아요 추가/수정 후 전체 카운트 갱신
    setMyLike(1);
  }

  const dislike = (id: number) => {
    // 서버에 싫어요 추가/수정 후 전체 카운트 갱신
    setMyLike(-1);
  }

  return (
    <>
      {comments.length > 0 &&
        <List
          className="comment-list"
          header={`${comments.length} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment: any) => (
            <li>
              <Comment
                actions={[
                  <Tooltip key="comment-basic-like" title="Like">
                    <span onClick={() => like(comment.id)}>
                      {createElement(myLike === 1 ? LikeFilled : LikeOutlined)}
                      <span className="comment-action">30</span>
                    </span>
                  </Tooltip>,
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                    <span onClick={() => dislike(comment.id)}>
                      {React.createElement(myLike === -1 ? DislikeFilled : DislikeOutlined)}
                      <span className="comment-action">20</span>
                    </span>
                  </Tooltip>,
                  <span key="comment-basic-reply-to">Reply to</span>,
                ]}
                author={'user name'}
                avatar={<Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />}
                content={<p>
                  {comment.content}
                </p>}
                datetime={comment.created}
              />
            </li>
          )}
        />
      }
      <Comment content={
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="content" rules={[
            {
              required: true,
              message: '제목을 입력하세요',
            }
          ]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      }>

      </Comment>
    </>
  );
}

export default CommentList;
