




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

