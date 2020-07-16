//объявление переменных начало

const btnCreateNewExpertise = document.querySelector('.btnCreateNewExpertise'); // кнопка создания новой экспертизы и возвращения к таблице

const inputRow2SecondCell7 = document.querySelector('.row2-second-cell7 input'); // ячейка окна новой экспертизы общее кол-во объектов
const inputRow2SecondCell8 = document.querySelector('.row2-second-cell8 input'); // ячейка окна новой экспертизы кол-во пол объектов
const inputRow2SecondCell9 = document.querySelector('.row2-second-cell9 input'); // ячейка окна новой экспертизы кол-во отр объектов
const btnCancelExp = document.querySelector('.btnCancelExp'); // кнопка Cancel окна новой экспертизы
const btnResetExp = document.querySelector('.btnResetExp'); // кнопка Reset окна новой экспертизы
const btnAddExp = document.querySelector('.btnAddExp'); // кнопка Add окна новой экспертизы

let dbOfExpertises;// переменная для получения базы данных

//объявление переменных конец
//----------------------------------------------------------------------
//объявление методов начало
const init = () => { // метод запуска приложения
	getDb();
}

//метод загрузки базы данных из файла и первый рендеринг БД в таблице
const getDb = () => {
	const request = new XMLHttpRequest();
	request.open('GET', 'src/db/dbExpertises.json', true);
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return;
		if (request.status === 200) {
			dbOfExpertises = JSON.parse(request.response);//помещение данных из файла в переменную
			dbOfExpertises = dbOfExpertises.map(el => {
				return new Expertise(el.id, el.dateOfReceipt, el.organAppointedExpertise, el.unitOforgan, el.officialPerson,
					el.nameOfficialPerson, el.byTheMaterials, el.number, el.article, el.byFact, el.typeOfResearch,
					el.expertName, el.prolongation, el.execution, el.notification, el.result, el.countObjectsTotal,
					el.countObjectsPositive, el.countObjectsNegative, el.notTaken, el.received);
			})
			renderDb(dbOfExpertises);//отрисовывание базы данных
		} else {
			console.error(request.status);
		}
	});
	request.send();
}

//метод сохранения экспертизы в базе данных и рендеринг БД в таблице
const setExpInDb = (exp) => {

	let exp7 = new Expertise('', '01.02.2020', 'ГСУ СК', 'Белогорский МСО', 'Ст. следовтель', 'Иванов. И.И.', 'УД',
		'11902350019000000', '161 Грабеж', 'общее', 'ДНК исследование', 'Ходырев Н.', '10.04.2020', '02.04.2020', '*', '+', '10', '5', '5', '*', '*');

	exp7.id = '7/' + (dbOfExpertises.length + 1);

	dbOfExpertises.push(exp7);

	const request = new XMLHttpRequest();
	request.open('POST', 'saveDb.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return;
		if (request.status === 200) {
			console.log(request.response);
			const status = request.response;//
			(status === 'ok') ? () => console.log(status) : () => console.log(status);
		} else {
			console.error(request.status);
		}
	});
	request.send('db=' + JSON.stringify(dbOfExpertises));

	renderDb(dbOfExpertises);
}

//метод рендеринга БД в таблице
const renderDb = (dbOfExpertises) => {
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	workspaseTable.textContent = '';

	const workspaseTableTitle = document.createElement('div');
	workspaseTableTitle.classList.add('container-main-workspase-table-title');

	const workspaseTableInner = document.createElement('div');
	workspaseTableInner.classList.add('container-main-workspase-table-inner');

	workspaseTableTitle.appendChild(showTitleInWorkspaseTable());

	workspaseTable.appendChild(workspaseTableTitle);
	workspaseTable.appendChild(addExpsInWorkspaseTable(workspaseTableInner, dbOfExpertises));

	const allRows = document.querySelectorAll('.container-main-workspase-table-inner-row-data');
	selectRow(allRows);
}

