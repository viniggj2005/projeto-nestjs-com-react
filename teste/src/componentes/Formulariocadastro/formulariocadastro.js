import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Formulariocadastrouser.css'
import InputMask from 'react-input-mask';
import iziToast from 'izitoast';

const FormularioCadastroUser = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    date_of_birth: '',
    gender: '',
    cpf: '',
    phone: '+55',
    email: '',
    password: '',
    city: '',
    street:'',
    state:'',
    cep:'',
    numberhouse:'',
    image: null,
  });

  const [userCEP, setUserCEP] = useState('');


  const handleFileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormValues({ ...formValues, image: file });
  }, [formValues]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer(formValues);
  };
  const handleSuccess = () => {
    iziToast.success({
      title: 'Sucesso',
      message: 'Cadastrado com sucesso',
      timeout: 10000,
      onClosing: () => {
       // window.close();
      },
    });
  };

  const handleError = (error) => {
    console.error(error);
    iziToast.error({
      title: 'Erro',
      message: 'Ocorreu um erro durante o cadastro',
    });
  };

  const sendDataToServer = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('gender', data.gender);
    formData.append('cpf', data.cpf);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('city', data.city);
    formData.append('street', data.street);
    formData.append('state', data.state);
    formData.append('cep', data.cep);


    
    if (formValues.image!=null){
      formData.append('file', data.image);
    }

    formData.append('numberhouse', data.numberhouse);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        handleSuccess();
      })
      .catch(error => {
        console.error(error);
        handleError(error);
      });
  };
  const handleCEPChange = (e) => {
    const { value } = e.target;
    setFormValues({ ...formValues, cep: value });
  };
  const genderOptions = ['Masculino', 'Feminino', 'Outros'];
  const handleCEPBlur =async () => {
    const cep = formValues.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          throw new Error('CEP inválido');
        }

        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          state: data.uf,
          city: data.localidade,
          street: data.logradouro,
          cep: data.cep,
        }));
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: 'Erro',
          message: 'CEP inválido',
        });
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  {/*eu não sei*/}

  return (
    <div className="cadastro-usuario">
      <section className="section-cadastro">
      <div className="cadastro-nome">
      <h1 className="cadastro"> Cadastre-se! </h1>
      </div>
    <form className="form-user"  onSubmit={handleSubmit}>
      <h1 className="dados">Dados Pessoais</h1>
      <div className="div-nome">
      <label className="label-texto">
        Nome:
        </label>
        <input className="input-nome"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder='Insira seu nome'
        />
        </div>
      <div className="div-cpf">
      <label className="label-texto">
        CPF:
      </label>
        <InputMask
          mask="999.999.999-99"
          type="text" className="input-cpf"
          name="cpf"
          value={formValues.cpf}
          onChange={handleChange}
          placeholder='Insira seu CPF'
        />
        </div>
      <div className="div-telepone">
      <label className="label-texto">
        Telefone:
      </label>
        <InputMask
            mask="+99 (99) 99999-9999"
            name="phone" className="input-telepone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder='Insira seu telepone'
        />
        </div>
        <div className="div-email">
      <label className="label-texto">
        Email:
      </label> 
        <input className="input-email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder='Insira seu email'
        />
        </div>
        <div className="div-senha">
        <label className="label-texto">
        Senha:
      </label>
        <input className="input-senha"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder='Insira sua senha'
        />
        </div>
      {/* <div>
      <label>
        Gênero:
        <select className="gender-input" name="gender" value={formValues.gender} onChange={handleChange}>
          <option value="">Selecione</option>
          {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
          ))}
        </select>
      </label>
      </div> */}
      <div className="div-data">
      <label className="label-texto">
        Data de Nascimento:
        </label>
        <input className="input-data"
          type="date"
          name="date_of_birth"
          value={formValues.date_of_birth}
          onChange={handleChange}
        />
        </div>
      {/* <label>
      CEP:
        <InputMask
            mask="99999-999"
            type="text" className="input-campo"
            name="cep"
            value={formValues.cep}
            onChange={handleCEPChange}
            onBlur={handleCEPBlur}
        />
    </label>
      <label>
        Cidade:
        <input className="input-campo"
          type="text"
          name="city"
          value={formValues.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Rua:
        <input className="input-campo"
          type="text"
          name="street"
          value={formValues.street}
          onChange={handleChange}
        />
      </label>
      <label>
        Numero ou Apto:
        <input className="input-campo"
          type="text"
          name="numberhouse"
          value={formValues.numberhouse}
          onChange={handleChange}
        />
      </label>
      <label>
        Estado:
        <input className="input-campo"
          type="text"
          name="state"
          value={formValues.state}
          onChange={handleChange}
        />
      </label> */}
      {/* <div>
      <label className="texto-imagem">
        Imagem:
      </label>
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Arraste a imagem aqui...</p>
          ) : (
            <>
              {formValues.image ? (
                <img src={URL.createObjectURL(formValues.image)} alt="Imagem selecionada" />
              ) : (
                <p>Arraste e solte a imagem aqui ou clique para selecionar</p>
              )}
            </>
          )}
        </div>
        </div> */}
      
      <button className="button-login" type="submit">Cadastrar</button>
    </form>
    </section>
    </div>
  );
};

export default FormularioCadastroUser;


