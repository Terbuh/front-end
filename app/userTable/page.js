"use client"
import React, { useState } from 'react';
import AddUserForm from '../../components/addUserForm/AddUserForm';
import styles from "./app.module.scss"

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      latitude: 51.505,
      longitude: -0.09,
      waypoints: [],
      email: 'john.doe@example.com',
      phone: '+1234567890',
      birthDate: '1990-05-15'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      latitude: 48.8566,
      longitude: 2.3522,
      waypoints: [],
      email: 'jane.doe@example.com',
      phone: '+0987654321',
      birthDate: '1988-11-22'
    },
    {
      firstName: 'Adam',
      lastName: 'Smith',
      latitude: 40.7128,
      longitude: -74.006,
      waypoints: [],
      email: 'adam.smith@example.com',
      phone: '+1122334455',
      birthDate: '1975-08-30'
    },
    {
      firstName: 'Emily',
      lastName: 'Johnson',
      latitude: 34.0522,
      longitude: -118.2437,
      waypoints: [],
      email: 'emily.johnson@example.com',
      phone: '+9876543210',
      birthDate: '1992-04-10'
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      latitude: 41.8781,
      longitude: -87.6298,
      waypoints: [],
      email: 'michael.brown@example.com',
      phone: '+3344556677',
      birthDate: '1983-12-18'
    },
    {
      firstName: 'Daniel',
      lastName: 'Davis',
      latitude: 51.5099,
      longitude: -0.118,
      waypoints: [],
      email: 'daniel.davis@example.com',
      phone: '+4455667788',
      birthDate: '1986-07-25'
    },
    {
      firstName: 'Sophia',
      lastName: 'Miller',
      latitude: 45.4215,
      longitude: -75.6994,
      waypoints: [],
      email: 'sophia.miller@example.com',
      phone: '+1122334455',
      birthDate: '1990-01-05'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

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
          {users.map((user, index) => (
            <tr key={index}>
              <td className={styles.td}>{user.firstName}</td>
              <td className={styles.td}>{user.lastName}</td>
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