function showTitleInWorkspaseTable() {
	const rowData = document.createElement('div');
	rowData.classList.add('container-main-workspase-table-title-row');

	const cell1 = document.createElement('div');
	cell1.classList.add('container-main-workspase-table-title-row-cell', 'cell1');
	cell1.textContent = '№';
	rowData.appendChild(cell1);

	const cell2 = document.createElement('div');
	cell2.classList.add('container-main-workspase-table-title-row-cell', 'cell2');
	cell2.textContent = 'Дата';
	rowData.appendChild(cell2);

	const cell3 = document.createElement('div');
	cell3.classList.add('container-main-workspase-table-title-row-cell', 'cell3');
	cell3.textContent = 'Орган';
	rowData.appendChild(cell3);

	const cell4 = document.createElement('div');
	cell4.classList.add('container-main-workspase-table-title-row-cell', 'cell4');
	cell4.textContent = 'Подразделение';
	rowData.appendChild(cell4);

	const cell5 = document.createElement('div');
	cell5.classList.add('container-main-workspase-table-title-row-cell', 'cell5');
	cell5.textContent = 'Катег. дела';
	rowData.appendChild(cell5);

	const cell6 = document.createElement('div');
	cell6.classList.add('container-main-workspase-table-title-row-cell', 'cell6');
	cell6.textContent = '№ материала';
	rowData.appendChild(cell6);

	const cell7 = document.createElement('div');
	cell7.classList.add('container-main-workspase-table-title-row-cell', 'cell7');
	cell7.textContent = 'Статья';
	rowData.appendChild(cell7);

	const cell8 = document.createElement('div');
	cell8.classList.add('container-main-workspase-table-title-row-cell', 'cell8');
	cell8.textContent = 'По факту';
	rowData.appendChild(cell8);

	const cell9 = document.createElement('div');
	cell9.classList.add('container-main-workspase-table-title-row-cell', 'cell9');
	cell9.textContent = 'Вид исследования';
	rowData.appendChild(cell9);

	const cell10 = document.createElement('div');
	cell10.classList.add('container-main-workspase-table-title-row-cell', 'cell10');
	cell10.textContent = 'Ф.И.О. эксперта';
	rowData.appendChild(cell10);

	const cell11 = document.createElement('div');
	cell11.classList.add('container-main-workspase-table-title-row-cell', 'cell11');
	cell11.textContent = 'Продлена';
	rowData.appendChild(cell11);

	const cell12 = document.createElement('div');
	cell12.classList.add('container-main-workspase-table-title-row-cell', 'cell12');
	cell12.textContent = 'Состояние';
	rowData.appendChild(cell12);

	const cell13 = document.createElement('div');
	cell13.classList.add('container-main-workspase-table-title-row-cell', 'cell13');
	cell13.textContent = 'Исполнено';
	rowData.appendChild(cell13);

	const cell14 = document.createElement('div');
	cell14.classList.add('container-main-workspase-table-title-row-cell', 'cell14');
	cell14.textContent = 'Не забрано';
	rowData.appendChild(cell14);

	const cell15 = document.createElement('div');
	cell15.classList.add('container-main-workspase-table-title-row-cell', 'cell15');
	cell15.textContent = 'Получено';
	rowData.appendChild(cell15);

	return rowData;
}

