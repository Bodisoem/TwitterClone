import React from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function PostCard({ post: { body, createdAt, id, username, likeCount, likes, commentCount, comments } }) {

    function likePost() {
        console.log("like post");
    }

    function commentOnPost() {
        console.log("Comment on Post")
    }
    return ( <
        Card fluid >
        <
        Image src = ''
        wrapped ui = { false }
        /> <
        Card.Content >
        <
        Card.Header > { username } < /Card.Header> <
        Card.Meta as = { Link }
        to = { `/posts/${id}` } > { moment(createdAt).fromNow(true) } <
        /Card.Meta> <
        Card.Description > { body } <
        /Card.Description> <
        /Card.Content> <
        Card.Content extra >
        <
        Button as = 'div'
        labelPosition = 'right'
        onClick = { likePost } >
        <
        Button color = 'teal'
        basic >
        <
        Icon name = 'heart' / >
        <
        /Button> <
        Label basic color = 'teal'
        pointing = 'left' > { likeCount } <
        /Label> <
        /Button> <
        Button as = 'div'
        labelPosition = 'right'
        as = { Link }
        to = { `/posts/${id}` } >
        <
        Button color = 'blue'
        basic >
        <
        Icon name = 'comments' / >
        <
        /Button> <
        Label basic color = 'blue'
        pointing = 'left' > { commentCount } <
        /Label> <
        /Button> <
        /Card.Content> <
        /Card>
    )
}

export default PostCard;