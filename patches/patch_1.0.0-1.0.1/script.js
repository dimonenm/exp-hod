//объявление переменных начало

//поиск элементов модуля новой экспертизы
//----------------------------------------------
// кнопка создания новой экспертизы и возвращения к таблице
const btnCreateNewExpertise = document.querySelector('.btnCreateNewExpertise');
// ячейка окна новой экспертизы общее кол-во объектов
const inputRow2SecondCell7 = document.querySelector('.row2-second-cell7 input');
// ячейка окна новой экспертизы кол-во пол объектов
const inputRow2SecondCell8 = document.querySelector('.row2-second-cell8 input');
// ячейка окна новой экспертизы кол-во отр объектов
const inputRow2SecondCell9 = document.querySelector('.row2-second-cell9 input');

const btnCancelExp = document.querySelector('.btnCancelExp'); // кнопка Cancel окна новой экспертизы
const tooltipBtnCancelExp = document.querySelector('.tooltipBtnCancelExp');
const btnResetExp = document.querySelector('.btnResetExp'); // кнопка Reset окна новой экспертизы
const tooltipBtnResetExp = document.querySelector('.tooltipBtnResetExp');
const btnAddExp = document.querySelector('.btnAddExp'); // кнопка Add окна новой экспертизы
const tooltipBtnAddExp = document.querySelector('.tooltipBtnAddExp');

//поиск элементов панели поиска
const btnSearch = document.querySelector('.btnSearch'); // кнопка поиска экспертиз
const containerMainSideSearchContainer = document.querySelector('.container-main-side-search-container');
const sideSearchForm = document.querySelector('.sideSearchForm');
const sideSearchBtnDateOfReceipt = document.querySelector('.sideSearchBtnDateOfReceipt');
const sideSearchDropdownDateOfReceipt = document.querySelector('.sideSearchDropdownDateOfReceipt');
const sideSearchBtnOrgan = document.querySelector('.sideSearchBtnOrgan');
const sideSearchDropdownOrgan = document.querySelector('.sideSearchDropdownOrgan');
const sideSearchBtnUnit = document.querySelector('.sideSearchBtnUnit');
const sideSearchDropdownUnit = document.querySelector('.sideSearchDropdownUnit');
const sideSearchBtnMaterial = document.querySelector('.sideSearchBtnMaterial');
const sideSearchDropdownMaterial = document.querySelector('.sideSearchDropdownMaterial');
const sideSearchBtnNumber = document.querySelector('.sideSearchBtnNumber');
const sideSearchDropdownNumber = document.querySelector('.sideSearchDropdownNumber');
const sideSearchBtnArticle = document.querySelector('.sideSearchBtnArticle');
const sideSearchDropdownArticle = document.querySelector('.sideSearchDropdownArticle');
const sideSearchBtnFact = document.querySelector('.sideSearchBtnFact');
const sideSearchDropdownFact = document.querySelector('.sideSearchDropdownFact');
const sideSearchBtnType = document.querySelector('.sideSearchBtnType');
const sideSearchDropdownType = document.querySelector('.sideSearchDropdownType');
const sideSearchBtnExp = document.querySelector('.sideSearchBtnExp');
const sideSearchDropdownExp = document.querySelector('.sideSearchDropdownExp');
const sideSearchBtnStatus = document.querySelector('.sideSearchBtnStatus');
const sideSearchDropdownStatus = document.querySelector('.sideSearchDropdownStatus');
const sideSearchBtnExec = document.querySelector('.sideSearchBtnExec');
const sideSearchDropdownExec = document.querySelector('.sideSearchDropdownExec');
const sideSearchBtnRes = document.querySelector('.sideSearchBtnRes');
const sideSearchDropdownRes = document.querySelector('.sideSearchDropdownRes');
const sideSearchBtnTaken = document.querySelector('.sideSearchBtnTaken');
const sideSearchDropdownTaken = document.querySelector('.sideSearchDropdownTaken');
const sideSearchBtnSearch = document.querySelector('.sideSearchBtnSearch');
const sideSearchBtnPrint = document.querySelector('.sideSearchBtnPrint');

//поиск элементов панели статуса(футер)
const statusTotalExp = document.querySelector('.statusTotalExp');
const statusPolExp = document.querySelector('.statusPolExp');
const statusOtrExp = document.querySelector('.statusOtrExp');
const statusNpvExp = document.querySelector('.statusNpvExp');
const statusNotExecMvd = document.querySelector('.statusNotExecMvd');
const statusNotExecGsu = document.querySelector('.statusNotExecGsu');
const statusTotalOb = document.querySelector('.statusTotalOb');
const statusPolOb = document.querySelector('.statusPolOb');
const statusOtrOb = document.querySelector('.statusOtrOb');
const statusNotTakenMvd = document.querySelector('.statusNotTakenMvd');
const statusNotTakenGsu = document.querySelector('.statusNotTakenGsu');
const statusTakenExp = document.querySelector('.statusTakenExp');



let dbOfExpertises; // переменная для получения базы данных
const findList = {};

//объявление переменных конец
//----------------------------------------------------------------------
//объявление методов начало
const init = () => { // метод запуска приложения
	getDb();
};

//метод загрузки базы данных из файла и первый рендеринг БД в таблице
const getDb = () => {
	const request = new XMLHttpRequest();
	request.open('GET', 'src/db/dbExpertises.json', true);
	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) {
			return;
		}
		if (request.status === 200) {
			dbOfExpertises = JSON.parse(request.response); //помещение данных из файла в переменную
			dbOfExpertises = dbOfExpertises.map(el => {
				return new Expertise(el.id, el.dateOfReceipt, el.organAppointedExpertise, el.unitOforgan, el.officialPerson,
					el.nameOfficialPerson, el.byTheMaterials, el.number, el.article, el.byFact, el.typeOfResearch,
					el.expertName, el.prolongation, el.execution, el.notification, el.result, el.countObjectsTotal,
					el.countObjectsPositive, el.countObjectsNegative, el.notTaken, el.received);
			});
			renderDb(dbOfExpertises); //отрисовывание базы данных
		} else {
			console.error(request.status);
		}
	});
	request.send();
};

