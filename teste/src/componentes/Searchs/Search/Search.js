import React, { useState, useEffect, useRef } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Search.css';
import {BiMenu} from 'react-icons/bi';
import SearchModal from '../SearchModal/SearchModal';
import { useNavigate } from 'react-router-dom';
export const setValue = (valueToSet) => {
  Search.value = valueToSet;
}

const Search = () => {
  let value;
  const [searchValue, setSearchValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const relocate = () => {
    navigate(`/search/${searchValue}`)
    // window.location.href = 
  }

  const handleKeyDown = (event) => {
    if (searchValue && event.key === 'Enter') {
      relocate();
    }
    // if (event.key === 'ArrowDown') {
    //   console.log('pra baixo')
    //     event.preventDefault(); // Evita que a página role para baixo
    //     setSelectedSuggestion((prevSelected) =>
    //         prevSelected < 4 ? prevSelected + 1 : prevSelected // Atualize de acordo com o número máximo de sugestões (5 no seu caso)
    //     );
    // } else if (event.key === 'ArrowUp') {
    //   console.log('pra cima')
    //     event.preventDefault(); // Evita que a página role para cima
    //     setSelectedSuggestion((prevSelected) =>
    //         prevSelected > 0 ? prevSelected - 1 : prevSelected
    //     );
    //} else if (event.key === 'Enter') {
    //     event.preventDefault();
    //     // Aqui você pode definir o valor do campo de pesquisa com base na sugestão selecionada
    //     if (selectedSuggestion !== -1) {
    //         setSearchValue(products[selectedSuggestion].name); // Substitua 'products' pelo nome correto do seu estado de sugestões
    //     }
    // }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value?.trim().length > 0) performSearch(value);
  }

  const performSearch = (value) => {
    setSearchValue(value);
  }

  return (
    <>
      <div className="search">
        <div className="categories-toggle">
          <BiMenu className="categoria-icon"/>
        </div>
          <input 
            type="text"
            placeholder="Pesquisar:"
            className="search-input"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
          ></input>

          <a className="lupa-a">
            <BiSearchAlt className="lupa" onClick={relocate} />
          </a>
        </div>
      <SearchModal value={searchValue} selected={selectedSuggestion}/>
    </>
  );
};

export default Search;