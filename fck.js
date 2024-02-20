fetch("http://eps.boesl.gov.bd/")
.then(res => console.log(res.text()))
.catch(err => console.log(err))