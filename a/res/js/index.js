var createExpenseButton = document.getElementById('add-expense-button');
createExpenseButton.addEventListener('click', function(){
	createExpenseButton.style.display = 'none';
	document.getElementById('add-expense-form').style.display = 'block';
});

document.getElementById('refresh-button').addEventListener('click', function() {
	location.reload();	
});

checkLogin();

getCategorys();
getRegions();
getRecipients();
getExpenses();

function checkLogin() {
	fetch("/expenses", {
		credentials: 'include'
	})
		.then(response => {
			if (response.status !== 200) {
				window.location.assign("/a/login.html");
			}
		})
}

function getCategorys() {
	var categorySelect = document.getElementById('category-select');

	fetch("/categorys", {
		credentials: 'include'
	})
		.then(response => response.json())
		.then(categorys => {
			categorys.forEach(category => {
				var option = document.createElement('option')
				option.innerHTML = category.description;
				option.value = category.id;

				categorySelect.appendChild(option)
			})
		})
}

function getRegions() {
	var regionSelect = document.getElementById('region-select');

        fetch("/regions", {
                credentials: 'include'
        })
                .then(response => response.json())
                .then(regions => {
                        regions.forEach(region => {
                                var option = document.createElement('option')
                                option.innerHTML = region.description;
                                option.value = region.id;

                                regionSelect.appendChild(option)
                        })
                })
}

function getRecipients() {
	var sourceSelect = document.getElementById('source-select');
	var destinationSelect = document.getElementById('destination-select');

        fetch("/recipients", {
                credentials: 'include'
        })
                .then(response => response.json())
                .then(recipients => {
                        recipients.forEach(recipient => {
                                var option = document.createElement('option')
                                option.innerHTML = recipient.name;
                                option.value = recipient.id;
                                var option2 = document.createElement('option')
                                                            option2.innerHTML = recipient.name;
                                                            option2.value = recipient.id;
                                sourceSelect.appendChild(option);
				destinationSelect.appendChild(option2);
                        })
                })
}

function getExpenses() {
	var timeline = document.getElementById('timeline-content');
	
	fetch("/expenses", {
		credentials: 'include'
	})
		.then(response => response.json())
		.then(expenses => {
			var counter = 0;
			expenses.forEach(expense => {
				counter += 1;
				
				var timelineExpense = document.createElement('div');
				timelineExpense.classList.add('timeline-expense');
				var container = document.createElement('div');
				if (counter % 2 === 0){
					container.classList.add('content-right-container');
				}
				else {
					container.classList.add('content-left-container');
				}
				var content = document.createElement('div');
				if (counter % 2 === 0){
					content.classList.add('content-right');
				}
				else {
					content.classList.add('content-left');
				}
				var description = document.createElement('p');
				description.classList.add('description');
				var category = document.createElement('p');
				category.classList.add('category');
				var source = document.createElement('p');
				source.classList.add('source');
				var destination = document.createElement('p');
				destination.classList.add('destination');
				var region = document.createElement('p');
				region.classList.add('region');
				var amount = document.createElement('span');
				amount.classList.add('amount');
				var meta = document.createElement('div');
				meta.classList.add('meta-date');
				var date = document.createElement('span');
				date.classList.add('date');
				var month = document.createElement('span');
				month.classList.add('month');
			
				if(expense.description.Valid){
					description.innerHTML = expense.description.String;
				}
				
				category.innerHTML = "Category: " + expense.category.description;
				region.innerHTML = "Region: " + expense.region.description;
				source.innerHTML = "Source: " + expense.source.name;
				destination.innerHTML = "Destination: " + expense.destination.name

				amount.innerHTML = expense.amount + " &euro;";

				var time = expense.date.Time;
				date.innerHTML = time.substring(8,10);
				month.innerHTML = time.substring(5,7);
			
				var deleteForm = document.createElement("form");
				deleteForm.action = "/expense/delete/" + expense.id;
				deleteForm.method = "post";
				var deleteButton = document.createElement("input");
				deleteButton.type = "submit";
				deleteButton.value = "X";
				deleteForm.classList.add('delete');
				deleteButton.classList.add('deleteButton');

				deleteForm.appendChild(deleteButton);
				content.appendChild(description);
				content.appendChild(category);
				content.appendChild(region);
				content.appendChild(source);
				content.appendChild(destination);
				content.appendChild(amount);
				content.appendChild(deleteForm);
				container.appendChild(content);
				timelineExpense.appendChild(container);
				meta.appendChild(date);
				meta.appendChild(month);
				timelineExpense.appendChild(meta);
				timeline.appendChild(timelineExpense);
				
				
			})
		})
}