//метод сохранения экспертизы в базе данных и рендеринг БД в таблице
const setExpInDb = () => {

	fetch('saveDb.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'db=' + JSON.stringify(dbOfExpertises)
	}).then((res) => {
		renderDb(dbOfExpertises);
	});


};

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
	renderStatusFromDb(dbOfExpertises);
};

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
		let date4 = ((date3 - date2) / 1000 / 60 / 60 / 24);
		let date5 = ((date3 - date1) * 100) / (date2 - date1);
		if (element.execution && element.execution !== '0') {
			cell12.classList.add('cell12-done');
		} else if (date5 >= 0 && date5 < 5) {
			cell12.classList.add('cell12-linear-gradient0');
		} else if (date5 >= 5 && date5 < 10) {
			cell12.classList.add('cell12-linear-gradient05');
		} else if (date5 >= 10 && date5 < 15) {
			cell12.classList.add('cell12-linear-gradient10');
		} else if (date5 >= 15 && date5 < 20) {
			cell12.classList.add('cell12-linear-gradient15');
		} else if (date5 >= 20 && date5 < 25) {
			cell12.classList.add('cell12-linear-gradient20');
		} else if (date5 >= 25 && date5 < 30) {
			cell12.classList.add('cell12-linear-gradient25');
		} else if (date5 >= 30 && date5 < 35) {
			cell12.classList.add('cell12-linear-gradient30');
		} else if (date5 >= 35 && date5 < 40) {
			cell12.classList.add('cell12-linear-gradient35');
		} else if (date5 >= 40 && date5 < 45) {
			cell12.classList.add('cell12-linear-gradient40');
		} else if (date5 >= 45 && date5 < 50) {
			cell12.classList.add('cell12-linear-gradient45');
		} else if (date5 >= 50 && date5 < 55) {
			cell12.classList.add('cell12-linear-gradient50');
		} else if (date5 >= 55 && date5 < 60) {
			cell12.classList.add('cell12-linear-gradient55');
		} else if (date5 >= 60 && date5 < 65) {
			cell12.classList.add('cell12-linear-gradient60');
		} else if (date5 >= 65 && date5 < 70) {
			cell12.classList.add('cell12-linear-gradient65');
		} else if (date5 >= 70 && date5 < 75) {
			cell12.classList.add('cell12-linear-gradient70');
		} else if (date5 >= 75 && date5 < 80) {
			cell12.classList.add('cell12-linear-gradient75');
		} else if (date5 >= 80 && date5 < 85) {
			cell12.classList.add('cell12-linear-gradient80');
		} else if (date5 >= 85 && date5 < 90) {
			cell12.classList.add('cell12-linear-gradient85');
		} else if (date5 >= 90 && date5 < 95) {
			cell12.classList.add('cell12-linear-gradient90');
		} else if (date5 >= 95 && date5 < 100) {
			cell12.classList.add('cell12-linear-gradient95');
		} else if (date5 >= 100) {
			cell12.classList.add('cell12-expired');
		}

		if (element.execution && element.execution !== '0') {
			cell12.textContent = `Готова`;
		} else if (date5 >= 0 && date5 < 100) {
			cell12.textContent = `Осталось дней: \n ${date4.toFixed() * -1}`;
		} else if (date5 >= 100) {
			cell12.textContent = `Срок вышел!`;
		}

		rowData.appendChild(cell12);

		const cell13 = document.createElement('div');
		cell13.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell13');
		if (element.execution && element.execution !== '0') {
			let currentDate3 = new Date(Number(element.execution));
			cell13.textContent = `${currentDate3.getDate()}.${currentDate3.getMonth() + 1}.${currentDate3.getFullYear()}`;
			rowData.appendChild(cell13);
		} else if (element.execution === '' || element.execution === '0' || element.execution === 'NaN') {
			cell13.textContent = `не выполнена`;
			rowData.appendChild(cell13);
		}


		const cell14 = document.createElement('div');
		cell14.classList.add('container-main-workspase-table-inner-row-data-cell', 'cell14');
		if (element.getNotTaken() === 'true') {
			cell14.style.color = 'green';
			cell14.innerHTML = '<i class="fas fa-cog"></i>';
		} else {
			cell14.style.color = 'blue';
			cell14.innerHTML = '<i class="fas fa-times"></i>';
			// cell14.innerHTML = '<i class="fas fa-times"></i>';
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

function renderStatusFromDb(db) {
	let totalExp = db.length;
	let polExp = 0;
	let otrExp = 0;
	let notExecMvdExp = 0;
	let notExecGsuExp = 0;
	let totalOb = 0;
	let polOb = 0;
	let otrOb = 0;
	// let notTakenExp = 0;
	let notTakenMvdExp = 0;
	let notTakenGsuExp = 0;
	let TakenExp = 0;

	for (let item of db) {
		if (item.getResult() === 'Положительный') {
			polExp++;
		}
		if (item.getResult() === 'Отрицательный') {
			otrExp++;
		}
		if (item.getOrganAppointedExpertise() === 'МВД' && item.getResult() === "Не исполнено") {
			notExecMvdExp++;
		}
		if (item.getOrganAppointedExpertise() === 'ГСУ СК' && item.getResult() === "Не исполнено") {
			notExecGsuExp++;
		}
		if (item.getCountObjectsTotal() !== '') {
			totalOb = totalOb + Number(item.getCountObjectsTotal());
		}
		if (item.getCountObjectsPositive() !== '') {
			polOb = polOb + Number(item.getCountObjectsPositive());
		}
		if (item.getCountObjectsNegative() !== '') {
			otrOb = otrOb + Number(item.getCountObjectsNegative());
		}
		if (item.getOrganAppointedExpertise() === 'МВД' && item.getNotTaken() === 'true') {
			notTakenMvdExp++;
		}
		if (item.getOrganAppointedExpertise() === 'ГСУ СК' && item.getNotTaken() === 'true') {
			notTakenGsuExp++;
		}
		if (item.getReceived() === 'true') {
			TakenExp++;
		}
	}

	statusTotalExp.textContent = totalExp;
	statusPolExp.textContent = polExp;
	statusOtrExp.textContent = otrExp;
	statusNotExecMvd.textContent = notExecMvdExp;
	statusNotExecGsu.textContent = notExecGsuExp;
	statusTotalOb.textContent = totalOb;
	statusPolOb.textContent = polOb;
	statusOtrOb.textContent = otrOb;
	statusNotTakenMvd.textContent = notTakenMvdExp;
	statusNotTakenGsu.textContent = notTakenGsuExp;
	statusTakenExp.textContent = TakenExp;
}

function forBtnCreateNewExpertise() {
	//изменение стиля кнопки меню
	btnCreateNewExpertise.style.boxShadow = `1px 1px 1px rgba(255, 255, 255, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(255, 255, 255, 0.5)`;

	forBtnSearchOff();

	//нахождение и очищение формы
	const form = document.querySelector('.container-main-workspase-expertise-form');
	const dropdown = document.querySelector('.dropdown');
	form.reset();

	form.addEventListener('click', (event) => {
		const target = event.target;
		if (target.closest('.row1-second-cell4-input') || target.closest('.dropdown')) {
			return;
		} else {
			dropdown.classList.remove('dropdown-show');
		}
	});

	//нахождение и включение рабочего окна
	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseTable.style.display = 'none';
	workspaseStatus.style.display = 'none';
	workspaseExpertise.style.display = 'flex';

	//нахождение кнопок и подключение обработчиков событий
	const btnAddExp = document.querySelector('.btnAddExp');
	const btnResetExp = document.querySelector('.btnResetExp');
	btnAddExp.removeEventListener('click', forBtnUpdateExp);
	btnResetExp.removeEventListener('click', forBtnDeleteLastExp);
	btnAddExp.addEventListener('click', forBtnAddNewExp);
	btnResetExp.addEventListener('click', forBtnResetNewExp);

	//изменение стиля кнопкок
	btnAddExp.childNodes[1].innerHTML = '<i class="fas fa-plus-circle"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-redo"></i>';

	//внесение даннных в поля таблицы
	//поле номера экспертизы
	const row1SecondCell1 = document.querySelector('.row1-second-cell1 input'); // нахождение первой ячейки "ид"
	const count = dbOfExpertises.length + 1; // определение номера последней экспертизы
	row1SecondCell1.value = `7/${count}`; // внесение в поле инпут номера экспертизы

	//поле даты начала экспертизы
	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input');
	row1SecondCell2.valueAsDate = new Date();
	row1SecondCell2.addEventListener('change', () => {
		const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
		let dateTemp = new Date(row1SecondCell2.value);
		dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
		row2SecondCell3.valueAsDate = new Date(dateTemp);
	});
	//поле даты окончания экспертизы
	const row2SecondCell3 = document.querySelector('.row2-second-cell3 input');
	let dateTemp = new Date();
	dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
	row2SecondCell3.valueAsDate = new Date(dateTemp);

	//поле органа, направившего экспертизу
	forDropdownListInRow1SecondCell4Input();

	//изменение обработчиков кнопки меню
	btnCreateNewExpertise.removeEventListener('click', forBtnCreateNewExpertise);
	btnCreateNewExpertise.addEventListener('click', forBtnReturnToTable);
}

function forKeyUpEscape(event) {
	if (event.key === "Escape") {
		forBtnSearchOff()
		forBtnReturnToTable();
	}
}

function forDropdownListInRow1SecondCell4Input() {
	const row1SecondCell4Input = document.querySelector('.row1-second-cell4-input');
	const row1SecondCell3Select = document.querySelector('.row1-second-cell3-select');
	const dropdown = document.querySelector('.dropdown');
	const dropdownListSo = document.querySelector('.dropdown-list-so');
	const dropdownListPolice = document.querySelector('.dropdown-list-police');
	const arrLiOfDropdownListSo = document.querySelectorAll('.dropdown-list-so ul li');
	const arrLiOfDropdownListPolice = document.querySelectorAll('.dropdown-list-police ul li');

	for (let li of arrLiOfDropdownListSo) {
		li.addEventListener('click', (event) => {
			const target = event.target;
			row1SecondCell4Input.value = target.innerText;
			dropdown.classList.remove('dropdown-show');
		});
	}

	for (let li of arrLiOfDropdownListPolice) {
		li.addEventListener('click', (event) => {
			const target = event.target;
			row1SecondCell4Input.value = target.innerText;
			dropdown.classList.remove('dropdown-show');
		});
	}

	row1SecondCell4Input.addEventListener('focus', () => {
		if (!row1SecondCell4Input.value) {
			if (row1SecondCell3Select.value === 'ГСУ СК') {
				dropdown.classList.add('dropdown-show');
				dropdownListPolice.classList.remove('dropdown-show');
				dropdownListSo.classList.add('dropdown-show');
			} else if (row1SecondCell3Select.value === 'МВД') {
				dropdown.classList.add('dropdown-show');
				dropdownListSo.classList.remove('dropdown-show');
				dropdownListPolice.classList.add('dropdown-show');
			}
		}
	});

	row1SecondCell4Input.addEventListener('input', () => {
		const inputData = row1SecondCell4Input.value.toLowerCase();

		if (!row1SecondCell4Input.value) {
			if (row1SecondCell3Select.value === 'ГСУ СК') {
				dropdown.classList.add('dropdown-show');
				dropdownListPolice.classList.remove('dropdown-show');
				dropdownListSo.classList.add('dropdown-show');
			} else if (row1SecondCell3Select.value === 'МВД') {
				dropdown.classList.add('dropdown-show');
				dropdownListSo.classList.remove('dropdown-show');
				dropdownListPolice.classList.add('dropdown-show');
			}
		}

		if (row1SecondCell3Select.value === 'ГСУ СК') {
			if (!dropdown.classList.contains('dropdown-show')) {
				dropdown.classList.add('dropdown-show');
				if (row1SecondCell3Select.value === 'ГСУ СК') {
					dropdownListPolice.classList.remove('dropdown-show');
					dropdownListSo.classList.add('dropdown-show');
				} else if (row1SecondCell3Select.value === 'МВД') {
					dropdownListSo.classList.remove('dropdown-show');
					dropdownListPolice.classList.add('dropdown-show');
				}
			}
			for (let item of arrLiOfDropdownListSo) {
				if (item.innerHTML.toLocaleLowerCase().includes(inputData)) {
					item.style.display = 'flex';
				} else {
					item.style.display = 'none';
				}
			}
		} else if (row1SecondCell3Select.value === 'МВД') {
			if (!dropdown.classList.contains('dropdown-show')) {
				dropdown.classList.add('dropdown-show');
				if (row1SecondCell3Select.value === 'ГСУ СК') {
					dropdownListPolice.classList.remove('dropdown-show');
					dropdownListSo.classList.add('dropdown-show');
				} else if (row1SecondCell3Select.value === 'МВД') {
					dropdownListSo.classList.remove('dropdown-show');
					dropdownListPolice.classList.add('dropdown-show');
				}
			}
			for (let item of arrLiOfDropdownListPolice) {
				if (item.innerHTML.toLocaleLowerCase().includes(inputData)) {
					item.style.display = 'flex';
				} else {
					item.style.display = 'none';
				}
			}
		}
	});
}

function forBtnSearchOn() {
	// изменение стиля кнопок меню
	btnSearch.style.boxShadow = `1px 1px 1px rgba(255, 255, 255, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(255, 255, 255, 0.5)`;
	btnCreateNewExpertise.style.boxShadow = `1px 1px 1px rgba(0, 0, 0, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(0, 0, 0, 0.5)`;

	// включение таблицы
	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseExpertise.style.display = 'none';
	workspaseTable.style.display = 'block';
	workspaseStatus.style.display = 'flex';

	// включение панели для поиска
	containerMainSideSearchContainer.classList.remove('hide');

	//обработчики элементов панели поиска
	sideSearchBtnSearch.addEventListener('click', () => {
		let dbOfFindExpertises = [];

		findList.dateOfReceipt = {
			start: `${+sideSearchDropdownDateOfReceipt.children[0].children[1].valueAsDate}`,
			stop: `${+sideSearchDropdownDateOfReceipt.children[1].children[1].valueAsDate}`
		};
		findList.organ = {
			gsu: `${sideSearchDropdownOrgan.children[0].children[1].checked}`,
			mvd: `${sideSearchDropdownOrgan.children[1].children[1].checked}`,
			fsb: `${sideSearchDropdownOrgan.children[2].children[1].checked}`,
			sud: `${sideSearchDropdownOrgan.children[3].children[1].checked}`
		};
		findList.unit = `${sideSearchDropdownUnit.childNodes[1].childNodes[1].value}`;
		findList.material = {
			ud: `${sideSearchDropdownMaterial.children[0].children[1].checked}`,
			kusp: `${sideSearchDropdownMaterial.children[1].children[1].checked}`,
			krsp: `${sideSearchDropdownMaterial.children[2].children[1].checked}`,
			mp: `${sideSearchDropdownMaterial.children[3].children[1].checked}`,
			rd: `${sideSearchDropdownMaterial.children[4].children[1].checked}`,
			dul: `${sideSearchDropdownMaterial.children[5].children[1].checked}`
		};
		findList.number = `${sideSearchDropdownNumber.children[0].children[0].value}`;
		findList.article = `${sideSearchDropdownArticle.children[0].children[0].value}`;
		findList.fact = {
			ob: `${sideSearchDropdownFact.children[0].children[1].checked}`,
			bp: `${sideSearchDropdownFact.children[1].children[1].checked}`,
			nt: `${sideSearchDropdownFact.children[2].children[1].checked}`
		};
		findList.type = {
			dna: `${sideSearchDropdownType.children[0].children[1].checked}`,
			dna_and_hair: `${sideSearchDropdownType.children[1].children[1].checked}`,
			hair: `${sideSearchDropdownType.children[2].children[1].checked}`
		};
		findList.exp = {
			hod: `${sideSearchDropdownExp.children[0].children[1].checked}`,
			kach: `${sideSearchDropdownExp.children[1].children[1].checked}`,
			hom: `${sideSearchDropdownExp.children[2].children[1].checked}`,
			kir: `${sideSearchDropdownExp.children[3].children[1].checked}`,
			sor: `${sideSearchDropdownExp.children[4].children[1].checked}`,
			bar: `${sideSearchDropdownExp.children[5].children[1].checked}`
		};
		findList.status = `${sideSearchDropdownStatus.children[0].children[0].value}`;
		findList.exec = {
			start: `${+sideSearchDropdownExec.children[0].children[1].valueAsDate}`,
			stop: `${+sideSearchDropdownExec.children[1].children[1].valueAsDate}`
		};
		findList.res = {
			pol: `${sideSearchDropdownRes.children[0].children[1].checked}`,
			otr: `${sideSearchDropdownRes.children[1].children[1].checked}`,
			npv: `${sideSearchDropdownRes.children[2].children[1].checked}`,
			bez: `${sideSearchDropdownRes.children[3].children[1].checked}`
		};
		findList.taken = {
			pol: `${sideSearchDropdownTaken.children[0].children[1].checked}`,
			otr: `${sideSearchDropdownTaken.children[1].children[1].checked}`
		};

		if (findList.dateOfReceipt.start !== '0' || findList.dateOfReceipt.stop !== '0') {
			let dbOfFindExpertisesTemp = dbOfExpertises.filter(item => {
				if (findList.dateOfReceipt.start !== '0' && findList.dateOfReceipt.start > 1388534400000 &&
					findList.dateOfReceipt.stop !== '0' && findList.dateOfReceipt.stop <= +(new Date()) &&
					+findList.dateOfReceipt.start <= +item.getDateOfReceipt() &&
					+findList.dateOfReceipt.stop >= +item.getDateOfReceipt()) {
					return true;
				} else if (findList.dateOfReceipt.start !== '0' && findList.dateOfReceipt.start > 1388534400000 &&
					findList.dateOfReceipt.stop === '0' && +findList.dateOfReceipt.start <= +item.getDateOfReceipt()) {
					return true;
				} else if (findList.dateOfReceipt.stop !== '0' && findList.dateOfReceipt.stop <= +(new Date()) &&
					findList.dateOfReceipt.start === '0' && +findList.dateOfReceipt.stop >= +item.getDateOfReceipt()) {
					return true;
				}
			});
			dbOfFindExpertises = dbOfFindExpertisesTemp;
		}
		if (findList.organ.gsu !== 'false' || findList.organ.mvd !== 'false' || findList.organ.fsb !== 'false' ||
			findList.organ.sud !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.organ.gsu !== 'false' && 'ГСУ СК' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.mvd !== 'false' && 'МВД' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.fsb !== 'false' && 'ФСБ' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.sud !== 'false' && 'Суд' === item.getOrganAppointedExpertise()) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.organ.gsu !== 'false' && 'ГСУ СК' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.mvd !== 'false' && 'МВД' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.fsb !== 'false' && 'ФСБ' === item.getOrganAppointedExpertise()) {
						return true;
					}
					if (findList.organ.sud !== 'false' && 'Суд' === item.getOrganAppointedExpertise()) {
						return true;
					}
				});
			}
		}
		if (findList.unit) {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (item.getUnitOforgan().toLocaleLowerCase().includes(findList.unit)) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (item.getUnitOforgan().toLocaleLowerCase().includes(findList.unit)) {
						return true;
					}
				});
			}
		}
		if (findList.material.ud !== 'false' || findList.material.kusp !== 'false' || findList.material.krsp !== 'false' ||
			findList.material.mp !== 'false' || findList.material.rd !== 'false' || findList.material.dul !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.material.ud !== 'false' && 'УД' === item.getByTheMaterials()) return true;
					if (findList.material.kusp !== 'false' && 'КУСП' === item.getByTheMaterials()) return true;
					if (findList.material.krsp !== 'false' && 'КРСП' === item.getByTheMaterials()) return true;
					if (findList.material.mp !== 'false' && 'МП' === item.getByTheMaterials()) return true;
					if (findList.material.rd !== 'false' && 'РД' === item.getByTheMaterials()) return true;
					if (findList.material.dul !== 'false' && 'ДУЛ' === item.getByTheMaterials()) return true;
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.material.ud !== 'false' && 'УД' === item.getByTheMaterials()) return true;
					if (findList.material.kusp !== 'false' && 'КУСП' === item.getByTheMaterials()) return true;
					if (findList.material.krsp !== 'false' && 'КРСП' === item.getByTheMaterials()) return true;
					if (findList.material.mp !== 'false' && 'МП' === item.getByTheMaterials()) return true;
					if (findList.material.rd !== 'false' && 'РД' === item.getByTheMaterials()) return true;
					if (findList.material.dul !== 'false' && 'ДУЛ' === item.getByTheMaterials()) return true;
				});
			}
		}
		if (findList.number) {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (item.getNumber().toLocaleLowerCase().includes(findList.number)) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (item.getNumber().toLocaleLowerCase().includes(findList.number)) {
						return true;
					}
				});
			}
		}
		if (findList.article) {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (item.getArticle().toLocaleLowerCase().includes(findList.article)) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (item.getArticle().toLocaleLowerCase().includes(findList.article)) {
						return true;
					}
				});
			}
		}
		if (findList.fact.ob !== 'false' || findList.fact.bp !== 'false' || findList.fact.nt !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.fact.ob !== 'false' && 'Общее' === item.getByFact()) {
						return true;
					}
					if (findList.fact.bp !== 'false' && 'Б/п' === item.getByFact()) {
						return true;
					}
					if (findList.fact.nt !== 'false' && 'Н/т' === item.getByFact()) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.fact.ob !== 'false' && 'Общее' === item.getByFact()) {
						return true;
					}
					if (findList.fact.bp !== 'false' && 'Б/п' === item.getByFact()) {
						return true;
					}
					if (findList.fact.nt !== 'false' && 'Н/т' === item.getByFact()) {
						return true;
					}
				});
			}
		}
		if (findList.type.dna !== 'false' || findList.type.dna_and_hair !== 'false' || findList.type.hair !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.type.dna !== 'false' && 'ДНК' === item.getTypeOfResearch()) return true;
					if (findList.type.dna_and_hair !== 'false' && 'ДНК и волосы' === item.getTypeOfResearch()) return true;
					if (findList.type.hair !== 'false' && 'Волосы' === item.getTypeOfResearch()) return true;
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.type.dna !== 'false' && 'ДНК' === item.getTypeOfResearch()) return true;
					if (findList.type.dna_and_hair !== 'false' && 'ДНК и волосы' === item.getTypeOfResearch()) return true;
					if (findList.type.hair !== 'false' && 'Волосы' === item.getTypeOfResearch()) return true;
				});
			}
		}
		if (findList.exp.hod !== 'false' || findList.exp.kach !== 'false' || findList.exp.hom !== 'false' || findList.exp.kir !== 'false' ||
			findList.exp.sor !== 'false' || findList.exp.bar !== 'false') {

			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.exp.hod !== 'false' && 'Ходырев Н.' === item.getExpertName()) return true;
					if (findList.exp.kach !== 'false' && 'Качечка Е.' === item.getExpertName()) return true;
					if (findList.exp.hom !== 'false' && 'Хоменко А.' === item.getExpertName()) return true;
					if (findList.exp.kir !== 'false' && 'Кирсанова Н.' === item.getExpertName()) return true;
					if (findList.exp.sor !== 'false' && 'Сорокина Е.' === item.getExpertName()) return true;
					if (findList.exp.bar !== 'false' && 'Баркова М.' === item.getExpertName()) return true;
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.exp.hod !== 'false' && 'Ходырев Н.' === item.getExpertName()) return true;
					if (findList.exp.kach !== 'false' && 'Качечка Е.' === item.getExpertName()) return true;
					if (findList.exp.hom !== 'false' && 'Хоменко А.' === item.getExpertName()) return true;
					if (findList.exp.kir !== 'false' && 'Кирсанова Н.' === item.getExpertName()) return true;
					if (findList.exp.sor !== 'false' && 'Сорокина Е.' === item.getExpertName()) return true;
					if (findList.exp.bar !== 'false' && 'Баркова М.' === item.getExpertName()) return true;
				});
			}
		}
		if (findList.status) {
			if (dbOfFindExpertises.length) {
				if (item.getExecution() !== '0' || item.getExecution() !== '') {
					if ((+item.getProlongation() - (new Date())) <= (findList.status * 24 * 60 * 60 * 1000)) {
						return true;
					}
				}
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (item.getExecution() === '0' || item.getExecution() === '') {
						if ((+item.getProlongation() - (new Date())) <= (findList.status * 24 * 60 * 60 * 1000)) {
							return true;
						}
					}
				});
			}
		}
		if (findList.exec.start !== '0' || findList.exec.stop !== '0') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (+item.getExecution() > 0) {
						if (findList.exec.start !== '0' && findList.exec.start > 1388534400000 &&
							findList.exec.stop !== '0' && findList.exec.stop <= +(new Date()) &&
							+findList.exec.start <= +item.getExecution() && +findList.exec.stop >= +item.getExecution()) {
							return true;
						} else if (findList.exec.start !== '0' && findList.exec.start > 1388534400000 &&
							findList.exec.stop === '0' && +findList.exec.start <= +item.getExecution()) {
							return true;
						} else if (findList.exec.stop !== '0' && findList.exec.stop <= +(new Date()) &&
							findList.exec.start === '0' && +findList.exec.stop >= +item.getExecution()) {
							return true;
						}
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (+item.getExecution() > 0) {
						if (findList.exec.start !== '0' && findList.exec.start > 1388534400000 &&
							findList.exec.stop !== '0' && findList.exec.stop <= +(new Date()) &&
							+findList.exec.start <= +item.getExecution() && +findList.exec.stop >= +item.getExecution()) {
							return true;
						} else if (findList.exec.start !== '0' && findList.exec.start > 1388534400000 &&
							findList.exec.stop === '0' && +findList.exec.start <= +item.getExecution()) {
							return true;
						} else if (findList.exec.stop !== '0' && findList.exec.stop <= +(new Date()) &&
							findList.exec.start === '0' && +findList.exec.stop >= +item.getExecution()) {
							return true;
						}
					}
				});
			}
		}
		if (findList.res.pol !== 'false' || findList.res.otr !== 'false' || findList.res.npv !== 'false' || findList.res.bez !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.res.pol !== 'false' && 'Положительный' === item.getResult()) return true;
					if (findList.res.otr !== 'false' && 'Отрицательный' === item.getResult()) return true;
					if (findList.res.npv !== 'false' && 'НПВ' === item.getResult()) return true;
					if (findList.res.bez !== 'false' && 'Без исполнения' === item.getResult()) return true;
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.res.pol !== 'false' && 'Положительный' === item.getResult()) return true;
					if (findList.res.otr !== 'false' && 'Отрицательный' === item.getResult()) return true;
					if (findList.res.npv !== 'false' && 'НПВ' === item.getResult()) return true;
					if (findList.res.bez !== 'false' && 'Без исполнения' === item.getResult()) return true;
				});
			}
		}
		if (findList.taken.pol !== 'false' || findList.taken.otr !== 'false') {
			if (dbOfFindExpertises.length) {
				dbOfFindExpertises = dbOfFindExpertises.filter(item => {
					if (findList.taken.pol !== 'false' && 'true' === item.getReceived()) {
						return true;
					}
					if (findList.taken.otr !== 'false' && 'false' === item.getReceived()) {
						return true;
					}
				});
			} else {
				dbOfFindExpertises = dbOfExpertises.filter(item => {
					if (findList.taken.pol !== 'false' && 'true' === item.getReceived()) {
						return true;
					}
					if (findList.taken.otr !== 'false' && 'false' === item.getReceived()) {
						return true;
					}
				});
			}
		}

		renderDb(dbOfFindExpertises);
	});

	//изменение обработчиков кнопок меню
	btnSearch.removeEventListener('click', forBtnSearchOn);
	btnSearch.addEventListener('click', forBtnSearchOff);
	btnCreateNewExpertise.removeEventListener('click', forBtnReturnToTable);
	btnCreateNewExpertise.addEventListener('click', forBtnCreateNewExpertise);
}

