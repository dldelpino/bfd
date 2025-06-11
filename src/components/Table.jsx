import React from 'react'
import TableRow from './TableRow'

const Table = ({rows, columns}) => {
  return (
    <table>
        <col width="45"/><col width="100"/><col width="45"/><col width="120"/><col width="120"/><col width="120"/><col width="120"/><col width="120"/><col width="70"/><col width="40"/><col width="40"/><col width="40"/><col width="40"/><col width="40"/><col width="40"/><col width="170"/><col width="85"/> {/* establecer manualmente la anchura de todas las columnas */ }
        <thead>
            <tr>
            {columns.map(key => {
                if (key == "Pokémon") {
                    return <th key={key} rowSpan={2} colSpan={2}>{key}</th>
                }
                if (key == "Item") {
                    return <th key={key} rowSpan={2} colSpan={2}>{key}</th>
                }
                if (key == "Moves") {
                    return <th key={key} rowSpan={2} colSpan={4}>{key}</th>
                }
                if (key == "EVs") {
                    return <th key={key} colSpan={6}>{key}</th>
                }
                return <th key={key} rowSpan={2}>{key}</th> // React necesita una key única para cada th; si no, devuelve un aviso en la consola
            })}
            </tr>
            <tr>
                <th>HP</th>
                <th>Atk</th>
                <th>Def</th>
                <th>SpA</th>
                <th>SpD</th>
                <th>Spe</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((row, id) => (
                <TableRow row={row} id={id} /> // id es el índice de cada set dentro del array
            ))}
        </tbody>
    </table>
  )
}

export default Table