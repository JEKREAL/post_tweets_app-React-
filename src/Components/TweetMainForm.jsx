import React from "react"
import AddTweets from "./AddTweets";
import CircleLoader from "./CircleLoader"
import TweetContext from './TweetContext'
import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyAeug5clTeXyU3jIAtGlzjc7yd_0hYLJ2k",
    authDomain: "react-microbloging.firebaseapp.com",
    projectId: "react-microbloging",
    storageBucket: "react-microbloging.appspot.com",
    messagingSenderId: "641466367435",
    appId: "1:641466367435:web:333e781df00dbcb7468a4e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class TweetMainForm extends React.Component {
    static contextType = TweetContext
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            myTweetText: '',
            allTweets: [],
        }
    }

    componentDidMount(e) {
        this.setState({
            loading: true
        })
        const unsubscribe = firebase.firestore().collection('tweets').orderBy('date', 'desc').limit(10).onSnapshot(snap => {
            let tweets = snap.docs.map(doc => doc.data())
            this.setState({
                allTweets: tweets,
                loading: false
            })
        })
        return () => {
            unsubscribe()
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleClick = async (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let username;
        const user = this.context
        localStorage.getItem("username") ? username = await JSON.parse(localStorage.getItem("username")) : username = "Anonymus"
        const newTweet = {
            date: (new Date()).toISOString(),
            content: this.myTweetText.value,
            userName: username,
            id: user.authUser.uid,
        }
        this.myTweetText.value ? await firebase.firestore().collection('tweets').add(newTweet)
            : alert("Please enter any text")
        this.myTweetText.value = ''
    }

    inputChanging = (e) => {
        this.setState({
            myTweetText: e.target.value
        })
    }

    render() {
        const { loading } = this.state
        return (
            <>
                <div className="row"  >
                    <div className="col-md-4 col-md-offset-2" >
                        <textarea placeholder="What you have in mind..." ref={(ref) => this.myTweetText = ref}
                            className="form-control" id="input" value={this.state.myTweetText} onChange={this.inputChanging} />
                        <br />
                        <button disabled={this.state.myTweetText.length > 140} type="submit" className="btn btn-primary" id="tweetBtn"
                            onClick={this.handleClick}>Tweet</button>
                        {loading && <CircleLoader></CircleLoader>}
                        <p id="error140" style={this.state.myTweetText.length > 140 ? { display: 'flex' } : { display: 'none' }}>The tweet can't contain more then 140 chars.</p>
                    </div>
                    <ul id="note_container">
                        <TweetContext.Provider value={this.state.allTweets}>
                            <AddTweets />
                        </TweetContext.Provider>
                    </ul>
                    <br />
                </div>
            </>
        );
    }
}

export default TweetMainForm;