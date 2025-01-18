import { useState } from 'react';
import { useRef } from 'react';
import styles from './App.module.css'; // декларативный стиль

const sendFormDataToConsole = (formdata) => {
	console.log(formdata);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const [inputErrors, setInputErrors] = useState(null);

	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormDataToConsole({ email, password, repeatPassword });
	};

	const setFocusOnButton = (email, password, repeatPassword, inputErrors) => {
		console.log('focus?', {
			email,
			password,
			repeatPassword,
			inputErrors,
			submit: submitButtonRef.current,
		});
		if (
			email !== '' &&
			password !== '' &&
			repeatPassword === password &&
			inputErrors === null
		) {
			submitButtonRef.current.focus();
		}
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let newError = null;

		if (!/^[\w_.@]*$/.test(target.value)) {
			newError =
				'Неверный email. Допустимые символы: буквы, цифры, нижнее подчеркивание и @';
		} else if (target.value.length > 20) {
			newError = 'Неверный email. Должно быть не больше 20 символов';
		}

		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(target.value, password, repeatPassword, newError);
		});
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчеркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный пароль. Должно быть не больше 20 символов';
		}

		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(email, target.value, repeatPassword, newError);
		});
	};

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);

		console.log('repeat password', target.value);

		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчеркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный пароль. Должно быть не больше 20 символов';
		}

		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(email, password, target.value, newError);
		});
	};

	const onBlur = ({ target }) => {
		let newError = null;
		if (target.value.length < 3) {
			newError = 'Ошибка. Должно быть не меньше 3 символов';
		} else if (
			target.value !== password &&
			password !== '' &&
			repeatPassword !== ''
		) {
			newError = 'Пароли неодинаковые. Проверьте правильность ввода пароля';
		}

		setInputErrors(newError);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={onSubmit}>
				{inputErrors && <div className={styles.errors}>{inputErrors}</div>}
				<label type="text" value={email}>
					Введите email:
				</label>
				<input
					type="text"
					value={email}
					placeholder="Почта"
					onChange={onEmailChange}
					onBlur={onBlur}
				/>
				<label type="password" value={password}>
					Введите пароль:
				</label>
				<input
					type="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					onBlur={onBlur}
				/>
				<label type="password" value={password}>
					Повторите пароль:
				</label>
				<input
					type="password"
					value={repeatPassword}
					placeholder="Пароль"
					onChange={onRepeatPasswordChange}
					onBlur={onBlur}
				/>
				<button ref={submitButtonRef} type="submit" disabled={inputErrors}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
