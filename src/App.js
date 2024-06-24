import { useState } from 'react';
import css from './app.module.css';

export function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueVaild = error === '' && value !== '';

	function onInputButtonClick() {
		const promptValue = prompt();

		if (!promptValue) return;

		if (promptValue.length < 3) {
			setValue('');
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	}

	function onAddButtonClick() {
		if (value < 3) return;

		setList([...list, createNewItem()]);
		setError('');
		setValue('');
	}

	function createNewItem() {
		const now = new Date().toISOString();
		const date = now.slice(0, 10).replaceAll('-', '.');
		const time = now.slice(11, 19);

		return {
			id: Date.now(),
			value,
			date: `${date} ${time}`,
		};
	}

	return (
		<div className={css['app']}>
			<h1 className={css['page-heading']}>Ввод значения</h1>
			<p className={css['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={css['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={css['error']}>{error}</div>}
			<div className={css['buttons-container']}>
				<button className={css['button']} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={css['button']} onClick={onAddButtonClick} disabled={!isValueVaild}>
					Добавить в список
				</button>
			</div>
			<div className={css['list-container']}>
				<h2 className={css['list-heading']}>Список:</h2>
				{!list.length ? (
					<p className={css['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={css['list']}>
						{list.map((item) => (
							<li className={css['list-item']} key={item.id}>
								{item.value} | {item.date}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
