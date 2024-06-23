import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Toast,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SelectRole from "../miscellaneous/Select";

const UsersTable = () => {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [updateUser, setUpdateUser] = useState([]);
  const [fetchRun, setFetchRun] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const fetchAllUsers = async () => {
      const response = await fetch(
        `http://localhost:5000/user/get-all-users?role=${loggedInUser.role}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const users = await response.json();

      if (users && users.length > 0) {
        const rowsData = [];
        users.forEach((user) => {
          rowsData.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          });
        });
        setRows(rowsData);
      }
    };

    fetchAllUsers();
  }, [fetch]);

  const handleUpdate = async () => {
    const roleUser = new Map();

    rows.forEach((user) => {
      roleUser.set(user._id, user.role);
    });

    const updatedRoleUsers = [];

    updateUser.forEach((user) => {
      if (user.role !== roleUser.get(user._id)) {
        updatedRoleUsers.push(user);
      }
    });

    const updatedSuccessful = await fetch(
      "http://localhost:5000/user/role-change",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updatedRoleUsers),
      }
    );

    if (updatedSuccessful.status == 200) {
      setFetchRun(!fetchRun);
      setUpdateUser([]);
      toast({
        title: "Role changed.",
        description: "You have updated the role of the registered users.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Users</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.length > 0 &&
              rows.map((user) => (
                <Tr>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <SelectRole user={user} setUpdateUser={setUpdateUser} />
                  {/* <Td>{user.role}</Td> */}
                </Tr>
              ))}
          </Tbody>
          {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
        </Table>
      </TableContainer>
      {updateUser.length > 0 && (
        <button className="bg-red-500 px-4 py-3 rounded" onClick={handleUpdate}>
          Save
        </button>
      )}
    </>
  );
};

export default UsersTable;
