import * as React from 'react';
import { useState } from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


const BookmarkedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  
  const handleBookmark = (userId) => {
    console.log(userId)
    const userToBookmark = currentUsers.find((user) => user.id === userId);
    setBookmarkedUsers((prevState) => [...prevState, userToBookmark]);
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  };

  // Handle unbookmarking user
  const handleUnBookmark = (userId) => {
    const userToUnBookmark = bookmarkedUsers.find((user) => user.id === userId);
    setUsers((prevState) => [...prevState, userToUnBookmark]);
    setBookmarkedUsers((prevState) =>
      prevState.filter((user) => user.id !== userId)
    );
  };
    return (
        <>
          {/* Search input */}
          {/* <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          /> */}
    
          <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300, mb: '15px' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>User Login</StyledTableCell>
                  <StyledTableCell>Avatar</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookmarkedUsers.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.login}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <img
                        height={50}
                        width={50}
                        src={user?.avatar_url}
                        alt="user"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleUnBookmark(user.id)}
                      >
                        UnBookmark
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({
              length: Math.ceil(filteredUsers.length / usersPerPage),
            }).map((_, index) => (
              <Button
                // sx={{mt: '20px', gap: '10px'}}
                variant="outlined"
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      );
}

export default BookmarkedUsersList