"use client"
import React, { useState, useEffect } from 'react';
import AddUserForm from '../../components/addUserForm/AddUserForm';
import styles from "./app.module.scss"

const UsersTable = () => {
  const [users, setUsers] = useState()
   

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7006/api/users');
        const data = await response.json();
        setUserNames(data);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7006/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserNames(data);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };
  


  const handleAddUser = (newUser) => {
    const newUserWithId = { ...newUser, id: {phone} };
    setUsers((prevUsers) => [...prevUsers, newUserWithId]);
    setShowAddUserForm(false);
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsPopup(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setShowDetailsPopup(false);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
    setShowDetailsPopup(false);
  };

  const handleToggleAddUserForm = () => {
    setShowAddUserForm((prev) => !prev);
  };



  return (
    <div className={styles.app}>
      <h1 className={styles.h1}>Adresy użytkowników</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Imię</th>
            <th className={styles.th}>Nazwisko</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {userNames.map((user) => (
           <tr key={user.id}>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.surname}</td>
              <td className={styles.td}>
                <div className={styles.button} onClick={() => handleShowDetails(user)}>Szczegóły</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.button} onClick={handleToggleAddUserForm}>Dodaj użytkownika</div>

      {showAddUserForm && <AddUserForm onAddUser={handleAddUser} />}

      {showDetailsPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.userDetailsTitle}>User Details</div>
            <div className={styles.wrapper}>
              <div className={styles.textWrapper}>
                Imię: {selectedUser.firstName}
              </div>
              <div className={styles.textWrapper}>
                Nazwisko: {selectedUser.lastName}
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
                <div className={styles.button} onClick={() => handleDeleteUser(selectedUser.id)}>Usuń użytkownika</div>
                <div className={styles.button} onClick={handleClosePopup}>Zamknij</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
