import React, { useState } from 'react';
import styles from "./app.css"

const AddUserForm = ({ onAddUser }) => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        latitude: 0,
        longitude: 0,
        email: '',
        phone: 0,
        birthDate: new Date().toISOString().split('T')[0]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
        const newUserWithId = { ...newUser };
        onAddUser(newUserWithId);
        setNewUser({
            firstName: '',
            lastName: '',
            latitude: 0,
            longitude: 0,
            email: '',
            phone: 0,
            birthDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div>
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
                    <div>Szerokość geograficzna</div>
                    <input
                        className={styles.inputField}
                        type="number"
                        name="latitude"
                        value={newUser.latitude}
                        onChange={handleInputChange}
                    />
                </label>
                <label className={styles.label}>
                    <div>Długość geograficzna</div>
                    <input
                        className={styles.inputField}
                        type="number"
                        name="longitude"
                        value={newUser.longitude}
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
                <div className={styles.button} onClick={handleAddUser}>Dodaj</div>
            </div>
        </div>
    );
};

export default AddUserForm;
