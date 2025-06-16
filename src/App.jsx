import React, {useState, useEffect} from "react";
import setsData from "./sets.json"; // Ajusta la ruta si es necesario
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Header from "./components/Header";

const App = () => {
  const [search, setSearch] = useState(""); // [variable de estado, función que actualiza la variable de estado]
  const [filteredSets, setFilteredSets] = useState(setsData); // setsData es el valor inicial de filteredSets

  useEffect(() => {
      if (search.trim().length < 3) { // no muestro nada si la barra de búsqueda está vacía o tiene menos de tres caracteres
        setFilteredSets([]);
        return;
      } 
      const handler = setTimeout(() => { // setTimeout(() => {código para filtrar los sets}, tiempo después de dejar de escribir para ejecutar el código)
        const searchCriteria = search.split(",").map(c => c.trim().toLowerCase()).filter(c => c.length > 0); // si escribo "Gengar, Shadow Ball", los criterios de búsqueda son "gengar" y "shadow ball"
        setFilteredSets(
          setsData.filter(set =>
            searchCriteria.every(criterion =>
              Object.entries(set).some(([key, value]) => {
                if (key == "EVs") return false;
                if (typeof value === "string") {
                  return value.toLowerCase().includes(criterion);
                }
                if (Array.isArray(value)) {
                  return value.some(v => v.toLowerCase().includes(criterion))
                }
                return false; // si no se verifica ninguna condición de los ifs anteriores, se devuelve false
              })
            )
          )
        );
      }, 300); // espera 300ms tras dejar de escribir
      return () => clearTimeout(handler); // limpia el timeout si el usuario sigue escribiendo (cleanup function)
    }, [search]); // useEffect(función, array con las variables que se usan en la función)
  // sin useEffect, el código se ejecuta cada vez que se renderiza el componente, lo que puede causar problemas
  // al usar useEffect, el código se ejecuta solo cuando cambian las dependencias

  return (
    <>
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <Table 
        rows={(search.trim().length > 1 && filteredSets.length > 0) ? filteredSets : []}
        columns={Object.keys(setsData[0]).slice(1)} // Object.keys(setsData[0]) devuelve ["#", "Pokémon", "Item", ...]
      />
      {/* {search.trim().length > 1 && filteredSets.length > 0 && (
        <Table rows={filteredSets} columns={Object.keys(setsData[0]).slice(1)} /> 
      )} condición && (lo que ocurre si se verifica la condición) */}
    </>
  );
};

export default App;