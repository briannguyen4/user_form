import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <UserForm/>, 
        document.getElementById("root"));
});