function addExpsInWorkspaseTable(tableInner, db) {

	db.forEach(element => {
		const rowData = document.createElement('div');
		rowData.classList.add('container-main-workspase-table-inner-row-data');
		rowData.setAttribute('id', element.id);

		const cell1 = document.createElement('div');
		cell1.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell1');
		cell1.textContent = '7/' + element.id;
		rowData.appendChild(cell1);

		const cell2 = document.createElement('div');
		cell2.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell2');
		let currentDate = new Date(Number(element.dateOfReceipt));
		cell2.textContent = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
		rowData.appendChild(cell2);

		const cell3 = document.createElement('div');
		cell3.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell3');
		cell3.textContent = element.organAppointedExpertise;
		rowData.appendChild(cell3);

		const cell4 = document.createElement('div');
		cell4.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell4');
		cell4.textContent = element.unitOforgan;
		rowData.appendChild(cell4);

		const cell5 = document.createElement('div');
		cell5.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell5');
		cell5.textContent = element.byTheMaterials;
		rowData.appendChild(cell5);

		const cell6 = document.createElement('div');
		cell6.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell6');
		cell6.textContent = element.number;
		rowData.appendChild(cell6);

		const cell7 = document.createElement('div');
		cell7.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell7');
		cell7.textContent = element.article;
		rowData.appendChild(cell7);

		const cell8 = document.createElement('div');
		cell8.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell8');
		cell8.textContent = element.byFact;
		rowData.appendChild(cell8);

		const cell9 = document.createElement('div');
		cell9.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell9');
		cell9.textContent = element.typeOfResearch;
		rowData.appendChild(cell9);

		const cell10 = document.createElement('div');
		cell10.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell10');
		cell10.textContent = element.expertName;
		rowData.appendChild(cell10);

		const cell11 = document.createElement('div');
		cell11.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell11');
		let currentDate2 = new Date(Number(element.prolongation));
		cell11.textContent = `${currentDate2.getDate()}.${currentDate2.getMonth() + 1}.${currentDate2.getFullYear()}`;
		rowData.appendChild(cell11);

		const cell12 = document.createElement('div');
		cell12.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell12');
		let date1 = Number(element.dateOfReceipt);
		let date2 = Number(element.prolongation);
		let date3 = new Date();
		let date4 = ((date3 - date1) * 100) / (date2 - date1);
		if (date4 < 5) { cell12.classList.add('cell12-linear-gradient0'); }
		else if (date4 >= 5 && date4 < 10) { cell12.classList.add('cell12-linear-gradient05'); }
		else if (date4 >= 10 && date4 < 15) { cell12.classList.add('cell12-linear-gradient10'); }
		else if (date4 >= 15 && date4 < 20) { cell12.classList.add('cell12-linear-gradient15'); }
		else if (date4 >= 20 && date4 < 25) { cell12.classList.add('cell12-linear-gradient20'); }
		else if (date4 >= 25 && date4 < 30) { cell12.classList.add('cell12-linear-gradient25'); }
		else if (date4 >= 30 && date4 < 35) { cell12.classList.add('cell12-linear-gradient30'); }
		else if (date4 >= 35 && date4 < 40) { cell12.classList.add('cell12-linear-gradient35'); }
		else if (date4 >= 40 && date4 < 45) { cell12.classList.add('cell12-linear-gradient40'); }
		else if (date4 >= 45 && date4 < 50) { cell12.classList.add('cell12-linear-gradient45'); }
		else if (date4 >= 50 && date4 < 55) { cell12.classList.add('cell12-linear-gradient50'); }
		else if (date4 >= 55 && date4 < 60) { cell12.classList.add('cell12-linear-gradient55'); }
		else if (date4 >= 60 && date4 < 65) { cell12.classList.add('cell12-linear-gradient60'); }
		else if (date4 >= 65 && date4 < 70) { cell12.classList.add('cell12-linear-gradient65'); }
		else if (date4 >= 70 && date4 < 75) { cell12.classList.add('cell12-linear-gradient70'); }
		else if (date4 >= 75 && date4 < 80) { cell12.classList.add('cell12-linear-gradient75'); }
		else if (date4 >= 80 && date4 < 85) { cell12.classList.add('cell12-linear-gradient80'); }
		else if (date4 >= 85 && date4 < 90) { cell12.classList.add('cell12-linear-gradient85'); }
		else if (date4 >= 90 && date4 < 95) { cell12.classList.add('cell12-linear-gradient90'); }
		else if (date4 >= 95 && date4 < 100) { cell12.classList.add('cell12-linear-gradient95'); }
		else if (date4 >= 100) { cell12.classList.add('cell12-linear-gradient100'); }
		cell12.textContent = date4.toFixed();
		rowData.appendChild(cell12);

		const cell13 = document.createElement('div');
		cell13.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell13');
		let currentDate3 = new Date(Number(element.execution));
		cell13.textContent = `${currentDate3.getDate()}.${currentDate3.getMonth() + 1}.${currentDate3.getFullYear()}`;
		rowData.appendChild(cell13);

		const cell14 = document.createElement('div');
		cell14.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell14');
		if (element.getNotTaken() === 'true') {
			cell14.style.color = 'green';
			cell14.innerHTML = '<i class="fas fa-check"></i>';
		} else {
			cell14.style.color = 'red';
			cell14.innerHTML = '<i class="fas fa-times"></i>';
		}
		rowData.appendChild(cell14);

		const cell15 = document.createElement('div');
		cell15.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell15');
		if (element.getReceived() === 'true') {
			cell15.style.color = 'green';
			cell15.innerHTML = '<i class="fas fa-check"></i>';
		} else {
			cell15.style.color = 'red';
			cell15.innerHTML = '<i class="fas fa-times"></i>';
		}
		rowData.appendChild(cell15);

		tableInner.appendChild(rowData);
	});
	return tableInner;
}

