import Modal from "react-modal";
import { Input, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Select from "react-select";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const ScheduleModal = ({ modalIsOpen, setIsOpen }) => {
  const toast = useToast();
  const { role } = JSON.parse(localStorage.getItem("user"));
  const teamRef = useRef();

  const [name, setname] = useState("");
  const [options, setOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCreate = async () => {
    const temp = [];
    selectedOptions.forEach((option) => {
      const memberDetails = memberOptions.find(
        (member) => member.name === option.value
      );
      temp.push(memberDetails._id);
    });

    const data = {
      name,
      members: temp,
      role,
    };
    console.log(data);

    const response = await fetch(
      "http://localhost:5000/conversation/create-conversation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      toast({
        title: "Chat room scheduled",
        description: "Chat room scheduled for the selected users.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    }
  };

  const handleTeamChange = async () => {
    const selectedTeam = teamRef?.current?.value;

    const response = await fetch(
      `http://localhost:5000/user/team/${selectedTeam}?role=${role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const usersByTeam = await response.json();
    setMemberOptions(usersByTeam);

    const temp = [];

    usersByTeam.forEach((user) => {
      temp.push({
        label: user.name,
        value: user.name,
      });
    });

    setOptions(temp);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
      <div>I am a modal</div> */}
      <form>
        <Input
          type="text"
          placeholder="Group name"
          focusBorderColor="purple.500"
          onChange={(e) => setname(e.target.value)}
          required
        />
        <select width={150} onChange={handleTeamChange} ref={teamRef}>
          <option name="sd1">SD1</option>
          <option name="sd3">SD3</option>
        </select>
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleChange}
        />

        {/* <select width={150} onChange={handleClickMember}>
          {optionsMember.map((member) => (
            <option>{member.name}</option>
          ))}
        </select> */}
        {/* <pre>{JSON.stringify(selected)}</pre>
        <MultiSelect
          options={selectedMembers}
          value={selected}
          onChange={handleClickMember}
          labelledBy="Select"
        /> */}
      </form>
      <button onClick={handleCreate} className="bg-red-500 py-2 px-4 rounded">
        create
      </button>
      <button
        onClick={closeModal}
        className="bg-red-500 py-2 px-4 rounded ml-3"
      >
        close
      </button>
    </Modal>
  );
};

export default ScheduleModal;
