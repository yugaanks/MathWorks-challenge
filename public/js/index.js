function showAddForm(){ 
	if(document.getElementById('add').style.visibility==='hidden')
		document.getElementById('add').style.visibility='visible';
	else
		document.getElementById('add').style.visibility='hidden';
}

function showDeleteForm(){ 
	if(document.getElementById('delete').style.visibility==='hidden')
		document.getElementById('delete').style.visibility='visible';
	else
		document.getElementById('delete').style.visibility='hidden';
}

function showUserForm(){ 
	if(document.getElementById('user').style.visibility==='visible')
		document.getElementById('user').style.visibility='hidden';
	else 
		document.getElementById('user').style.visibility='visible';
}

function getUserFormSubmit() {
	var username=document.getElementById("userInput").value;
	document.getElementById("getUserForm").action = `http://localhost:3000/users/${username}`;
	return true;
}

function deleteUserFormSubmit(e) {
	//console.log(document.getElementById("usernameInput").value);
	var username=document.getElementById("deleteUserInput").value;
	if(username.length>0){
		var xhttp = new XMLHttpRequest();
		xhttp.open("DELETE", `/users/${username}`, true);
		xhttp.onload = function () {
			document.getElementById("status").innerHTML=xhttp.responseText+" - "+xhttp.status;
			if (xhttp.readyState == 4 && xhttp.status == "200") {
				console.log("delete successfull");
			} else {
				console.error("Delete Unsuccessfull");
			}
		}
		xhttp.send(null);
	}
	e.preventDefault()
	return false;
}

function setFormAction() {
	var username=document.getElementById("usernameInput").value;
	document.myForm.action = `/users/${username}`;
	return true;
}