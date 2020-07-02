import React from 'react';
import './CSS/Footer.css';

export default function Footer() {
    let footerStyle = {
        padding: '18px 0 ',
        textAlign: 'center',
        backgroundColor: '#e9da5d',
        margin: '0',
        fontWeight: '400',
        fontSize: '13px'
    }

    let date = new Date();
    let currentYear = date.getFullYear();

    return (
        <>
            <p style={footerStyle}>Created by the Mealplannr &copy; {currentYear}</p>
        </>
    )
}
