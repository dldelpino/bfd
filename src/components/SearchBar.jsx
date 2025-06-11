import React from 'react'

const SearchBar = ({search, setSearch}) => {
  return (
    <div id="search-bar">
        <input
            type="text"
            spellCheck="false"
            placeholder="Search by Pokémon, item, move, trainer name, etc."
            value={search} // hace el texto introducido en el input sea la variable de estado search
            onChange={e => setSearch(e.target.value)} // cada vez que se escribe algo, se ejecuta esta función y la variable de estado search pasa a ser el texto escrito
            // e es el evento que se produce al cambiar el valor del input, e.target es el elemento donde tiene lugar el evento (en este caso, <input>), e.target.value devuelve la propiedad value del input, que es el texto que hay en el input en ese momento
        />
    </div>
  )
}

export default SearchBar