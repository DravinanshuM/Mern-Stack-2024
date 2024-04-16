import React from 'react'

const Footer = () => {
  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-12 p-0'>
          <footer style={{ 
            backgroundColor: "#333", 
            color: "#fff", 
            textAlign: "center",
            padding: "20px 0",
            position: "absolute",
            width: "100%"
            }}>
            <p>&copy; 2024 Mern Crud. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer