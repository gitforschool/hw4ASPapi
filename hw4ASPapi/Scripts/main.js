




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
                $('#person').append($('<option></option>').val(person.$id).html(person.Person));
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

//----------------------------------------------------------------------------------

//Function to display data to user


function GetPeopleList() {

    var select = document.querySelector("#person");
    var id = select.options[select.selectedIndex].text;
    console.log(id);


    $(function () {
        $.ajax({
            type: "GET",
            url: 'api/orders/pSales?id=' + id,
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (person) {
                console.log(person)
                EmployeeSalesListSuccess(person);
            }
        });
    });

}

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
        "<td>" + person.Person + "</td>" +
        "<td>" + person.Price + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}


//---------------------------------------------------------------------------
//Displays Store Total Sales

function GetStoreList() {


    var select = document.querySelector("#citySales");
    var id = select.options[select.selectedIndex].text;
    console.log(id);


    $(function () {
        $.ajax({
            type: "GET",
            url: 'api/orders/sSales?id=' + id,
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (store) {
                console.log(store)
                StoreSalesListSuccess(store)
            }
        });
    });

};

function StoreSalesListSuccess(store) {
    // Iterate over the collection of data
    $.each(store, function (index, store) {
        console.log(store);
        // Add a row to the Order Detail table
        StoreSalesAddRow(store);
        console.log(store);
    });
}

function StoreSalesAddRow(store) {
    // Check if <tbody> tag exists, add one if not
    if ($("#StoresTable tbody").length == 0) {
        $("#StoresTable").append("<tbody></tbody>");
        console.log(store);
    }
    // Append row to <table>
    $("#StoresTable tbody").append(
        StoreBuildTableRow(store));
}

function StoreBuildTableRow(store) {
    var ret =
        "<tr>" +
        "<td>" + store.Store + "</td>" +
        "<td>" + store.Price + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}


