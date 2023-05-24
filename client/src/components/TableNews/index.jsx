import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as Styled from '../TableUsers/styled';
import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import DeleteTableRowButton from '../DeleteTableRowButton';


const TableNews = ({ data, setDeleteNews }) => {
   const [filterInput, setFilterInput] = useState("");
   const [searchParams, setSearchParams] = useSearchParams();

   const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("news_title", value);
      setFilterInput(value);
   };

   const setEditNews = (value) => {
      searchParams.set('editNews', value);
      setSearchParams(searchParams);
   }

   const timeOptions = { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' };
   const columns = useMemo(
      () => [

         {
            Header: "ID",
            accessor: "id",
         },
         {
            Header: "Заголовок",
            accessor: "news_title"
         },
         {
            Header: "Тип шаблона",
            accessor: "news_template",
         },
         {
            Header: "Дата добавления",
            accessor: "created_at",
            Cell: ({ cell: { value } }) => {
               let date = new Date(value);
               date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
               return date.toLocaleTimeString('ru', timeOptions);
            }
         },
         {
            Header: "",
            accessor: "edit_id",
            Cell: ({ cell: { value } }) => <Styled.EditRowBtn onClick={() => setEditNews(value)}>Редактировать</Styled.EditRowBtn>
         },
         {
            Header: "",
            accessor: "delete_id",
            Cell: ({ cell: { value } }) => <DeleteTableRowButton value={value} setDeleteNews={setDeleteNews} />
         }

      ], []
   );
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      setFilter,
      pageOptions,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
   } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
   },
      useFilters,
      useSortBy,
      usePagination
   );

   return (
      <>
         <Styled.ContainerDiv >
            <Styled.SearchInput
               value={filterInput}
               onChange={handleFilterChange}
               placeholder={"Поиск по названию"}
            />
            <Styled.Table {...getTableProps()}>
               <Styled.Thead>
                  {headerGroups.map(headerGroup => (
                     <Styled.Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                           <Styled.Th {...column.getHeaderProps(column.getSortByToggleProps())}
                              className={
                                 column.isSorted
                                    ? column.isSortedDesc
                                       ? "sort-desc"
                                       : "sort-asc"
                                    : ""
                              }
                           >
                              {column.render("Header")}</Styled.Th>
                        ))}
                     </Styled.Tr>
                  ))}
               </Styled.Thead>
               <Styled.Tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                     prepareRow(row);
                     return (
                        <Styled.Tr {...row.getRowProps()}>
                           {row.cells.map(cell => {
                              return <Styled.Td {...cell.getCellProps()}>{cell.render("Cell")}</Styled.Td>;
                           })}
                        </Styled.Tr>
                     );
                  })}
               </Styled.Tbody>
            </Styled.Table>
            {data.length >= 8 &&
               <Styled.PaginationDiv>
                  <Styled.PaginationButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                     {'<<'}
                  </Styled.PaginationButton>{' '}
                  <Styled.PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                     {'<'}
                  </Styled.PaginationButton>
                  <Styled.PaginationSpan>
                     Страница{' '}
                     <Styled.PaginationStrong>
                        {pageIndex + 1} из {pageOptions.length}
                     </Styled.PaginationStrong>{' '}
                  </Styled.PaginationSpan>
                  <Styled.PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
                     {'>'}
                  </Styled.PaginationButton>{' '}
                  <Styled.PaginationButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                     {'>>'}
                  </Styled.PaginationButton>{' '}

                  <Styled.PaginationSpan>
                     | Перейти на страницу:{'  '}
                     <Styled.PaginationInput
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                           const page = e.target.value ? Number(e.target.value) - 1 : 0
                           gotoPage(page)
                        }}
                     />
                     {' '} {'Показывать по:'}
                  </Styled.PaginationSpan>
                  <Styled.PaginationSelect
                     value={pageSize}
                     onChange={e => {
                        setPageSize(Number(e.target.value))
                     }}>
                     {[5, 10, 20].map(pageSize => (
                        <Styled.PaginationOption key={pageSize} value={pageSize}>
                           {pageSize}
                        </Styled.PaginationOption>
                     ))}
                  </Styled.PaginationSelect>
               </Styled.PaginationDiv>
            }
         </Styled.ContainerDiv >
      </>
   )
}

export default TableNews;