function forBtnSearchOff() {
	btnSearch.style.boxShadow = `1px 1px 1px rgba(0, 0, 0, 0.5), 
	inset 1px 1px 1px rgba(255, 255, 255, 0.2),
	inset -1px -1px 1px rgba(0, 0, 0, 0.5)`;

	sideSearchForm.reset();

	containerMainSideSearchContainer.classList.add('hide');

	renderDb(dbOfExpertises);

	btnSearch.removeEventListener('click', forBtnSearchOff);
	btnSearch.addEventListener('click', forBtnSearchOn);
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

	sideSearchForm.reset();

	const btnAddExp = document.querySelector('.btnAddExp');
	const btnResetExp = document.querySelector('.btnResetExp');
	btnAddExp.removeEventListener('click', forBtnUpdateExp);
	btnResetExp.removeEventListener('click', forBtnDeleteLastExp);
	btnAddExp.removeEventListener('mouseenter', tooltipBtnUpdateExpShow);
	btnResetExp.removeEventListener('mouseenter', forBtnDeleteLastExp);

	btnAddExp.addEventListener('click', forBtnAddNewExp);
	btnResetExp.addEventListener('click', forBtnResetNewExp);
	btnAddExp.addEventListener('mouseenter', tooltipBtnAddExpShow);
	btnResetExp.addEventListener('mouseenter', tooltipBtnResetExpShow);

	btnAddExp.childNodes[1].innerHTML = '<i class="fas fa-plus-circle"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-redo"></i>';

	renderDb(dbOfExpertises);

	//изменение обработчиков кнопки меню
	btnCreateNewExpertise.removeEventListener('click', forBtnReturnToTable);
	btnCreateNewExpertise.addEventListener('click', forBtnCreateNewExpertise);

}

