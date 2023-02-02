import React from 'react'

export default function IsLoggedIn() {
    const temp = localStorage.getItem('username');
  return (
    <div>IsLoggedIn</div>
  )
}
