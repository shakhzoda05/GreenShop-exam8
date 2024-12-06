import React from 'react'
import './style.css'

const Menubtn: React.FC = () => {
    return (
        <div className={`hamburger-lines md:hidden`}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
        </div>
    )
}

export default Menubtn
