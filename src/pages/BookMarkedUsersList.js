import * as React from "react";
import { useState } from "react";
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
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from "react-redux";
import { removeBookMark } from "../redux/action";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

  // Access bookmarked users' data from Redux store state
  const bookmarkedUsers = useSelector((state) => state.bookMarkedUser);
  const dispatch = useDispatch(); // Get dispatch function from Redux

  // Filter bookmarked users based on search term
  const filteredUsers = bookmarkedUsers?.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate index of the first and last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // Handle unbookmarking user
  const handleUnBookmark = (userId) => {
    dispatch(removeBookMark(userId));
  };

  return (
    <>
      {/* Search input */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          mb: "15px",
        }}
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
            {currentUsers?.length > 0
              ? currentUsers.map((user) => (
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
                ))
              : <Typography variant="h6" align="center" color="textSecondary">
              No data found.
            </Typography>}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div
        className="pagination"
        style={{ marginTop: "20px", marginLeft: "750px", display: "flex" }}
      >
        {Array.from({
          length: Math.ceil(filteredUsers?.length / usersPerPage),
        })?.map((_, index) => (
          <Button
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
};

export default BookmarkedUsersList;
