import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import { useTable } from "react-table";
import DeleteTableRowButton from '../DeleteTableRowButton';


const TableUsers = ({ data, setDeleteUser, userId }) => {

   const columns = useMemo(
      () => [

         {
            Header: "ID",
            accessor: "id",
         },
         {
            Header: "ФИО",
            accessor: "lastname"
         },

         {
            Header: "Почта",
            accessor: "email",
         },
         {
            Header: "Роль",
            accessor: "role",
         },
         {
            Header: "Удаление",
            accessor: "delete_id",
            Cell: ({ cell: { value } }) => {
               return (parseInt(userId) !== parseInt(value)) ? <DeleteTableRowButton value={value} setDeleteUser={setDeleteUser} /> : ' ';
            }
         },
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

export default TableUsers;