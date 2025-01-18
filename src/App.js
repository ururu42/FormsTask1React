import { useState } from 'react';
import { useRef } from 'react';
import styles from './App.module.css'; // декларативный стиль
import * as yup from 'yup';

const sendFormDataToConsole = (formdata) => {
	console.log(formdata);
};

const emailChangeScheme = yup
	.string()
	.matches(
		/^[\w_.@]*$/,
		'Неверный email. Допустимые символы: буквы, цифры, нижнее подчеркивание и @',
	)
	.max(20, 'Неверный email. Должно быть не больше 20 символов');

const passwordChangeScheme = yup
	.string()
	.matches(
		/^[\w_]*$/,
		'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчеркивание',
	)
	.max(20, 'Неверный email. Должно быть не больше 20 символов');

const validateAndGetErrorMessage = (schema, value) => {
	let errorMessage = null;

	try {
		schema.validateSync(value, { abortEarly: false });
	} catch ({ errors }) {
		errorMessage = errors.join('\n');
	}

	return errorMessage;
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

	const isSamePasswords = () => {
		if (repeatPassword !== password && password !== '' && repeatPassword !== '') {
			return false;
		} else {
			return true;
		}
	};

	const allInputBlurScheme = yup
		.string()
		.min(3, 'Ошибка. Должно быть не меньше 3 символов')
		.test(
			'isSamePasswords',
			'Пароли неодинаковые. Проверьте правильность ввода пароля',
			isSamePasswords,
		);

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

		const newError = validateAndGetErrorMessage(emailChangeScheme, target.value);

		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(target.value, password, repeatPassword, newError);
		});
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		const newError = validateAndGetErrorMessage(passwordChangeScheme, target.value);

		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(email, target.value, repeatPassword, newError);
		});
	};

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);

		const newError = validateAndGetErrorMessage(passwordChangeScheme, target.value);
		setInputErrors(newError);

		setTimeout(() => {
			setFocusOnButton(email, password, target.value, newError);
		});
	};

	const onBlur = ({ target }) => {
		const newError = validateAndGetErrorMessage(allInputBlurScheme, target.value);

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
