"use client";
import React, { useState, useEffect } from "react";
import AddUserForm from "../../components/addUserForm/AddUserForm";
import EditUserForm from "../../components/editUserForm/EditUserForm";
import styles from "./app.module.scss";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7006/api/users");
        const data = await response.json();
        setUserNames(data);
      } catch (error) {
        console.error("Error fetching user names:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:7006/api/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
      setUserNames(data);
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:7006/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData();
      setShowAddUserForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsPopup((prev) => !prev);
    setShowEditUserForm(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:7006/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData();
      setShowDetailsPopup(false);
      setShowEditUserForm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
    setShowDetailsPopup(false);
    setShowEditUserForm(false);
  };

  const handleToggleAddUserForm = () => {
    setShowAddUserForm((prev) => !prev);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserForm(true);
  };

  const handleCloseEditUserForm = () => {
    setShowEditUserForm(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.tableWrapper}>
        <h1 className={styles.h1}>Adresy użytkowników</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Imię</th>
              <th className={styles.th}>Nazwisko</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {userNames.map((user) => (
              <tr className={styles.tr} key={user.id}>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.surname}</td>
                <td className={styles.td}>
                  <div
                    className={styles.button}
                    onClick={() => handleShowDetails(user)}
                  >
                    Szczegóły
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.button} onClick={handleToggleAddUserForm}>
          Dodaj użytkownika
        </div>
      </div>
      <div className={styles.addUser}>
        {showAddUserForm && (
          <AddUserForm onAddUser={handleAddUser} fetchData={fetchData} />
        )}
      </div>
      <div className={styles.addUser}>
        {showDetailsPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <div className={styles.userDetailsTitle}>Szczegóły</div>
              <div className={styles.wrapper}>
                <div className={styles.textWrapper}>
                  Imię: {selectedUser.name}
                </div>
                <div className={styles.textWrapper}>
                  Nazwisko: {selectedUser.surname}
                </div>
                <div className={styles.textWrapper}>
                  Email: {selectedUser.email}
                </div>
                <div className={styles.textWrapper}>
                  Nr. tel: {selectedUser.phone}
                </div>
                <div className={styles.textWrapper}>
                  Data urodzenia: {selectedUser.birthDate}
                </div>
                <div className={styles.wrapperButtons}>
                  <div
                    className={styles.button}
                    onClick={() => handleEditUser(selectedUser)}
                  >
                    Edytuj
                  </div>
                  <div
                    className={styles.button}
                    onClick={() => handleDeleteUser(selectedUser.id)}
                  >
                    Usuń
                  </div>
                  <div className={styles.button} onClick={handleClosePopup}>
                    Zamknij
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showEditUserForm && (
        <EditUserForm
          user={selectedUser}
          onSave={(editedUser) => {
            const updatedUsers = users.map((u) =>
              u.id === editedUser.id ? editedUser : u
            );
            setUsers(updatedUsers);
            handleCloseEditUserForm();
          }}
          onClose={handleCloseEditUserForm}
        />
      )}
    </div>
  );
};

export default UsersTable;
