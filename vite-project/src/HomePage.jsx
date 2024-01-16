import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";
import user1 from "./assets/user1.jpg";
import user2 from "./assets/user2.jpg";
import user3 from "./assets/user3.jpg";

import user4 from "./assets/user4.jpg";

import user5 from "./assets/user5.jpg";

import user6 from "./assets/user6.jpg";
import user7 from "./assets/user7.jpg";

import user8 from "./assets/user8.jpg";
import user9 from "./assets/user9.jpg";
import user10 from "./assets/user10.jpg";

function HomePage() {
  const [user, setUser] = useState([
    {
      id: 1,
      img: user1,
      name: "Ethan Anderson",
      email: ": ethan.anderson@gmail.com",
    },
    {
      id: 2,
      img: user2,
      name: "Liam Miller",
      email: "lian430.miller@gmail.com",
    },
    { id: 3, img: user3, name: "Emily Johnson", email: "emily.450@gmail.com" },
    {
      id: 4,
      img: user4,
      name: "Olivia Smith",
      email: "olivia.smith@yahoo.com",
    },
    { id: 5, img: user5, name: "Peter Gross", email: "gross.peter@gmail.com" },
    { id: 6, img: user6, name: "Amelia Wilson", email: "amelia739@gmail.com" },
    {
      id: 7,
      img: user7,
      name: "Sophia Brown",
      email: "sophia.Brown@gmail.com",
    },
    { id: 8, img: user8, name: "Noah Wilson", email: "noah80@yahoo.com" },
    { id: 9, img: user9, name: "Jack Lame", email: "jacky56@gmail.com" },
    { id: 10, img: user10, name: "Rose Louis", email: "rose10@yahoo.com" },
  ]);

  const [showList, setShowList] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState();

  //to make the list appear and disapaear by clicking the "add user"

  const handleDropdown = () => {
    setShowList(!showList);
  };

// when i select the user from dropdown it should accordingly get set inside the selected user and also setFiltered user

  const handleUserSelect = (name) => {
    //before adding new user we lll remove the applied highlights from selected user (when backspace was pressed)
  const selectedUserElements = document.querySelectorAll(".selectedUser");
  selectedUserElements.forEach((element) => {
    element.classList.remove("highlight");
  });
    setSelectedUsers([...selectedUsers, name]);
    setFilteredUsers([...filteredUsers, name]);
    setTypeSearch(""); //when user select someone then, typesearh will get empty
    setFilteredUsers(filteredUsers.filter((user) => user.name !== name));
  };

  console.log(selectedUsers);


  //useefect filter the user as user type anything
  useEffect(() => {
    if (typeSearch.trim() === "") {
      // If the search input is empty, show all users excluding the selected ones
      setFilteredUsers(user.filter((u) => !selectedUsers.includes(u.name)));
    } else {
      // If there's a search input, filter the users based on the input
      const filteredResults = user.filter(
        (u) =>
          u.name.toLowerCase().includes(typeSearch.toLowerCase()) &&
          !selectedUsers.includes(u.name)
      );
      setFilteredUsers(filteredResults);
    }
  }, [typeSearch, selectedUsers, user]);


  // this logic here holds -> when backspace is pressed once it should simply sleect the last child and highlight
  //but if the backspace is pressed twice it should remove and put bakc to the list of dropdown
  let countKey = 0;
  const handleBackspace = (e) => {
    if (e.key === "Backspace" && countKey === 0) {
      countKey = 1;
      if (typeSearch === "" && selectedUsers.length > 0) {
        // Highlight the last chip when countKey is 1
        const selectedUserElements = document.querySelectorAll(".selectedUser");
      if (selectedUserElements.length > 0) {
        const lastSelectedUserElement =
          selectedUserElements[selectedUserElements.length - 1];
        lastSelectedUserElement.classList.add("highlight");
      }
    }
    } else if (e.key === "Backspace" && countKey === 1) {
      countKey = 2;

      if (typeSearch === "" && selectedUsers.length > 0 && countKey === 2) {
        const lastSelectedUser = selectedUsers[selectedUsers.length - 1];
        setSelectedUsers(selectedUsers.slice(0, -1));
        setFilteredUsers((prevUsers) => [
          ...prevUsers.filter((user) => user.name !== lastSelectedUser),
        ]);
      } else if (typeSearch === "" && selectedUsers.length === 0) {
        const lastFilteredUser = filteredUsers[filteredUsers.length - 1]?.name;
        setSelectedUsers([...selectedUsers, lastFilteredUser]);
        setFilteredUsers(filteredUsers.slice(0, -1));
      }
    }
  };


  // removing the user when cross is pressed
  const handleRemoveUser = (name) => {
    if (selectedUsers.includes(name)) {
      // If the user is in selectedUsers, remove it
      setSelectedUsers(selectedUsers.filter((user) => user !== name));
      setFilteredUsers(selectedUsers.filter((user) => user !== name));
    } else {
      // If the user is not in selectedUsers, add it back
      setSelectedUsers([...selectedUsers, name]);
      setFilteredUsers([...filteredUsers, name]);
    }
  };

  
  //to always show drop down when user is typing
useEffect(() => {
    if (typeSearch.trim() !== '') {
        setShowList(true);
    } else {
        setShowList(false);
    }
}, [typeSearch]);



  return (
    <div className="homepage">
      <h1 className="pickUser">Pick Users</h1>
      {selectedUsers.length === 0 ? (
        <div className="input-section" onClick={handleDropdown}>
          {/* <p className='addUser'  onChange={(e) => setSearchQuery(e.target.value)}>Add new user</p> */}
          {/* <div className='line'></div> */}
          <input
            type="text"
            className="addUser"
            placeholder="Add new user"
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
          />
        </div>
      ) : (
        <div className="input-section-selected" onClick={handleDropdown}>
          {selectedUsers.map((selectedUser, index) => (
            <div key={index} className="selectedUser">
              <img
                src={user.find((u) => u.name === selectedUser)?.img}
                alt={selectedUser}
                className="selectedUser-img"
              />

              <p>{selectedUser} </p>
              <p className="x" onClick={() => handleRemoveUser(selectedUser)}>
                x
              </p>
            </div>
          ))}
          {/* <p className='addUser'  onChange={(e) => setSearchQuery(e.target.value)}>Add new user</p> */}
          <input
            type="text"
            className="addUser"
            placeholder="Add new user"
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            onKeyDown={handleBackspace}
          />
        </div>
      )}

      <div className="line"></div>

      {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

      {showList && (
        <div className="dropdown-container">
          {filteredUsers.map((i) => (
            <div
              key={i.id}
              className="each-item"
              onClick={() => handleUserSelect(i.name)}
            >
              <div className="imgAndName-div">
                <img src={i.img} alt={user.name} className="userImg" />
                <p className="userName">{i.name}</p>
              </div>
              <div className="email-div">
                <p className="userEmail">{i.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
