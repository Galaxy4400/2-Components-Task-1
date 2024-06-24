import { useState } from 'react';
import styles from './app.module.css';

export function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false); // Я так и не понял как это сделать отдельной переменной. При рендеринге она затирается. Или это и имелось в виду, что надо создать дополнительное состояние?


	function onInputButtonClick() {
		const promptValue = prompt();

		if (!promptValue) return;

		if (promptValue.length < 3) {
			setIsValueVaild(false);
			setValue('');
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setIsValueVaild(true);
			setValue(promptValue);
			setError('');
		}
	}


	function onAddButtonClick() {
		if (value < 3) return;

		setList([...list, createNewItem()]);
		setError('');
		setValue('');
		setIsValueVaild(false);
	};


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
		<div className={styles['app']}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles['error']}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles['button']} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={styles['button']} onClick={onAddButtonClick} disabled={!isValueVaild}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{!list.length ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles['list']}>
						{list.map((item) => (
							<li className={styles['list-item']} key={item.id}>{item.value} | {item.date}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
