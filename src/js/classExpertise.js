//объявление классов начало
class Expertise {
	constructor(id, dateOfReceipt, organAppointedExpertise, unitOforgan, officialPerson, nameOfficialPerson, byTheMaterials,
		number, article, byFact, typeOfResearch, expertName, prolongation, execution, notification, result, countObjectsTotal, countObjectsPositive,
		countObjectsNegative, notTaken, received, expertId) {
		this.id = id;
		this.dateOfReceipt = dateOfReceipt;
		this.organAppointedExpertise = organAppointedExpertise;
		this.unitOforgan = unitOforgan;
		this.officialPerson = officialPerson;
		this.nameOfficialPerson = nameOfficialPerson;
		this.byTheMaterials = byTheMaterials;
		this.number = number;
		this.article = article;
		this.byFact = byFact;
		this.typeOfResearch = typeOfResearch;
		this.expertName = expertName;
		this.prolongation = prolongation;
		this.execution = execution;
		this.notification = notification;
		this.result = result;
		this.countObjectsTotal = countObjectsTotal;
		this.countObjectsPositive = countObjectsPositive;
		this.countObjectsNegative = countObjectsNegative;
		this.notTaken = notTaken;
		this.received = received;
		this.expertId = expertId;
	}

	getId() { return +this.id; }
	getDateOfReceipt() { return this.dateOfReceipt; }
	getOrganAppointedExpertise() { return this.organAppointedExpertise; }
	getUnitOforgan() { return this.unitOforgan; }
	getOfficialPerson() { return this.officialPerson; }
	getNameOfficialPerson() { return this.nameOfficialPerson; }
	getByTheMaterials() { return this.byTheMaterials; }
	getNumber() { return this.number; }
	getArticle() { return this.article; }
	getByFact() { return this.byFact; }
	getTypeOfResearch() { return this.typeOfResearch; }
	getExpertName() { return this.expertName; }
	getProlongation() { return this.prolongation; }
	getExecution() { return this.execution; }
	getNotification() { return this.notification; }
	getResult() { return this.result; }
	getCountObjectsTotal() { return this.countObjectsTotal; }
	getCountObjectsPositive() { return this.countObjectsPositive; }
	getCountObjectsNegative() { return this.countObjectsNegative; }
	getNotTaken() { return this.notTaken; }
	getReceived() { return this.received; }
	getExpertId() {	return this.expertId; }
}
//объявление классов конец
//----------------------------------------------------------------------