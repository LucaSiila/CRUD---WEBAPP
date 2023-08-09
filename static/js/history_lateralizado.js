// AJAX call to fetch cadastre names
var cadastreNames = [];
$.get('/get_cadastre_names', function(data) {
    cadastreNames = data;
});

// Initialize the Tabulator table
$(document).ready(function () {
    var table = new Tabulator("#history-lateralizado-table", {
        ajaxURL:"/get_history_lateralizado_data",
        layout:"fitDataStretch",
        responsiveLayout:"hide",
        tooltips:true,
        addRowPos:"top",
        history:true,
        pagination:"local",
        paginationSize:25,
        paginationSizeSelector:[25, 50, 100, 200],
        movableColumns:true,
        resizableRows:true,
        initialSort:[
            {column:"HISTORY_ID", dir:"desc"},
        ],
        columns: [
			{title:"SIILA3 ID", field:"SIILA3_ID"},
			{title:"Market", field:"Market"},
			{title:"Property Type", field:"Property Type"},
			{title:"SiiLA ID", field:"SiiLA_ID"},
			{title:"NOME", field:"NOME"},
			{title:"REGIÃO SiiLA", field:"REGIÃO_SiiLA"},
			{title:"CLASSE", field:"CLASSE"},
			{title:"DATA DE ENTREGA", field:"DATA DE ENTREGA"},
			{title:"STATUS", field:"STATUS"},
			{title:"ANDAR", field:"ANDAR"},
			{title:"CONJUNTO", field:"CONJUNTO"},
			{title:"AREA CONJ./ANDAR", field:"AREA_CONJ./ANDAR"},
			{
				title: "201504", field: "201504",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201601", field: "201601",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201602", field: "201602",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201604", field: "201604",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201701", field: "201701",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201702", field: "201702",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201703", field: "201703",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201704", field: "201704",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201801", field: "201801",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201802", field: "201802",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201803", field: "201803",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201804", field: "201804",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201901", field: "201901",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201902", field: "201902",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201903", field: "201903",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "201904", field: "201904",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202001", field: "202001",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202002", field: "202002",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202003", field: "202003",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202004", field: "202004",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202101", field: "202101",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202102", field: "202102",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202103", field: "202103",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202104", field: "202104",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202201", field: "202201",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202202", field: "202202",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202203", field: "202203",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202204", field: "202204",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202301", field: "202301",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202302", field: "202302",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},
			{
				title: "202303", field: "202303",
				editor: "autocomplete",
				editorParams: {
					allowEmpty: true,
					showListOnEmpty: true,
					values: cadastreNames
				}
			},

			{title:"Industry", field:"Industry"},
			{title:"Registry", field:"Registry"},
			{
				title:"Tenant Contact",
				field:"Tenant Contact",
				cellClick: function (e, cell) {
					showPopup(cell.getRow().getData().SIILA3_ID, cell.getColumn().getDefinition().field);
				}
			},
			{
				title:"Tenant Contact Phone",
				field:"Tenant Contact Phone",
				cellClick: function (e, cell) {
					showPopup(cell.getRow().getData().SIILA3_ID, cell.getColumn().getDefinition().field);
				}
			},
			{
				title:"Tenant Contact Email",
				field:"Tenant Contact Email",
				cellClick: function (e, cell) {
					showPopup(cell.getRow().getData().SIILA3_ID, cell.getColumn().getDefinition().field);
				}
			},
			{title:"DELIVERY PERIOD", field:"DELIVERY_PERIOD"},
		],
        cellEdited:function(cell) {
            // Get the new and old values
            var newValue = cell.getValue();
            var oldValue = cell.getOldValue();

            // Get the row and column data
            var row = cell.getRow().getData();
            var column = cell.getColumn().getDefinition();

            // Calculate the ID_UNIQUE
            var ID_UNIQUE;
            if (column.field === 'ID_CONT_TENANT') {
                ID_UNIQUE = row.SIILA3_ID + "_202303";
            } else {
                ID_UNIQUE = row.SIILA3_ID + "_" + column.field;
            }

            // Send an AJAX POST request to update the database
            $.post("/update_history_lateralizado_table", {
                tablename: "history_lateralizado",
                tableid: ID_UNIQUE,
                columnname: column.field,
                newvalue: newValue,
                oldvalue: oldValue
            }, function (data, status) {
                if (status !== 'success' || data.status !== 'success') {
                    cell.setValue(oldValue);
                }
            });
        },
    });

    setTimeout(function(){
        table.setData("/get_history_lateralizado_data");
    }, 1000);
	
	document.getElementById("search").addEventListener("input", function(e){
		table.setFilter([
			{field:"SIILA3_ID", type:"like", value:e.target.value},
			{field:"Market", type:"like", value:e.target.value},
			{field:"Property Type", type:"like", value:e.target.value},
			{field:"SiiLA_ID", type:"like", value:e.target.value},
			{field:"NOME", type:"like", value:e.target.value},
			{field:"REGIÃO_SiiLA", type:"like", value:e.target.value},
			{field:"CLASSE", type:"like", value:e.target.value},
			{field:"DATA DE ENTREGA", type:"like", value:e.target.value},
			{field:"STATUS", type:"like", value:e.target.value},
			{field:"ANDAR", type:"like", value:e.target.value},
			{field:"CONJUNTO", type:"like", value:e.target.value},
			{field:"AREA_CONJ./ANDAR", type:"like", value:e.target.value},
			{field:"201504", type:"like", value:e.target.value},
			{field:"201601", type:"like", value:e.target.value},
			{field:"201602", type:"like", value:e.target.value},
			{field:"201604", type:"like", value:e.target.value},
			{field:"201701", type:"like", value:e.target.value},
			{field:"201702", type:"like", value:e.target.value},
			{field:"201703", type:"like", value:e.target.value},
			{field:"201704", type:"like", value:e.target.value},
			{field:"201801", type:"like", value:e.target.value},
			{field:"201802", type:"like", value:e.target.value},
			{field:"201803", type:"like", value:e.target.value},
			{field:"201804", type:"like", value:e.target.value},
			{field:"201901", type:"like", value:e.target.value},
			{field:"201902", type:"like", value:e.target.value},
			{field:"201903", type:"like", value:e.target.value},
			{field:"201904", type:"like", value:e.target.value},
			{field:"202001", type:"like", value:e.target.value},
			{field:"202002", type:"like", value:e.target.value},
			{field:"202003", type:"like", value:e.target.value},
			{field:"202004", type:"like", value:e.target.value},
			{field:"202101", type:"like", value:e.target.value},
			{field:"202102", type:"like", value:e.target.value},
			{field:"202103", type:"like", value:e.target.value},
			{field:"202104", type:"like", value:e.target.value},
			{field:"202201", type:"like", value:e.target.value},
			{field:"202202", type:"like", value:e.target.value},
			{field:"202203", type:"like", value:e.target.value},
			{field:"202204", type:"like", value:e.target.value},
			{field:"202301", type:"like", value:e.target.value},
			{field:"202302", type:"like", value:e.target.value},
			{field:"202303", type:"like", value:e.target.value},
			{field:"Industry", type:"like", value:e.target.value},
			{field:"Registry", type:"like", value:e.target.value},
			{field:"Tenant Contact", type:"like", value:e.target.value},
			{field:"Tenant Contact Phone", type:"like", value:e.target.value},
			{field:"Tenant Contact Email", type:"like", value:e.target.value},
			{field:"DELIVERY PERIOD", type:"like", value:e.target.value},
		]);
	});
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