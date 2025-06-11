import React from 'react'
import moveType from "../moveType.json";

const typeColor = {
  Normal: "#A8A77A", // Type: "Color" (por eso lo llamo typeColor; lo mismo se aplica a moveType)
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Unknown: "#68A090"
}

const TableRow = ({row, id}) => {
  return (
    <tr key={id}>
      {Object.entries(row).map(([key, value], i) => {
        if (key == "#") {
          return (
              <td key={i}>
                <img className="static" src={"pokemon_icons/png/" + value + ".png"}/>
                <img className="active" src={"pokemon_icons/gif/" + value + ".gif"}/>
              </td>
          );
        }
        if (key == "Item") {
          let imgName = value.toLowerCase().replace(/\s/g, '');
          return (
            <>
              <td key={i + '- img'}>
                <img src={"item_icons/" + imgName + ".png"} />
              </td>
              <td key={i}>
                {value}
              </td>
            </>
          );
        }
        if (Array.isArray(value)) { // las columnas que son arrays ("Moves", "EVs" y "Trainers") requieren un trato especial
          if (key === "Trainers") {
            return (
              <td key={i}>
                {value.join(", ")}
              </td>
            );
          } 
          else if (key === "Moves") {
            return (
              <>
                {value.map((move, idx) => {
                  const type = moveType[move];
                  const color = typeColor[type];
                  return (
                    <td key={i + '-' + idx} style={{backgroundColor: color, color: "white"}}>
                      {move}
                    </td>
                  );
                })}
              </>
            );
          }
          else { // en las columnas "Moves" y "EVs", debe crearse un <td> para cada elemento del array
            return value.map((item, idx) => (
              <td key={i + '-' + idx}>{item}</td>
            ));
          }
        } 
        else {
          return <td key={i}>{value}</td>;
        }
      })}
    </tr>
  )
}

export default TableRow