function forBtnCreateNewExpertise() {
	btnCreateNewExpertise.style.boxShadow = `1px 1px 1px rgba(255, 255, 255, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(255, 255, 255, 0.5)`;

	const form = document.querySelector('.container-main-workspase-expertise-form');
	form.reset();

	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseTable.style.display = 'none';
	workspaseStatus.style.display = 'none';
	workspaseExpertise.style.display = 'flex';

	const btnAddExp = document.querySelector('.btnAddExp');
	const btnResetExp = document.querySelector('.btnResetExp');
	btnAddExp.addEventListener('click', forBtnAddNewExp);
	btnResetExp.addEventListener('click', forBtnResetNewExp);
	btnAddExp.childNodes[1].innerHTML = '<i class="fas fa-plus-circle"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-redo"></i>';

	const row1SecondCell1 = document.querySelector('.row1-second-cell1 input'); // нахождение первой ячейки "ид"
	const count = dbOfExpertises.length + 1; // определение номера последней экспертизы
	row1SecondCell1.value = `7/${count}`; // внесение в поле инпут номера экспертизы

	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input');
	row1SecondCell2.valueAsDate = new Date();
	const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
	let dateTemp = new Date();
	dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
	row2SecondCell3.valueAsDate = new Date(dateTemp);

	const row1SecondCell4Input = document.querySelector('.row1-second-cell4-input');
	row1SecondCell4Input.addEventListener('focus', () => {
		const dropdown = document.querySelector('.dropdown');
		dropdown.classList.add('dropdown-show');
		const row1SecondCell3Select = document.querySelector('.row1-second-cell3-select');
		const dropdownListSo = document.querySelector('.dropdown-list-so');
		const dropdownListPolice = document.querySelector('.dropdown-list-police');
		if (row1SecondCell3Select.value === 'ГСУ СК') {
			dropdownListPolice.classList.remove('dropdown-show');
			dropdownListSo.classList.add('dropdown-show');
		} else if (row1SecondCell3Select.value === 'УМВД') {	
			dropdownListSo.classList.remove('dropdown-show');
			dropdownListPolice.classList.add('dropdown-show');
		};
	});
	row1SecondCell4Input.addEventListener('blur', () => {
		const dropdown = document.querySelector('.dropdown');
		dropdown.classList.remove('dropdown-show');
	})


	row1SecondCell2.addEventListener('change', () => {
		const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
		let dateTemp = new Date(row1SecondCell2.value);
		dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
		row2SecondCell3.valueAsDate = new Date(dateTemp);
	});

	btnCreateNewExpertise.removeEventListener('click', forBtnCreateNewExpertise);
	btnCreateNewExpertise.addEventListener('click', forBtnReturnToTable);
}

