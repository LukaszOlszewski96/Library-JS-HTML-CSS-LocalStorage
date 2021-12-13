window.onload=function(){
	list();
	document.getElementById('formulage').addEventListener('submit', add);
	document.getElementById('formulage').addEventListener('submit', list);
}

//Save event
function add(e){
	var title = document.getElementById('txtTitle').value;
	var author = document.getElementById('txtAuthor').value;
	var priority = document.getElementById('txtPrio').value;
	var category = document.getElementById('txtCat').value;
	var p = {
		title : title,
		author : author,
		priority : priority,
		category : category
	}

		addLS(p);

	//blocking page refreshing
	e.preventDefault();
}

//add to LS
function addLS(p){	
	var obj= [];	
	var idBook = 1;	
	if(localStorage.getItem('value') !== null ){
		obj = JSON.parse(localStorage.getItem('value')); 
				
		if(obj.length > 0)
			idBook= 	(function obterIdValido() {
							for(var i = 0; i < obj.length; i++)
								if(obj[i].Id != i+1)
									return i + 1;							
							return obj[obj.length - 1].Id + 1;
						})();
	}	
	
	var data = {
		Id: idBook,
		Title: p.title,
		Author: p.author,
		Priority: p.priority,
		Category : p.category
	};
	
	//Add object to last index of array
	obj.push(data);	
	//ID sort
	obj.sort(function(a,b) {
		return a.Id - b.Id;
	});
	//Stores in LS
	localStorage.setItem('value', JSON.stringify(obj));
	//reset input after add
	document.getElementById('formulage').reset();
}

//
//Delete function = Localstorage = Table
function deleteBook(cod){
	var obj = JSON.parse(localStorage.getItem('value'));

	for(var i = 0; i < obj.length; i++)
		if(obj[i].Id == cod)
			obj.splice(i, 1);

	localStorage.setItem('value', JSON.stringify(obj));
	list();

	if(obj.length == 0)
		window.localStorage.removeItem("value");
}

//
//List of books = table
function list(){
	if(localStorage.getItem('value') === null)
		return;

	var obj = JSON.parse(localStorage.getItem('value'));
	var tbody = document.getElementById("tbodyResult");

	tbody.innerHTML = '';

	for(var i = 0; i < obj.length; i++){
		var	id = obj[i].Id,
		    title = obj[i].Title,
		    author = obj[i].Author,
		    priority = obj[i].Priority,
			category = obj[i].Category

		tbody.innerHTML += '<tr id="rowTable'+i+'">'+
								'<td>'+id+'</td>'+
								'<td>'+title+'</td>'+
								'<td>'+author+'</td>'+
								'<td>'+priority+'</td>'+
								'<td>'+category+'</td>'+
								'<td><a class="large material-icons" onclick="deleteBook(\'' + id + '\')">delete_forever</a></td>'+
						   '</tr>';		
	}
}