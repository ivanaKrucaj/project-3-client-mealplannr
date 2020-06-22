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
            <p className='fixed-bottom' style={footerStyle}>Created by the Mealplannr &copy; {currentYear}</p>
        </>
    )
}

// added fixed-bottom to the footer, but might have to fixed that once I add more content to the pages