function forBtnReturnToTable() {
	btnCreateNewExpertise.style.boxShadow = `1px 1px 1px rgba(0, 0, 0, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(0, 0, 0, 0.5)`;

	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseExpertise.style.display = 'none';
	workspaseTable.style.display = 'block';
	workspaseStatus.style.display = 'flex';

	const btnAddExp = document.querySelector('.btnAddExp');
	const btnResetExp = document.querySelector('.btnResetExp');
	btnAddExp.addEventListener('click', forBtnAddNewExp);
	btnResetExp.addEventListener('click', forBtnResetNewExp);
	btnAddExp.childNodes[1].innerHTML = '<i class="fas fa-plus-circle"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-redo"></i>';

	renderDb(dbOfExpertises);

	btnCreateNewExpertise.removeEventListener('click', forBtnReturnToTable);
	btnCreateNewExpertise.addEventListener('click', forBtnCreateNewExpertise);
}

function resetForm(form) {
	form.reset();

	const row1SecondCell1 = document.querySelector('.row1-second-cell1'); // нахождение первой ячейки "ид"
	const row1SecondCell1Nodes = row1SecondCell1.childNodes; // нахождение всех элементов 
	const count = dbOfExpertises.length + 1; // определение номера последней экспертизы
	row1SecondCell1Nodes[1].value = `7/${count}`; // внесение в поле инпут номера экспертизы

	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input');
	row1SecondCell2.valueAsDate = new Date();
	const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
	let dateTemp = new Date();
	dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
	row2SecondCell3.valueAsDate = new Date(dateTemp);
}

function forBtnAddNewExp() {
	const form = document.querySelector('.container-main-workspase-expertise-form');
	let id = form.elements.id.value.split('/');
	let currentDate = new Date(form.elements.dateOfReceipt.value);
	let prolongationDate = new Date(form.elements.prolongation.value);

	const exp = new Expertise(
		id[1],
		+currentDate,
		form.elements.organAppointedExpertise.value,
		form.elements.unitOforgan.value,
		form.elements.officialPerson.value,
		form.elements.nameOfficialPerson.value,
		form.elements.byTheMaterials.value,
		form.elements.number.value,
		form.elements.article.value,
		form.elements.byFact.value,
		form.elements.typeOfResearch.value,
		form.elements.expertName.value,
		+prolongationDate,
		form.elements.execution.value,
		form.elements.notification.value,
		form.elements.result.value,
		form.elements.countObjectsTotal.value,
		form.elements.countObjectsPositive.value,
		form.elements.countObjectsNegative.value,
		String(form.elements.notTaken.checked),
		String(form.elements.received.checked));

	dbOfExpertises.push(exp);

	resetForm(form);
}

function forBtnResetNewExp() {
	const form = document.querySelector('.container-main-workspase-expertise-form'); // нахождение фомы
	resetForm(form);
}

