import React, { useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import "./table.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function OrderTable(props) {
  console.log(props);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.data, [props.data]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageSize } = state;

  useEffect(() => {
    setPageSize(5)
  }, [setPageSize])
  

  return (
    <>
      <div className="container">
        <h3>Order History</h3>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <br />
          <div class="d-flex justify-content-center">
            <div>
              {canPreviousPage && (
                <ArrowBackIosNewIcon onClick={() => previousPage()} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
            <div>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[2, 5, 10].map((pageSize) => (
                  <option key={pageSize} value={pageSize} >
                    Show {pageSize} Rows
                  </option>
                ))}
              </select>
              
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div>
              {canNextPage && (
                <ArrowForwardIosIcon onClick={() => nextPage()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderTable;
