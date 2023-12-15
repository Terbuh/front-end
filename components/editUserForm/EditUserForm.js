import React, { useState, useEffect } from 'react';
import styles from "../addUserForm//app.module.scss"

const EditUserForm = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:7006/api/users/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onSave(editedUser); // Aktualizacja danych w UsersTable
      onClose(); // Zamknięcie formularza edycji
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <div className={styles.userAddTitle}>Edytuj użytkownika</div>
      <div className={styles.labelsWrapper}>
        <label className={styles.label}>
          <div>Imię</div>
          <input
            className={styles.inputField}
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Nazwisko</div>
          <input
            className={styles.inputField}
            type="text"
            name="surname"
            value={editedUser.surname}
            onChange={handleInputChange}
          />
        </label>

        <label className={styles.label}>
          <div>Email</div>
          <input
            className={styles.inputField}
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Nr. Telefonu</div>
          <input
            className={styles.inputField}
            type="number"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Data Urodzenia</div>
          <input
            className={styles.inputField}
            type="date"
            name="birthDate"
            value={editedUser.birthDate}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles.button} onClick={handleSave}>Zapisz</div>
        <div className={styles.button} onClick={onClose}>Anuluj</div>
      </div>
    </div>
  );
};

export default EditUserForm;