function forUpdateExpertise(data) {

	const form = document.querySelector('.container-main-workspase-expertise-form');
	form.reset();

	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseTable.style.display = 'none';
	workspaseStatus.style.display = 'none';
	workspaseExpertise.style.display = 'flex';

	// const btnAddExp = document.querySelector('.btnAddExp');
	// const btnResetExp = document.querySelector('.btnResetExp');

	btnAddExp.childNodes[1].innerHTML = '<i class="far fa-edit"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-trash-alt"></i>';

	const row1SecondCell1 = document.querySelector('.row1-second-cell1 input');
	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input');
	const row1SecondCell3 = document.querySelector('.row1-second-cell3 select');
	const row1SecondCell4 = document.querySelector('.row1-second-cell4 select');
	const row1SecondCell5 = document.querySelector('.row1-second-cell5 input');
	const row1SecondCell6 = document.querySelector('.row1-second-cell6 input');
	const row1SecondCell7 = document.querySelector('.row1-second-cell7 select');
	const row1SecondCell8 = document.querySelector('.row1-second-cell8 input');
	const row1SecondCell9 = document.querySelector('.row1-second-cell9 select');
	const row1SecondCell10 = document.querySelector('.row1-second-cell10 select');
	const row2SecondCell1 = document.querySelector('.row2-second-cell1 select');
	const row2SecondCell2 = document.querySelector('.row2-second-cell2 select');
	const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
	const row2SecondCell4 = document.querySelector('.row2-second-cell4 input');
	const row2SecondCell5 = document.querySelector('.row2-second-cell5 input');
	const row2SecondCell6 = document.querySelector('.row2-second-cell6 select');
	const row2SecondCell7 = document.querySelector('.row2-second-cell7 input');
	const row2SecondCell8 = document.querySelector('.row2-second-cell8 input');
	const row2SecondCell9 = document.querySelector('.row2-second-cell9 input');
	const row3SecondCell1 = document.querySelector('.row3-second-cell1 input');
	const row3SecondCell2 = document.querySelector('.row3-second-cell2 input');

	row1SecondCell1.value = `7/${data.getId()}`;
	row1SecondCell2.valueAsDate = new Date(+data.getDateOfReceipt());
	switch (data.getOrganAppointedExpertise()) {
		case 'ГСУ СК':
			row1SecondCell3.value = 'ГСУ СК';
			break;
		case 'УМВД':
			row1SecondCell3.value = 'УМВД';
			break;
	}
	switch (data.getUnitOforgan()) {
		case 'Белогорский МСО':
			row1SecondCell4.value = 'Белогорский МСО';
			break;
		case 'СО по г. Ялта':
			row1SecondCell4.value = 'СО по г. Ялта';
			break;
		case 'СО по г. Феодосия':
			row1SecondCell4.value = 'СО по г. Феодосия';
			break;
		case 'ОП №2 "Ливадийский"':
			row1SecondCell4.value = 'ОП №2 "Ливадийский"';
			break;
	}
	row1SecondCell5.value = `${data.getOfficialPerson()}`;
	row1SecondCell6.value = `${data.getNameOfficialPerson()}`;
	switch (data.getByTheMaterials()) {
		case 'УД':
			row1SecondCell7.value = 'УД';
			break;
		case 'ДУЛ':
			row1SecondCell7.value = 'ДУЛ';
			break;
		case 'КУСП':
			row1SecondCell7.value = 'КУСП';
			break;
	}
	row1SecondCell8.value = `${data.getNumber()}`;
	switch (data.getArticle()) {
		case '161':
			row1SecondCell9.value = '161';
			break;
		case '105':
			row1SecondCell9.value = '105';
			break;
		case '158':
			row1SecondCell9.value = '158';
			break;
	}
	switch (data.getByFact()) {
		case 'Общее':
			row1SecondCell10.value = 'Общее';
			break;
		case 'Б/п':
			row1SecondCell10.value = 'Б/п';
			break;
		case 'Н/т':
			row1SecondCell10.value = 'Н/т';
			break;
	}
	switch (data.getTypeOfResearch()) {
		case 'ДНК':
			row2SecondCell1.value = 'ДНК';
			break;
		case 'Волосы':
			row2SecondCell1.value = 'Волосы';
			break;
		case 'ДНК и волосы':
			row2SecondCell1.value = 'ДНК и волосы';
			break;
	}
	switch (data.getExpertName()) {
		case 'Ходырев Н.':
			row2SecondCell2.value = 'Ходырев Н.';
			break;
		case 'Хоменко А.':
			row2SecondCell2.value = 'Хоменко А.';
			break;
		case 'Кирсанова Н.':
			row2SecondCell2.value = 'Кирсанова Н.';
			break;
		case 'Сорокина Е.':
			row2SecondCell2.value = 'Сорокина Е.';
			break;
		case 'Баркова М.':
			row2SecondCell2.value = 'Баркова М.';
			break;
	}
	row2SecondCell3.valueAsDate = new Date(+data.getProlongation());
	row2SecondCell4.valueAsDate = new Date(+data.getExecution());
	if (+data.getNotification()) { row2SecondCell5.valueAsDate = new Date(+data.getNotification()); }
	switch (data.getResult()) {
		case 'Положительный':
			row2SecondCell6.value = 'Положительный';
			break;
		case 'Отрицательный':
			row2SecondCell6.value = 'Отрицательный';
			break;
		case 'НПВ':
			row2SecondCell6.value = 'НПВ';
			break;
	}
	row2SecondCell7.value = +data.getCountObjectsTotal();
	row2SecondCell8.value = +data.getCountObjectsPositive();
	row2SecondCell9.value = +data.getCountObjectsNegative();

	if (data.getNotTaken() === 'true') row3SecondCell1.checked = true;
	if (data.getReceived() === 'true') {
		row3SecondCell2.checked = true;
		row3SecondCell1.checked = false;
	}


	btnAddExp.removeEventListener('click', forBtnAddNewExp);
	btnResetExp.removeEventListener('click', forBtnResetNewExp);

	btnResetExp.addEventListener('click', forDeleteLastExp);
	//??????????????????????????????????????????????????????????????????????????
}

