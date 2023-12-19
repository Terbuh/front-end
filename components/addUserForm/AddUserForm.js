import React, { useState } from "react";
import styles from "./app.module.scss";

const AddUserForm = ({ fetchData }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    birthDate: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:7006/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.firstName,
          surname: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          birthDate: newUser.birthDate,
        }),
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.userAddTitle}>Formularz</div>
      <div className={styles.labelsWrapper}>
        <label className={styles.label}>
          <div>Imię</div>
          <input
            className={styles.inputField}
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Nazwisko</div>
          <input
            className={styles.inputField}
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
          />
        </label>

        <label className={styles.label}>
          <div>Email</div>
          <input
            className={styles.inputField}
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Nr. Telefonu</div>
          <input
            className={styles.inputField}
            type="number"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          <div>Data Urodzenia</div>
          <input
            className={styles.inputField}
            type="date"
            name="birthDate"
            value={newUser.birthDate}
            onChange={handleInputChange}
          />
        </label>
        <div className={styles.button} onClick={handleAddUser}>
          Dodaj
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
