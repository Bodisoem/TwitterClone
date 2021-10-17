import React, { useRef, useState, useContext } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import { Button, Form, Grid, Card, Label, Image, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton'

const FETCH_POST_QUERY = gql`
query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments {
                id body createdAt username
            }
            commentCount
        }
    }
`

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallBack() {
        props.history.push('/')
    }

    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post..</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image size='small' float='right' src='https://react.semantic-ui.com/images/avatar/large/molly.png'></Image>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button as='div' labelPosition='right' onClick={() => console.log("comment on Post")}>
                                    <Button basic color='blue'>
                                        <Icon name='comments'></Icon>
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='Comment..'
                                                name='comment'
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                                ref={commentInputRef} />
                                            <button type='submit' className='ui button teal' disabled={comment.trim() === ''}
                                                onClick={submitComment}>Comment</button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

export default SinglePost;