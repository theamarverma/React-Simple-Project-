import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from '../USERS/AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
const AddUsers = (props) => {
	const [username, setUserName] = useState('');
	const [age, setAge] = useState('');
	const [error, setError] = useState();
	const addUserHandler = (event) => {
		event.preventDefault();
		if (username.trim().length === 0 || age.trim().length === 0) {
			setError({
				title: 'Invalid Input',
				message: 'Please enter a valid name and age (non-empty value).',
			});
			return;
		}
		if (+age < 1) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (>0).',
			});
			return;
		}
		props.onAddUser(username, age);
		setUserName('');
		setAge('');
	};
	const usernameChanged = (e) => {
		setUserName(e.target.value);
	};
	const ageChanged = (e) => {
		setAge(e.target.value);
	};
	const errorHandler = () => {
		setError(null);
	};

	return (
		<div>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={usernameChanged}
					/>
					<label htmlFor="age">Age (years)</label>
					<input
						id="age"
						type="number"
						value={age}
						onChange={ageChanged}
					/>
					<Button type="submit">Add user</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUsers;
