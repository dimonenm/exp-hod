const btn = document.querySelector('.patch');
const first = document.querySelector('.first');
const second = document.querySelector('.second');



btn.addEventListener('click', () => {
  let dbOfExpertises;

  const getDb = () => {
    fetch('../../src/db/dbExpertises.json')
      .then(response => response.json())
      .then(db => {
        dbOfExpertises = db.map(item => {
          return new Expertise(item.id, item.dateOfReceipt, item.organAppointedExpertise, item.unitOforgan,
            item.officialPerson, item.nameOfficialPerson, item.byTheMaterials, item.number,
            item.article, item.byFact, item.typeOfResearch, item.expertName, item.prolongation,
            item.execution, item.notification, item.result, item.countObjectsTotal,
            item.countObjectsPositive, item.countObjectsNegative, item.notTaken, item.received);
        });
        first.value = "33";
        dbOfExpertises.forEach(item => {
          item.expertId = '1';
        });
        first.value = "66";
      }).then(() => {
        fetch('changeDB.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dbOfExpertises)
        }).then(res => res.text()).then(res => {
          first.value = "100";
          console.log('Change db - ' + res);
        });
      });
  };

  const copyFiles = () => {
    second.value = '20';
    fetch('copyFiles.php').then(res => res.text()).then(res => {
      second.value = "100";
      console.log('Copy files - ' + res);
    });
  }

  getDb();
  copyFiles()

});