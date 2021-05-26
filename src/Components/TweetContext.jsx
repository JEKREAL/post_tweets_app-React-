import React from 'react'

const TweetContext = React.createContext([{
    authUser: null,
    login:(authUser) => {},
    logout: () => {}
}
])

export default TweetContext;