import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as Styled from '../TableUsers/styled';
import { useTable } from "react-table";
import DeleteTableRowButton from '../DeleteTableRowButton';


const TableFilmShows = ({ data, setDeleteFilmShow }) => {
   const timeOptions = { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' };
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
            Header: "Зал",
            accessor: "hall_title",
         },
         {
            Header: "Дата/время",
            accessor: "film_datetime",
            Cell: ({ cell: { value } }) => {
               let date = new Date(value);
               date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
               return date.toLocaleTimeString('ru', timeOptions);
            }
         },
         {
            Header: "Цена",
            accessor: "price",
         },
         {
            Header: "Удаление",
            accessor: "delete_id",
            Cell: ({ cell: { value } }) => <DeleteTableRowButton value={value} setDeleteFilmShow={setDeleteFilmShow} />
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

export default TableFilmShows;