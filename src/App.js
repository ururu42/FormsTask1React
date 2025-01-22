import styles from './App.module.css'; // декларативный стиль
import { useForm } from 'react-hook-form';

const sendFormDataToConsole = (formdata) => {
	console.log(formdata);
};

export const App = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
	});

	const emailProps = {
		minLength: { value: 3, message: 'Ошибка. Должно быть не меньше 3 символов' },
		maxLength: {
			value: 25,
			message: 'Неверный email. Должно быть не больше 20 символов',
		},
		pattern: {
			value: /^[\w_.@]*$/,
			message:
				'Неверный email. Допустимые символы: буквы, цифры, нижнее подчеркивание и @',
		},
	};

	const passwordProps = {
		minLength: { value: 3, message: 'Ошибка. Должно быть не меньше 3 символов' },
		maxLength: {
			value: 20,
			message: 'Неверный пароль. Должно быть не больше 20 символов',
		},
		pattern: {
			value: /^[\w_]*$/,
			message:
				'Неверный email. Допустимые символы: буквы, цифры, нижнее подчеркивание и @',
		},

		validate: {
			isSamePassword: (repeatPassword) => {
				if (watch('password') !== repeatPassword) {
					return 'Пароли не совпадают. Проверьте правильность ввода паролей.';
				}
			},
		},
	};

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(sendFormDataToConsole)}>
				{emailError && <div className={styles.errors}>{emailError}</div>}
				<label type="text" name="email">
					Введите email:
				</label>
				<input
					type="text"
					name="email"
					placeholder="Почта"
					{...register('email', emailProps)}
				/>
				{passwordError && <div className={styles.errors}>{passwordError}</div>}
				<label type="password" name="password">
					Введите пароль:
				</label>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password', passwordProps)}
				/>
				{repeatPasswordError && (
					<div className={styles.errors}>{repeatPasswordError}</div>
				)}
				<label type="password" name="repeat-password">
					Повторите пароль:
				</label>
				<input
					type="password"
					name="repeat-password"
					placeholder="Пароль"
					{...register('repeatPassword', passwordProps)}
				/>
				{isValid && (
					<button
						type="submit"
						disabled={
							!!emailError || !!passwordError || !!repeatPasswordError
						}
						autoFocus
					>
						Зарегистрироваться
					</button>
				)}
				{!isValid && (
					<button
						type="submit"
						disabled={
							!!emailError || !!passwordError || !!repeatPasswordError
						}
					>
						Зарегистрироваться
					</button>
				)}
			</form>
		</div>
	);
};
