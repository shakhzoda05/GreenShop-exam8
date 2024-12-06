import React from 'react'
import './style.css'

const Loader:React.FC = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
