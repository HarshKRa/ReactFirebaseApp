import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../uitls/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use useCallback to prevent unnecessary recreation
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDocs(collection(db, "users"));
      const userList = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // ✅ Include fetchUsers as a dependency

  const handlePostNewUser = () => {
    navigate("/user");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers(); // ✅ Refresh the user list after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateUser = (id) => {
    navigate(`/user/${id}/edit`);
  };

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 2,
        }}
      >
        <Button variant="contained" color="success" onClick={handlePostNewUser}>
          <AddIcon /> Post New User
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          <LogoutIcon /> Logout
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                <h3>Loading...</h3>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateUser(user.id)}
                  >
                    <EditIcon />
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                    sx={{ marginLeft: 1 }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;