function resetForm(form) {
	form.reset();

	const row1SecondCell1 = document.querySelector('.row1-second-cell1'); // нахождение первой ячейки "ид"
	const row1SecondCell1Nodes = row1SecondCell1.childNodes; // нахождение всех элементов 
	const count = dbOfExpertises.length + 1; // определение номера последней экспертизы
	row1SecondCell1Nodes[1].value = `7/${count}`; // внесение в поле инпут номера экспертизы

	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input'); // нахождение второй ячейки "дата"
	row1SecondCell2.valueAsDate = new Date();
	const row2SecondCell3 = document.querySelector('.row2-second-cell3 input'); // нахождение ячейки "продление"
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
		// String(form.elements.notTaken.checked),
		String(true),
		String(form.elements.received.checked));

	dbOfExpertises.push(exp);

	resetForm(form);

	setExpInDb();
}

function forBtnResetNewExp() {
	const form = document.querySelector('.container-main-workspase-expertise-form'); // нахождение фомы
	resetForm(form);
}

function forBtnUpdateExpertise(data) {

	const form = document.querySelector('.container-main-workspase-expertise-form');
	form.reset();

	const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
	const workspaseTable = document.querySelector('.container-main-workspase-table');
	const workspaseStatus = document.querySelector('.container-main-workspase-status');
	workspaseTable.style.display = 'none';
	workspaseStatus.style.display = 'none';
	workspaseExpertise.style.display = 'flex';

	btnAddExp.childNodes[1].innerHTML = '<i class="far fa-edit"></i>';
	btnResetExp.childNodes[1].innerHTML = '<i class="fas fa-trash-alt"></i>';

	const row1SecondCell1 = document.querySelector('.row1-second-cell1 input');
	const row1SecondCell2 = document.querySelector('.row1-second-cell2 input');
	const row1SecondCell3 = document.querySelector('.row1-second-cell3 select');
	const row1SecondCell4 = document.querySelector('.row1-second-cell4 input');
	const row1SecondCell5 = document.querySelector('.row1-second-cell5 select');
	const row1SecondCell6 = document.querySelector('.row1-second-cell6 input');
	const row1SecondCell7 = document.querySelector('.row1-second-cell7 select');
	const row1SecondCell8 = document.querySelector('.row1-second-cell8 input');
	const row1SecondCell9 = document.querySelector('.row1-second-cell9 input');
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
	row1SecondCell3.value = data.getOrganAppointedExpertise();
	row1SecondCell4.value = data.getUnitOforgan();
	row1SecondCell5.value = data.getOfficialPerson();
	row1SecondCell6.value = data.getNameOfficialPerson();
	row1SecondCell7.value = data.getByTheMaterials();
	row1SecondCell8.value = data.getNumber();
	row1SecondCell9.value = data.getArticle();
	row1SecondCell10.value = data.getByFact();
	row2SecondCell1.value = data.getTypeOfResearch();
	row2SecondCell2.value = data.getExpertName();
	row2SecondCell3.valueAsDate = new Date(+data.getProlongation());
	// row2SecondCell4.valueAsDate = new Date(+data.getExecution());
	if (+data.getExecution()) {
		row2SecondCell4.valueAsDate = new Date(+data.getExecution());
	}
	if (+data.getNotification()) {
		row2SecondCell5.valueAsDate = new Date(+data.getNotification());
	}
	row2SecondCell6.value = data.getResult();
	row2SecondCell7.value = +data.getCountObjectsTotal();
	row2SecondCell8.value = +data.getCountObjectsPositive();
	row2SecondCell9.value = +data.getCountObjectsNegative();

	if (data.getNotTaken() === 'true') {
		row3SecondCell1.checked = true;
	}
	if (data.getReceived() === 'true') {
		row3SecondCell2.checked = true;
		row3SecondCell1.checked = false;
	}

	row3SecondCell1.addEventListener('change', () => {
		if (row3SecondCell1.checked === false) {
			row3SecondCell2.checked = true;
		} else if (row3SecondCell1.checked === true) {
			row3SecondCell2.checked = false;
		}
	});
	row3SecondCell2.addEventListener('change', () => {
		if (row3SecondCell2.checked === false) {
			row3SecondCell1.checked = true;
		}
		if (row3SecondCell2.checked === true) {
			row3SecondCell1.checked = false;
		}
	});

	forDropdownListInRow1SecondCell4Input();

	btnAddExp.removeEventListener('click', forBtnAddNewExp);
	btnAddExp.removeEventListener('click', forBtnAddNewExp);
	btnResetExp.removeEventListener('mouseenter', tooltipBtnAddExpShow);
	btnResetExp.removeEventListener('mouseenter', tooltipBtnResetExpShow);


	btnAddExp.addEventListener('click', forBtnUpdateExp);
	btnResetExp.addEventListener('click', forBtnDeleteLastExp);
	btnAddExp.addEventListener('mouseenter', tooltipBtnUpdateExpShow);
	btnResetExp.addEventListener('mouseenter', tooltipBtnDeleteExpShow);

	row1SecondCell2.addEventListener('change', () => {
		let dateTemp = new Date(row1SecondCell2.value);
		dateTemp = +dateTemp + (15 * 24 * 60 * 60 * 1000);
		row2SecondCell3.valueAsDate = new Date(dateTemp);
	});

}

