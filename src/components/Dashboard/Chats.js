import React, { useState } from "react";
import { TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import MyChatList from "./MyChatList";
import NewChats from "./NewChats";
import ScheduleModal from "../miscellaneous/ScheduleModal";

const Chats = () => {
  const [activeTab, setactiveTab] = useState(0);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button className="bg-red-500 rounded px-4 py-2" onClick={openModal}>
        Schedule
      </button>
      <ScheduleModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

      <Tabs
        isFitted
        variant="enclosed"
        w={{ base: "95vw", md: "100%" }}
        index={activeTab}
        colorScheme="purple"
        h={"100%"}
      >
        <TabPanels>
          <TabPanel
            py={1}
            mt={{ base: 2, md: 0 }}
            px={2}
            w={{ base: "96vw", md: "29vw" }}
            borderRightWidth={{ base: "0px", md: "1px" }}
            h={{
              base: "85vh",
              md: "88.5vh",
            }}
          >
            <MyChatList setactiveTab={setactiveTab} />
          </TabPanel>
          {/* <TabPanel
            mt={{ base: 2, md: 0 }}
            px={{ base: 0, md: 2 }}
            w={{ base: "96vw", md: "29vw" }}
            // h={{ base: "80vh", md: "88.5vh" }}
            borderRightWidth={{ base: "0px", md: "1px" }}
          >
            <NewChats setactiveTab={setactiveTab} />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Chats;
