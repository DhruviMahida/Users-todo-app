import axios from "axios";
const useUsersList = () => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users`);
      //   setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
};
export default useUsersList;
