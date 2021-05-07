




function GetOrdersList() {

    $.ajax({
        url: 'api/orders',
        data: "",
        type: "GET",
        dataType: "json",
        success: function (orderCount) {
            OrderListSuccess(orderCount);
            console.log(orderCount);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function OrderListSuccess(orderCount) {
    // Iterate over the collection of data
    $.each(orderCount, function (index, order) {
        // Add a row to the Order Detail table
        orderAddRow(order);
        console.log(order);
    });
}

function orderAddRow(order) {
    // Check if <tbody> tag exists, add one if not
    if ($("#orderTable tbody").length == 0) {
        $("#orderTable").append("<tbody></tbody>");
        console.log(order);
    }
    // Append row to <table>
    $("#orderTable tbody").append(
        orderBuildTableRow(order));
}

function orderBuildTableRow(order) {
    var ret =
        "<tr>" +
        "<td>" + order.Store + "</td>" +
        "<td>" + order.CDSales + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}


//-------------------------------------------------------------------------------------

////Function to populate name drop down
$(function () {
    $.ajax({
        type: "GET",
        url: 'api/orders/people',
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            $.each(r, function (key, person) {
                $('#person').append($('<option></option>').val(person.$id).html(person.FirstName + " " + person.LastName));
            });
        }
    });
});

//----------------------------------------------------------

//////Function for City Drop Down Menu
$(function () {
    $.ajax({
        type: "GET",
        url: 'api/orders/city',
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            $.each(r, function (key, person) {
                $('#citySales').append($('<option></option>').val(person.$id).html(person.City));
            });
        }
    });
});

//----------------------------------------------------------

//////Function to list employee sales

document.getElementById("empSalesBtn").addEventListener("click", function () {
    var select = document.querySelector("#person");
    var employee = select.options[select.selectedIndex].text;
    console.log(employee);
    let lastName = employee.split(' ');
    console.log(lastName[1]);
   
    $(function () {
        $.ajax({
            type: "GET",
            url: 'api/orders/employeesales'+ lastName,
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (person) {
                console.log('This is the list:')
                EmployeeSalesListSuccess(person);
            }
        });
    });
});

function EmployeeSalesListSuccess(person) {
    // Iterate over the collection of data
    $.each(person, function (index, person) {
        // Add a row to the Order Detail table
        EmployeeSalesAddRow(person);
        console.log(person);
    });
}

function EmployeeSalesAddRow(person) {
    // Check if <tbody> tag exists, add one if not
    if ($("#SalesTable tbody").length == 0) {
        $("#SalesTable").append("<tbody></tbody>");
        console.log(person);
    }
    // Append row to <table>
    $("#SalesTable tbody").append(
        EmployeeSalesBuildTableRow(person));
}

function EmployeeSalesBuildTableRow(person) {
    var ret =
        "<tr>" +
        "<td>" + person.Store + "</td>" +
        "<td>" + person.CDSales + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}



//----------------------------------------------------------

//////Function to list store sales

document.getElementById("storeSalesBtn").addEventListener("click", function () {
    var select = document.querySelector("#citySales");
    var store = select.options[select.selectedIndex].text;
    console.log(store);
    

    $(function () {
        $.ajax({
            type: "GET",
            url: 'api/orders/storesales' + store,
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (store) {
                console.log('This is the store:')
                StoreSalesListSuccess(store);
                
            }
        });
    });
});

function StoreSalesListSuccess(store) {
    // Iterate over the collection of data
    $.each(store, function (index, store) {
        // Add a row to the Order Detail table
        StoreSalesAddRow(store);
        console.log(store);
    });
}

function StoreSalesAddRow(store) {
    // Check if <tbody> tag exists, add one if not
    if ($("#storeSalesTable tbody").length == 0) {
        $("#storeSalesTable").append("<tbody></tbody>");
        console.log(store);
    }
    // Append row to <table>
    $("#storeSalesTable tbody").append(
        StoreSalesBuildTableRow(store));
}

function StoreSalesBuildTableRow(store) {
    var ret =
        "<tr>" +
        "<td>" + store.Store + "</td>" +
        "<td>" + store.Sales + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}
