$(function() {
  $(document).bind('ready scroll', function() {
	   	var docScroll = $(document).scrollTop();
		  if (docScroll >= 100 & $('html').height() > 768) {
			  if (!$('body').hasClass('sticky')) {
				  $('body').addClass('sticky');
  			}
	  	} else {
		  	$('body').removeClass('sticky');
		  	$('.site-nav').removeAttr('style');
	  	}
    });
  
  $('.site-nav a').click(function(e){
    if(!$(this).hasClass('search-trigger'))
    {
      $('.site-nav a.active').removeClass('active');
      $(this).addClass('active');
    }
    $(this).blur()
    e.preventDefault();
  });
});

var sn = 1;

function delRow(Row) {
    var elem = document.getElementById(Row);
    elem.parentNode.removeChild(elem);
}

function onDeviceReady() {
    var db = window.openDatabase("mydatabase", "1.0", "Contracts", 200000);
    console.log(db);
    db.transaction(populateDB, errorCB, successCB);
}

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS CONTRACT (Title UNIQUE, SerialNumber INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, CompanyName, ContactName, ContactAddr, Start, End, Email, Notes)');
}
//called to display all information from DB
function queryDB(tx) {
    tx.executeSql('SELECT * FROM CONTRACT', [], querySuccess, errorCB);
}

//called ti display certain information from DB
function searchQueryDB(tx) {
    tx.executeSql("SELECT * FROM CONTRACT where SerialNumber like ('%" + document.getElementById("Search").value + "%') OR Title like ('%" + document.getElementById("Search").value + "%') OR CompanyName like ('%" + document.getElementById("Search").value + "%')", [], querySuccess, errorCB);
}

function goSearch() {
    var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
    db.transaction(searchQueryDB, errorCB);
}

//callback for queryDb and searchQueryDB where they return the trasaction as tx and the results of the query as results
function querySuccess(tx, results) {
    //set headers for table
    var tblText = '<table id="Table1"><tr><th>Serial Num</th> <th>Title</th> <th>Company</th></tr>';
    var len = results.rows.length;
    //add row and onclick for each result from query
    for (var i = 0; i < len; i++) {
        var tmpArgs = results.rows.item(i).SerialNumber;
        tblText += '<tr onclick="openContract(' + tmpArgs + ');"><td>' + results.rows.item(i).SerialNumber + '</td><td>'
            + results.rows.item(i).Title + '</td><td>' + results.rows.item(i).CompanyName + '</td></tr>';
    }
    tblText += "</table>";
    document.getElementById("tblDiv").innerHTML = tblText;
}

function errorCB(err) {
    console.log(err);
    alert("Error processing SQL: " + err.code);
}

function successCB() {
    document.getElementById("Search").innerHTML = "";
    var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
    //console.log(db);
    db.transaction(queryDB, errorCB);
}

function NewContract()  {
    document.getElementById("NewContractPopup").style.display = "block";
    var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
    db.transaction(insertDB, errorCB, successCB);
    document.getElementById("NewContractPopup").style.display = "none";
}

function insertDB(tx) {
    tx.executeSql('INSERT INTO CONTRACT (Title, CompanyName, ContactName, ContactAddr, Start, End, Email, Notes) VALUES ("' + document.getElementById("NewTitle").value
        + '","' + document.getElementById("NewComName").value + '","' + document.getElementById("NewConName").value + '","' + document.getElementById("NewConAddr").value +
        '","' + document.getElementById("NewStart").value + '","' + document.getElementById("NewEnd").value + '","' + document.getElementById("NewEmail").value +
        '","' + document.getElementById("NewNotes").value + '")');
}

function DeleteContract() {
    var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
    db.transaction(deleteRow, errorCB);
    document.getElementById("EditContractPopup").style.display = "none";
}

function deleteRow(tx) {
    tx.executeSql('DELETE FROM CONTRACT WHERE SerialNumber = ' + sn, [], successCB, errorCB);
}

//change html file when row is clicked in table, sedn serial number
function openContract(SerialNumber) {
    sn = SerialNumber;
    document.getElementById("EditContractPopup").style.display = "block";
    var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
    db.transaction(loadRow, errorCB);
}

function loadRow(tx) {
    console.log(sn);
    tx.executeSql('SELECT * FROM CONTRACT where SerialNumber = ' + sn, [], openRow, errorCB);
}

function openRow(tx, results) {

    document.getElementById("EditTitle").value = results.rows.item(0).Title;
    document.getElementById("EditSerial").value = results.rows.item(0).SerialNumber;
    document.getElementById("EditComName").value = results.rows.item(0).CompanyName;
    document.getElementById("EditConName").value = results.rows.item(0).ContactName
    document.getElementById("EditConAddr").value = results.rows.item(0).ContactAddr;
    document.getElementById("EditStart").value = results.rows.item(0).Start;
    document.getElementById("EditEnd").value = results.rows.item(0).End;
    document.getElementById("EditEmail").value = results.rows.item(0).Email;
    document.getElementById("EditNotes").value = results.rows.item(0).Notes;
}

function SaveContract() {
    if (document.getElementById("EditTitle").value == "") {
        document.getElementById("EditTitle").style.borderColor = "red";
        document.getElementById("EditTitle").setAttribute("placeholder", "Please Enter a Title");
    }
    else if (document.getElementById("EditComName").value == "") {
        document.getElementById("EditComName").style.borderColor = "red";
        document.getElementById("EditComName").setAttribute("placeholder", "Please Enter a Company Name");
    }
    else {
        var db = window.openDatabase("Database", "1.0", "ContractDB", 200000);
        db.transaction(editRow, errorCB);
        document.getElementById("EditContractPopup").style.display = "none";
    }
}

function editRow(tx) {
    tx.executeSql('UPDATE CONTRACT SET Title ="' + document.getElementById("EditTitle").value +
        '", CompanyName= "' + document.getElementById("EditComName").value + '", ContactName= "' + document.getElementById("EditConName").value + '", ContactAddr= "' + document.getElementById("EditConAddr").value +
        '", Start= "' + document.getElementById("EditStart").value + '", End= "' + document.getElementById("EditEnd").value + '", Email= "' + document.getElementById("EditEmail").value +
        '", Notes= "' + document.getElementById("EditNotes").value + '" WHERE SerialNumber = '
        + sn, [], successCB, errorCB);
}