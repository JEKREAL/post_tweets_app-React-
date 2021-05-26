import React from 'react'
import {motion } from "framer-motion"

const containerStyle={
    position: "relarive",
    width: "3rem",
    hieght: "3rem",
    
}

const circleStyle = {
    display:"block",
    width: "3rem",
    hieght: "3rem",
    border: '0.5rem solid #e9e9e9',
    borderTop: "0.5rems solid #3498db",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    left: "1000px",
    top: "163px"
}

const spinTransition = {
    loop: Infinity,
    duration: 1,
    ease: "linear"
}

export default function CircleLoader() {
    return <div style={containerStyle}>
        <motion.span style={circleStyle} 
        animate={{rotate:360}}
        transition={spinTransition}/>
    </div>
}
