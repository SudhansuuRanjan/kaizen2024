import React from 'react'
import { Link } from 'react-router-dom'
import './CustomBtns.scss'

const CustomBtn1 = () => {
    return (
        <Link to="/basicregistration">
            <button className="custom-btn btn-11">KAIZEN - Basic Registration<div className="dot"></div></button>
        </Link>
    )
}

const CustomBtn2 = () => {
    return (
        <Link to="/events">
            <button className="custom-btn btn-14">Register for Competitions<div className="dot"></div></button>
        </Link>
    )
}

export { CustomBtn1, CustomBtn2 }