import React from 'react'
import uuid from 'react-uuid'
import TweetContext from './TweetContext'

export default function AddTweet() {
    return <TweetContext.Consumer>{myTweets => myTweets.map(note_obj => {
        return <li id="tweet" key={uuid()}>
            <p id="date">{note_obj.currentDateTime}</p>
            <p id="name">123</p>
            <p id="text"> {note_obj.myTweetText}</p>
        </li>
    })}</TweetContext.Consumer>
}