import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedUsers, setBookmarkedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
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

  // Handle bookmarking user
  const handleBookmark = (userId) => {
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
    <div>
      <h2>Users</h2>
      <Button variant="contained">Hello world</Button>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table class="table-auto">
        <thead>
          <tr>
            <th>User Login Name </th>
            <th>Avtar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user?.login}</td>
              <td>
                <img height={50} width={50} src={user?.avatar_url} alt="user" />
              </td>
              <td>
                <button onClick={() => handleBookmark(user.id)}>
                  Bookmark
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {/* Pagination 
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div> */}
      {/* Pagination */}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredUsers.length / usersPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Bookmarked Users */}
      <h2>Bookmarked Users</h2>

      <table class="table-auto">
        <thead>
          <tr>
            <th>User Login Name </th>
            <th>Avtar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookmarkedUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user?.login}</td>
              <td>
                <img height={50} width={50} src={user?.avatar_url} alt="user" />
              </td>
              <td>
                <button onClick={() => handleUnBookmark(user.id)}>
                  UnBookmark
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
