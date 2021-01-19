import React, { useState } from 'react';
import Api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await Api.post('/sessions', { email });

        const { _id } = response.data;

        sessionStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>
            Ofereça 
            <strong> melhores </strong>
            os  locais para seu ensaio 
            <strong> fotográfico </strong>
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                
                <input 
                id="email"
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={ event => setEmail(event.target.value)}
                />

                <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    )
}