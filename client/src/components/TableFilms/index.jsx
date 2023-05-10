import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as Styled from '../TableUsers/styled';
import { useTable } from "react-table";
import DeleteTableRowButton from '../DeleteTableRowButton';


const TableFilms = ({ data, setDeleteFilm }) => {

   const columns = useMemo(
      () => [

         {
            Header: "ID",
            accessor: "id",
         },
         {
            Header: "Название",
            accessor: "film_title"
         },
         {
            Header: "Длительность",
            accessor: "film_runtime",
         },
         {
            Header: "Год выпуска",
            accessor: "year",
         },
         {
            Header: "Начало проката",
            accessor: "from_rent_date",
         },
         {
            Header: "Конец проката",
            accessor: "to_rent_date",
         },
         {
            Header: "Возраст",
            accessor: "age_limit",
         },
         {
            Header: "Удаление",
            accessor: "delete_id",
            Cell: ({ cell: { value } }) => <DeleteTableRowButton value={value} setDeleteFilm={setDeleteFilm} />
         }

      ], []
   );
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
   } = useTable({
      columns,
      data
   });

   return (
      <>
         <Styled.Table {...getTableProps()}>
            <thead>
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        <Styled.Th {...column.getHeaderProps()}>{column.render("Header")}</Styled.Th>
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
                           return <Styled.Td {...cell.getCellProps()}>{cell.render("Cell")}</Styled.Td>;
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </Styled.Table>
      </>
   )
}

export default TableFilms;