function forBtnUpdateExp() {
	const form = document.querySelector('.container-main-workspase-expertise-form');
	let id = form.elements.id.value.split('/');

	const exp = new Expertise(
		(form.elements.id.value.split('/'))[1],
		String(+(new Date(form.elements.dateOfReceipt.value))),
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
		String(+(new Date(form.elements.prolongation.value))),
		String(+(new Date(form.elements.execution.value))),
		String(+(new Date(form.elements.notification.value))),
		form.elements.result.value,
		form.elements.countObjectsTotal.value,
		form.elements.countObjectsPositive.value,
		form.elements.countObjectsNegative.value,
		String(form.elements.notTaken.checked),
		String(form.elements.received.checked));

	dbOfExpertises.forEach(item => {
		if (item.id === exp.id) {
			item.id = item.id;
			item.dateOfReceipt = exp.dateOfReceipt;
			item.organAppointedExpertise = exp.organAppointedExpertise;
			item.unitOforgan = exp.unitOforgan;
			item.officialPerson = exp.officialPerson;
			item.nameOfficialPerson = exp.nameOfficialPerson;
			item.byTheMaterials = exp.byTheMaterials;
			item.number = exp.number;
			item.article = exp.article;
			item.byFact = exp.byFact;
			item.typeOfResearch = exp.typeOfResearch;
			item.expertName = exp.expertName;
			item.prolongation = exp.prolongation;
			if (exp.execution >= exp.dateOfReceipt) {
				if (exp.execution !== 'NaN') {
					item.execution = exp.execution;
				}
			} else {
				item.execution = '0';
			}
			item.notification = exp.notification;
			item.result = exp.result;
			item.countObjectsTotal = exp.countObjectsTotal;
			item.countObjectsPositive = exp.countObjectsPositive;
			item.countObjectsNegative = exp.countObjectsNegative;
			item.notTaken = exp.notTaken;
			item.received = exp.received;
		}
	});

	setExpInDb();

	forBtnReturnToTable();
}

