import React, { useEffect, useState } from "react";
import { Dropdown, Pagination, Table, Icon, Input } from "semantic-ui-react";
import { users } from "./users"; // Import the users array
import "./Home.css";

const Home = () => {
  const tableHeaders = [
    { key: "email", label: "Email", sortable: true },
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "country", label: "Country", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "gender", label: "Gender", sortable: true },
    { key: "occupation", label: "Occupation", sortable: true },
    { key: "hobby", label: "Hobby", sortable: true },
    { key: "hobby", label: "Hobby", sortable: true },
    { key: "hobby", label: "Hobby", sortable: true },
    { key: "hobby", label: "Hobby", sortable: true },
  ];
  const itemsPerPageOptions = [
    { key: 5, text: "5", value: 5 },
    { key: 10, text: "10", value: 10 },
    { key: 15, text: "15", value: 15 },
    { key: 20, text: "20", value: 20 },
  ];
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  const [activePage, setActivePage] = useState(1); // Current active page
  const [sortColumn, setSortColumn] = useState(null); // Current column to sort by
  const [sortDirection, setSortDirection] = useState(null); // Current sort direction
  const [filterValue, setFilterValue] = useState(""); // Filter input value

  const startIndex = (activePage - 1) * itemsPerPage; // Start index of the displayed items
  const endIndex = startIndex + itemsPerPage; // End index of the displayed items
  const displayedUsers = users.slice(startIndex, endIndex); // Users to display on the current page

  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    const table = document.querySelector(".sticky-column-table");
    const handleScroll = () => {
      const firstColumnCells = table.querySelectorAll(
        "tbody tr td:first-child"
      );
      const headerCells = table.querySelectorAll("thead tr th:first-child");

      firstColumnCells.forEach((cell, index) => {
        const headerCell = headerCells[index];
        cell.style.transform = `translateX(${table.scrollLeft}px)`;
        headerCell.style.transform = `translateX(-${table.scrollLeft}px)`;
      });
    };

    table.addEventListener("scroll", handleScroll);

    return () => {
      table.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePageChange = (event, { activePage }) => {
    setActivePage(activePage);
  };

  const handleItemsPerPageChange = (event, { value }) => {
    setItemsPerPage(value);
    setActivePage(1); // Reset to the first page when changing items per page
  };

  const handleSort = (clickedColumn) => {
    if (sortColumn === clickedColumn) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(clickedColumn);
      setSortDirection("ascending");
    }
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const sortedUsers = sortColumn
    ? [...displayedUsers].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortDirection === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      })
    : displayedUsers;

  const filteredUsers = filterValue
    ? sortedUsers.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    : sortedUsers;

  return (
    <div>
      <h3>Welcome to the Home page!</h3>
      <div className="filter-container">
        <Input
          icon="search"
          placeholder="Search..."
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <Table celled className="sticky-column-table" sortable>
            <Table.Header>
              <Table.Row>
                {tableHeaders.map((header) => (
                  <Table.HeaderCell
                    key={header.key}
                    sorted={sortColumn === header.key ? sortDirection : null}
                    onClick={() => header.sortable && handleSort(header.key)}
                  >
                    {header.label}
                    {header.sortable && (
                      <Icon
                        name={
                          sortColumn === header.key
                            ? sortDirection === "ascending"
                              ? "chevron up"
                              : "chevron down"
                            : "sort"
                        }
                      />
                    )}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((user) => (
                <Table.Row key={user.id}>
                  {tableHeaders.map((header, index) => (
                    <Table.Cell
                      key={header.key}
                      className={index === 0 ? "sticky-column" : ""}
                    >
                      {user[header.key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="pagination-container">
        <div className="items-per-page">
          <span>Items per Page:</span>
          <Dropdown
            compact
            selection
            options={itemsPerPageOptions}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </div>
        <div className="pagination">
          <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
