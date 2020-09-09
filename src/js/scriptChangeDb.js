let dbOfExpertises;

const getDb = () => {
  fetch('src/db/dbExpertises.json')
    .then(response => response.json())
    .then(db => {
      dbOfExpertises = db.map(item => {
        return new Expertise(item.id, item.dateOfReceipt, item.organAppointedExpertise, item.unitOforgan, item.officialPerson,
          item.nameOfficialPerson, item.byTheMaterials, item.number, item.article, item.byFact, item.typeOfResearch,
          item.expertName, item.prolongation, item.execution, item.notification, item.result, item.countObjectsTotal,
          item.countObjectsPositive, item.countObjectsNegative, item.notTaken, item.received);
      })
      dbOfExpertises.forEach(item => {
        if (item.organAppointedExpertise === 'УМВД') {
          item.organAppointedExpertise = 'МВД';
        }
      })
    }).then(
      fetch('changeDB.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dbOfExpertises)
      })
    ).then(res => console.log(dbOfExpertises))

};
getDb();