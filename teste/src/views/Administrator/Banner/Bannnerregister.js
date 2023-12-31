import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import NavbarAdm from '../../../componentes/Adm/NavigationbarAdm/NavigationbarAdm';
import './Bannerregister.css'
import { Link } from 'react-feather';
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';
import { useNavigate } from 'react-router-dom';
const Bannerregister = () => {
  const [alt, setAlt] = useState('');
  const [link, setLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleAltChange = (event) => {
    setAlt(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleImageDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedImage); // Ajuste para o campo "file" do backend
      formData.append('alt', alt);
      formData.append('link', link);

      await axios.post(`${process.env.REACT_APP_HOST}/banners`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      iziToast.success({position: 'bottomRight',timeout: 5000,onClosed:navigate('/admin/bannerlist'),message:"Banner cadastrado com sucesso "
    })
    } catch (error) {
      iziToast.error({position: 'bottomRight',timeout: 5000,message:"Erro ao tentar cadastrar banner... "
    })
      console.error('Erro ao enviar o banner:', error);
    }
  };

  return (
      <>
        <NavbarAdm />
        <div className='form-move'>
        <form onSubmit={handleSubmit} className="form-banner">
          <h1 className="h1-banner">Cadastro Banner</h1>
          <div className="link-banner">
            <label htmlFor="link">Link do Banner:</label>
            <input placeholder="Insira link do banner..." type="text" className="input-link" id="link" value={link}onChange={handleLinkChange} />
            <label htmlFor="alt">Alt do Banner:</label>
            <input placeholder="Insira altura do banner..." type="text" className="input-link" id="alt" value={alt} onChange={handleAltChange} />
          </div>
          <div className="image-banner">
            <Dropzone onDrop={handleImageDrop}>
              {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/* <p className="texto-banner">Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem</p> */}
                    {selectedImage && (
                        <div className='ww'>
                          {/* <p>Imagem selecionada: {selectedImage.name}</p> */}
                          <img className="img-banner" src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada"/>
                        </div>
                    )}
                  </div>
              )}
            </Dropzone>
          </div>
          
          <div className="botao-alterar-banner">
            <button className="botao-banner" type="submit">Enviar</button>
          </div>
        </form>
        </div>
      </>
  );
};

export default Bannerregister;