function forBtnDeleteLastExp() {
	function forDeleteLastExpInner(db) {
		db.pop();
		const workspaseExpertise = document.querySelector('.container-main-workspase-expertise');
		const workspaseTable = document.querySelector('.container-main-workspase-table');
		const workspaseStatus = document.querySelector('.container-main-workspase-status');
		workspaseExpertise.style.display = 'none';
		workspaseTable.style.display = 'block';
		workspaseStatus.style.display = 'flex';
		setExpInDb();
		renderDb(db);

		btnResetExp.removeEventListener('click', forBtnDeleteLastExp);
		btnResetExp.addEventListener('click', forBtnResetNewExp);
	}
	console.log(dbOfExpertises);
	forDeleteLastExpInner(dbOfExpertises);
	console.log(dbOfExpertises);
}

function tooltipBtnAddExpShow() {
	tooltipBtnAddExp.style.display = 'flex';
	tooltipBtnAddExp.innerText = 'Создать';
}

function tooltipBtnResetExpShow() {
	tooltipBtnResetExp.style.display = 'flex';
	tooltipBtnResetExp.innerText = 'Сбросить';
}

function tooltipBtnCancelExpShow() {
	tooltipBtnCancelExp.style.display = 'flex';
	tooltipBtnCancelExp.innerText = 'Закрыть';
}

