import React from 'react'
import uuid from 'react-uuid'
import TweetContext from './TweetContext'


export default function AddTweets() {
    return (<TweetContext.Consumer>{tweetsFromServ => tweetsFromServ.map(tweet => {
        return <li id="tweet" key={uuid()}>
            <p id="date">{tweet.date}</p>
            <p id="name">{tweet.userName}</p>
            <p id="text"> {tweet.content}</p>
        </li>
    })}
        </TweetContext.Consumer>)
}