function forDeleteLastExp() {
	function forDeleteLastExpInner(db) {
		db.pop();
		const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
		const workspaseTable = document.querySelector('.container-main-workspase-table');
		const workspaseStatus = document.querySelector('.container-main-workspase-status');
		workspaseExpertise.style.display = 'none';
		workspaseTable.style.display = 'block';
		workspaseStatus.style.display = 'flex';

		renderDb(db);

		btnResetExp.removeEventListener('click', forDeleteLastExp);
		btnResetExp.addEventListener('click', forBtnResetNewExp);
	}
	forDeleteLastExpInner(dbOfExpertises);
}



//объявление методов конец
//----------------------------------------------------------------------
//объявление обработчиков событий начало

btnCreateNewExpertise.addEventListener('click', forBtnCreateNewExpertise);

function selectRow(allRows) {
	allRows.forEach(element => {
		element.addEventListener('click', (event) => {
			const id = event.currentTarget.getAttribute('id');
			dbOfExpertises.forEach(element => {
				if (element.getId() === id) {
					forUpdateExpertise(element);
				};
			});
		});
	});
}

// обработчики экрана новой экспертизы
inputRow2SecondCell8.addEventListener('change', () => {
	inputRow2SecondCell7.value = +inputRow2SecondCell8.value + (+inputRow2SecondCell9.value);
});
inputRow2SecondCell9.addEventListener('change', () => {
	inputRow2SecondCell7.value = +inputRow2SecondCell8.value + (+inputRow2SecondCell9.value);
});

btnCancelExp.addEventListener('click', forBtnReturnToTable);
btnResetExp.addEventListener('click', forBtnResetNewExp);
btnAddExp.addEventListener('click', forBtnAddNewExp);



//объявление обработчиков событий конец
//----------------------------------------------------------------------
//запуск приложения начало
init();


//запуск приложения конец
//----------------------------------------------------------------------

















// let dbOfExpertisesJson = JSON.stringify(dbOfExpertises);

// let url = 'saveDB.php';

// const getData = (url, dbOfExpertisesJson) => {
//   const request = new XMLHttpRequest();
//   request.open('POST', url, true);
//   request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   request.addEventListener('readystatechange', () => {
//     if (request.readyState !== 4) return;

//     if (request.status === 200) {
//       console.log(request.response);
//     } else {
//       console.error(request.status);
//     }
//   });



// request.send('db=' + dbOfExpertisesJson);
// }

// getData(url, dbOfExpertisesJson);