function tooltipBtnUpdateExpShow() {
	tooltipBtnAddExp.style.display = 'flex';
	tooltipBtnAddExp.innerText = 'Обновить';
}

function tooltipBtnDeleteExpShow() {
	tooltipBtnResetExp.style.display = 'flex';
	tooltipBtnResetExp.innerText = 'Удалить';
}

function tooltipBtnExpHide() {
	tooltipBtnAddExp.style.display = 'none';
	tooltipBtnResetExp.style.display = 'none';
	tooltipBtnCancelExp.style.display = 'none';
}

//объявление методов конец
//----------------------------------------------------------------------
//объявление обработчиков событий начало

btnCreateNewExpertise.addEventListener('click', forBtnCreateNewExpertise);
btnSearch.addEventListener('click', forBtnSearchOn);

function selectRow(allRows) {
	allRows.forEach(element => {
		element.addEventListener('click', (event) => {
			const id = event.currentTarget.getAttribute('id');
			dbOfExpertises.forEach(element => {
				if (element.getId() === id) {
					forBtnUpdateExpertise(element);
				}
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

btnAddExp.addEventListener('mouseenter', tooltipBtnAddExpShow);
btnAddExp.addEventListener('mouseleave', tooltipBtnExpHide);

btnResetExp.addEventListener('mouseenter', tooltipBtnResetExpShow);
btnResetExp.addEventListener('mouseleave', tooltipBtnExpHide);

btnCancelExp.addEventListener('mouseenter', tooltipBtnCancelExpShow);
btnCancelExp.addEventListener('mouseleave', tooltipBtnExpHide);

//обработчики элементов панели поиска
sideSearchBtnDateOfReceipt.addEventListener('click', () => sideSearchDropdownDateOfReceipt.classList.toggle('hide'));
sideSearchBtnOrgan.addEventListener('click', () => sideSearchDropdownOrgan.classList.toggle('hide'));
sideSearchBtnUnit.addEventListener('click', () => sideSearchDropdownUnit.classList.toggle('hide'));
sideSearchBtnMaterial.addEventListener('click', () => sideSearchDropdownMaterial.classList.toggle('hide'));
sideSearchBtnNumber.addEventListener('click', () => sideSearchDropdownNumber.classList.toggle('hide'));
sideSearchBtnArticle.addEventListener('click', () => sideSearchDropdownArticle.classList.toggle('hide'));
sideSearchBtnFact.addEventListener('click', () => sideSearchDropdownFact.classList.toggle('hide'));
sideSearchBtnType.addEventListener('click', () => sideSearchDropdownType.classList.toggle('hide'));
sideSearchBtnExp.addEventListener('click', () => sideSearchDropdownExp.classList.toggle('hide'));
sideSearchBtnStatus.addEventListener('click', () => sideSearchDropdownStatus.classList.toggle('hide'));
sideSearchBtnExec.addEventListener('click', () => sideSearchDropdownExec.classList.toggle('hide'));
sideSearchBtnRes.addEventListener('click', () => sideSearchDropdownRes.classList.toggle('hide'));
sideSearchBtnTaken.addEventListener('click', () => sideSearchDropdownTaken.classList.toggle('hide'));
// sideSearchBtnPrint.addEventListener('click', () => window.print());
sideSearchBtnPrint.addEventListener('click', () => {

	let w = window.open();
	const head = `<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="expires" content="0">
	<link rel="apple-touch-icon" sizes="180x180" href="src/img/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="src/img/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="src/img/favicon-16x16.png">
	<link rel="manifest" href="src/img/site.webmanifest">

	<link rel="stylesheet" href="src/css/style.css">
	<link rel="stylesheet" href="src/css/all.css">
	<title>Doc for print</title>
	</head>`;

	let print = new Promise(function (resolve, reject) {
		w.document.open();
		w.document.write(head);
		w.document.write(document.querySelector('.container-main-workspase-table').innerHTML);
		w.document.close();
		setTimeout(() => resolve(), 5);
		// resolve();
	});
	print.then(() => w.print());

});

window.addEventListener('keyup', forKeyUpEscape);

//объявление обработчиков событий конец
//----------------------------------------------------------------------
//запуск приложения начало
init();


//запуск приложения конец
//----------------------------------------------------------------------