import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import Api from '../../services/api';

import './style.css';

export default function Dashboard(){
    const [photoshoots, setPhotoShoots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = sessionStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333',{
      query: { user_id },
    }), [user_id]);

    useEffect(() => {
      socket.on('booking_request', data =>{
        setRequests([...requests, data]);
      })
    }, [requests, socket]);

    useEffect(() => {
        async function loadPhotoShoot(){
            const user_id = sessionStorage.getItem('user');
            const response = await Api.get('/dashboard', {
                headers: { user_id }
            });

            setPhotoShoots(response.data);
        }

        loadPhotoShoot();
    }, []);

    async function handleAccept(id){
      await Api.post(`/bookings/${id}/approvals`);
      setRequests(requests.filter( request => request._id !== id));
    }

    async function handleReject(id){
      await Api.post(`/bookings/${id}/rejections`);
      setRequests(requests.filter( request => request._id !== id));
    }

    return (
      <>
        <ul className="notifications">
          {requests.map(request => (
            <li key={request._id}>
              <p>
              <strong>{request.user.email} </strong> está solicitando uma reserva de  
              <strong>  {request.photoshoot.photoshoot}</strong> para a data:  <strong>{request.date}</strong>
              </p>
              <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
              <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
            </li>
          ))}
        </ul>
        <ul className="photo-shoot-list">   
          {photoshoots.map( item => (
            <li key={item._id}>
              <header style={{ backgroundImage: `url(${item.thumbnail_url})` }} />
              <strong className="title">{item.photoshoot}</strong>
              <span><strong>Tipo:</strong> {item.phototype}</span>
              <span><strong>Pacote:</strong> {item.packs.toString()}</span>
              <span>{item.price ? `R$${item.price}` : 'a combinar'}</span>
            </li>
          ))}
        </ul>

        <Link to="/new" className="btn">
          <span>Cadastrar novo Ensaio </span>
        </Link>
      </>
    )
}