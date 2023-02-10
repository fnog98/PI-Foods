import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return (
        <div>
            <div>
                <h1>PI FOOD HENRY - FACUNDO</h1>
                <Link to='/home'>
                    <button>ENTRY</button>
                </Link>
            </div>
        </div>
    )
};