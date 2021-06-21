import {
  useTable,
  usePagination,
  useAsyncDebounce,
  useFilters, // useFilters!
  useGlobalFilter,
} from "react-table";
import React, { useContext, useState } from "react";
import { matchSorter } from "match-sorter";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import { DataContext } from "../../DataContext";
import { PatientContext } from "../../PatientContext";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return <></>;
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, type, main }) {
  const [viewData, setViewData] = useContext(DataContext);
  const [patientData, setPatientData] = useContext(PatientContext);

  const datab = JSON.parse(window.localStorage.getItem("user-info"));

  const access_token = datab.data.token;

  async function deleteDoctor(id) {
    var result = await fetch(
      `http://54.169.205.249:3000/ohodr/api/admin/delete-doctor/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    result = await result.json();
    window.location.reload(false);
  }
  async function deleteSpeciality(id) {
    var result = await fetch(
      `http://54.169.205.249:3000/ohodr/api/admin/delete/speciality/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    result = await result.json();
    window.location.reload(false);
  }

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  async function viewDoctor(id) {
    try {
      const result = await authAxios.get(
        `http://54.169.205.249:3000/ohodr/api/admin/find-doctor/${id}`
      );
      setViewData(result.data.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function viewPatients(id) {
    try {
      const result = await authAxios.get(
        `http://54.169.205.249:3000/ohodr/api/admin/find-patient/${id}`
      );
      setPatientData(result.data.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  // localStorage.setItem("doctor-info", JSON.stringify(viewData));

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        className="table-auto w-full text-center ohodr-card"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="table-bottom-border"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="table-header-title">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
          <tr className="table-bottom-border hidden">
            <th
              colSpan={visibleColumns.length + 1}
              className="table-header-title"
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-bottom-border">
                {row.cells.map((cell) => {
                  return cell.column.id === "status" ? (
                    <td {...cell.getCellProps()}>
                      <h5
                        className={
                          cell.value === "New Patient"
                            ? "table-new-patient"
                            : cell.value === "Recovered"
                            ? "table-recovered"
                            : cell.value === "In Treatment"
                            ? "table-in-treatment"
                            : cell.value === "Available"
                            ? "table-available"
                            : "neither"
                        }
                      >
                        <BsDot className="inline text-xl" />
                        {cell.render("Cell")}
                      </h5>
                    </td>
                  ) : cell.column.id === "schedule" ? (
                    <td {...cell.getCellProps()} className="table-detail">
                      {cell.value > 0 ? (
                        <h5 className="table-schedule">
                          {cell.render("Cell")} Appointment
                        </h5>
                      ) : (
                        <h5 className="table-no-schedule">No Schedule</h5>
                      )}
                    </td>
                  ) : cell.column.id === "iconURL" ? (
                    <td {...cell.getCellProps()} className="table-detail">
                      <img src={cell.value} alt="" className="table-icon" />
                    </td>
                  ) : (
                    <td {...cell.getCellProps()} className="table-detail">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      {type === "patientDetail" ? (
        ""
      ) : (
        <div className="pagination mt-5 float-right">
          <button
            className=" pagination-button "
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className=" pagination-button "
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>
          <button
            className=" pagination-button "
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>
          <button
            className=" pagination-button "
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
          <span className="mx-3">
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span> | </span>
          <span className="mx-3">
            Go to page:
            <input
              type="number"
              className="pageination-box"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
          <select
            value={pageSize}
            className="pagination-select"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default Table;
