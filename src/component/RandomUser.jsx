import React, { useEffect, useState } from 'react'


export const RandomUser = () => {

  const [user, setUser ] = useState(null);
  

  useEffect(() => {
    //consumir api y tomar datos de la misma
    fetch("https://api.randomuser.me/")
    .then((res) => res.json())
    .then((data) => {
      const userData = {
        name: data.results[0].name.first,
        email: data.results[0].email,
        picture: data.results[0].picture.large,
        phone: data.results[0].phone,
        city: data.results[0].location.city,
        country: data.results[0].location.country,

      }
      //almacenar data en setuser
      setUser(userData);
    });
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      { user ? (<div className='col-lg-4'>
        <div className='card text-center'>
          <div className='card-header pt-2 pb-2'>
            <img src={user.picture} className='img-fluid rounded-circle' alt='profile'/>
          </div>
          <div className='card-body'>
            <h4 className='card-title'>{user.name}</h4>
            <p className='card-text'>{user.email}</p>
            <p className='card-text'>Phone: {user.phone}</p>
            <p className='card-text'>ciudad: {user.city}</p>
            <p className='card-text'>pais: {user.country}</p>

          </div>
        </div>
      </div>) : null}
    </div>
  )
}
