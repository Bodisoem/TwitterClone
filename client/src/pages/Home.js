import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount 
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    if (data) console.log(data);
    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading posts..</h1>
                ) : (
                    data.getPosts && data.getPosts.map((posts) => (
                        <Grid.Column key={posts.id} style={{ marginBottom: 20 }}>
                            <PostCard post={posts} />
                        </Grid.Column>

                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;