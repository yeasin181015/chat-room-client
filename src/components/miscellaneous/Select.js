import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const SelectRole = ({ user, setUpdateUser }) => {
  // Define state to hold the selected role
  const [selectedRole, setSelectedRole] = useState(user.role);

  // Handle change event
  const handleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    // if (newRole !== user.role) {
    console.log(user.id);
    setUpdateUser((prev) => [...prev, { id: user.id, role: newRole }]);
    // }
  };

  return (
    <Select width={150} value={selectedRole} onChange={handleChange}>
      <option value="admin">Admin</option>
      <option value="coordinator">Coordinator</option>
      <option value="cxo">CXO</option>
      <option value="user">User</option>
    </Select>
  );
};

export default SelectRole;
