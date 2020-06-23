import React from 'react'

export default function Footer() {
    let footerStyle = {
        // margin: '40px 0 0',
        textAlign: 'center'
    }

    let date = new Date();
    let currentYear = date.getFullYear();

    return (
        <>
            <p style={footerStyle}>Created by the Mealplannr &copy; {currentYear}</p>
        </>
    )
}
