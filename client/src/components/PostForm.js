import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallBack, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(data);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
            });
            values.body = '';
        }
    })

    function createPostCallBack() {
        createPost();
    }
    return (
        <>
            <Form onSubmit={onSubmit} className='ui centered grid' >
                <h2> Create a post: </h2>
                <Form.Field >
                    <Form.Input placeholder="What's happening?"
                        name='body'
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                        style={{ width: 700 }}
                    />
                    <Button type='submit'
                        color='teal' >
                        Share
                    </Button>
                </Form.Field>
            </Form> {
                error && (
                    <div className='ui error message'
                        style={{ marginBottom: 20 }} >
                        <ul className='list' >
                            <li> {error.graphQLErrors[0].message} </li> </ul>
                    </div>
                )
            }
        </>
    )
}

export default PostForm;