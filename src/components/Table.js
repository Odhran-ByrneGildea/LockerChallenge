import React from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import styled from 'styled-components'

const StyledTable = styled.table`
  width:700px;

  table, th, td {
    border: 1px solid black;
    text-align: center;
  }
`
export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
            {
                id: 'Position',
                desc: false
            }
        ]
    }
    },
    useFilters, 
    useSortBy
  );

  return (
    <div>
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span> {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
    </div>
  );
}