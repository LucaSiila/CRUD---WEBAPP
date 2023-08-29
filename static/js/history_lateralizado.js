	// AJAX call to fetch cadastre names
	var cadastreNames = [];
	$.get('/get_cadastre_names', function(data) {
		cadastreNames = data;
	});


	function showPopup(historyId, columnName) {
		$.get(`/get_data_from_table?table=contact_table`, function(data) {
			// Clear the existing table
			document.querySelector(".modal-body table").innerHTML = "";

			// Create a new table row for each data row
			data.forEach(function (row) {
				var tr = document.createElement("tr");

				// Create a new table cell for each column in the row
				for (var column in row) {
					var td = document.createElement("td");
					td.textContent = row[column];
					tr.appendChild(td);
				}

				// Add a click event listener to each row
				tr.addEventListener("click", function () {
					// Set the selectedId attribute of the modal selection button
					document.querySelector('.modal-footer .modal-button').setAttribute('data-selected-id', row.contact_id);

					// Set the historyId and columnName attributes of the modal
					document.getElementById('dataModal').setAttribute('data-history-id', historyId);
					document.getElementById('dataModal').setAttribute('data-column-name', columnName);
				});

				// Add the row to the table
				document.querySelector(".modal-body table").appendChild(tr);
			});

			// Display the modal
			document.getElementById('dataModal').style.display = 'block';
		});
	}

	function handleModalSelection() {
		var selectedId = document.querySelector('.modal-footer .modal-button').getAttribute('data-selected-id');
		var historyId = document.getElementById('dataModal').getAttribute('data-history-id');
		var columnName = document.getElementById('dataModal').getAttribute('data-column-name');
		if (!selectedId || selectedId === 'undefined') {
			alert("Please select a valid entry.");
			return;
		}

		var ID_UNIQUE = historyId + "_" + columnName;

		updateOriginalTable(ID_UNIQUE, selectedId);
	}

	function updateOriginalTable(ID_UNIQUE, selectedId) {
		var data = {
			tablename: "history_lateralizado",
			tableid: ID_UNIQUE,
			columnname: "ID_CONT_TENANT",
			newvalue: selectedId
		};

		$.post('/update_history_lateralizado_table', data, function(response) {
			if (response.status === 'success') {
				console.log("Update successful");
				document.getElementById('dataModal').style.display = 'none';
			} else {
				console.error("Update failed:", response.message);
			}
		});
	}

	function updateOriginalTable(selectedId) {
		if (!selectedId || selectedId === 'undefined') {
			console.error("Invalid selectedId:", selectedId);
			return;
		}

		var modal = document.getElementById('dataModal');
		var tableType = modal.getAttribute('data-table-type');
		var historyId = modal.getAttribute('data-history-id'); 

		var data = {
			tableType: tableType,
			selectedId: selectedId,
			ID_UNIQUE: historyId
		};

		$.post('/update_original_table', data, function(response) {
			if (response.success) {
				console.log("Update successful");
				modal.style.display = 'none';
			} else {
				console.error("Update failed:", response.message);
			}
		});
	}

	function applyFilters() {
		currentPropertyType = document.getElementById('propertyType').value;
		currentMarketName = document.getElementById('marketName').value;

		// Save the filters to localStorage
		localStorage.setItem('currentPropertyType', currentPropertyType);
		localStorage.setItem('currentMarketName', currentMarketName);

		// Log the values to ensure they're set correctly
		console.log('Set Filters:', {
			propertyType: localStorage.getItem('currentPropertyType'),
			marketName: localStorage.getItem('currentMarketName')
		});

		// Hide the modal
		document.getElementById('filterModal').style.display = 'none';

		// Fetch data using the selected filters
		refreshTableData(currentPropertyType, currentMarketName);
	}

	document.querySelector('.modal-footer .modal-button').addEventListener('click', function() {
		var selectedId = this.getAttribute('data-selected-id');
		if (!selectedId || selectedId === 'undefined') {
			alert("Please select a valid entry.");
			return;
		}
		updateOriginalTable(selectedId);
	});

	
	function updateFrozenColumns() {
		// Get all checked checkboxes
		const checkedBoxes = $("#freezeColumnOptions input[type='checkbox']:checked");
		const columnsToFreeze = [];
	
		// Loop through each checked checkbox and add its value to the columnsToFreeze array
		checkedBoxes.each(function() {
			columnsToFreeze.push($(this).val());
		});
	
		// Assuming your Tabulator table instance is stored in a variable called 'table'
		// Update the frozen columns in your table
		table.updateConfig({
			columns: table.getColumns().map(col => {
				if (columnsToFreeze.includes(col.getField())) {
					col.update({frozen: true});
				} else {
					col.update({frozen: false});
				}
				return col;
			})
		});
	}
	

$('#updateFrozenColumns').click(updateFrozenColumns);