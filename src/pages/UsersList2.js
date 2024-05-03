import { useEffect, useState } from 'react';
import axios from "axios";

const UsersList = () => {
  console.log("entering into unfoloowedd users")
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    useEffect(() => {
        const getUsers = async () =>{
            const users =await axios.get('https://api.github.com/users')
                console.log('users', users)
                setUsers(users?.data)
            }
        getUsers()
    },[])

      // Calculate index of the first and last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div>
        <table class="table-auto">
        <thead>
          <tr>
            <th>User Login Name </th>
            <th>Avtar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr> */}
           {users?.map(user => (
            <tr key={user.id}>
            <td>{user?.login}</td>
            <td><img height={50} width={50} src={user?.avatar_url} alt="user" /></td>
            <td>
                <button>Bookmarked User</button>
            </td>
          </tr> 
           ) )}
        </tbody>
      </table>
       {/* Pagination */}
       <div className="pagination">
       {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
         <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
       ))}
     </div>
   </div>
    )
}

export default UsersList;