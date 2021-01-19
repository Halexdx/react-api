import React, { useState, useMemo } from 'react';
import Api from '../../services/api';
import camera from '../../assests/camera.svg';
import './style.css';

export default function New({ history }){
    const [photoshoot, setPhotoShoot] = useState('');
    const [packs, setPacks] = useState('');
    const [price, setPrice] = useState('');
    const [phototype, setPhotoType] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null
    },[thumbnail])

    async function handleSubmit(event) {
      event.preventDefault();

      const data = new FormData();
      const user_id = sessionStorage.getItem('user');

      data.append('thumbnail', thumbnail);
      data.append('photoshoot', photoshoot);
      data.append('phototype', phototype);
      data.append('packs', packs);
      data.append('price', price);

      await Api.post('/photoshoots', data , {
        headers: { user_id }
      })

      history.push('/dashboard');
    }

    return (
      <form onSubmit={handleSubmit}>
        <label 
          id="thumbnail" 
          style={{ backgroundImage: `url(${preview})` }}
          className={ thumbnail ? 'has-thumbnail' : ''}
          >
          <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
          <img src={camera} alt="Selecione uma imagem" width="30px"/>
        </label>

        <label htmlFor="photoshoot">NOME DO ENSAIO *</label>
        <input 
          id="photoshoot"
          placeholder="Seu ensaio incrível"
          value={photoshoot}
          onChange={event => setPhotoShoot(event.target.value)}
        />

        <label htmlFor="phototype">TIPO DE ENSAIO *</label>
        <input 
          id="phototype"
          placeholder="Seu tipo incrível ensaio"
          value={phototype}
          onChange={event => setPhotoType(event.target.value)}
        />

        <label htmlFor="packs">PACOTE * <span>(separados por vírgula)</span></label>
        <input 
          id="packs"
          placeholder="O que está incluso no pacote ?"
          value={packs}
          onChange={event => setPacks(event.target.value)}
        />

        <label htmlFor="price">VALOR DO ENSAIO * <span>(em branco para 'A combinar')</span></label>
        <input 
          id="price"
          placeholder="Valor cobrado pelo ensaio"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <button type="submit" className="btn"> Cadastrar </button>
      </form>
    )
}