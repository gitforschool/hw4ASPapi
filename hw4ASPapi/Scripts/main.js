﻿var uri = 'api/Orders';

//$(document).ready(function () {
//    GetOrdersList();
//});



function GetOrderList() {
    // Send an AJAX request
    $.get(uri)
        .done(function (data) {
            $('#orders').empty();
            console.log(data);
            // On success, 'data' contains a list of notes.
            $.each(data, function (key, item) {
                // Add a list item for the note.
                $('<li>', { text: formatItem(item) }).appendTo($('#orders'));
            });
        });
}

function formatItem(item) {
    //: {$id: "1", NoteID: 1, Description: "Must Do ASAP", Content: "Get this working"}length: 1__proto__: Array(0)
    return item.OrderID + " : " + item.PriceList;
}


function GetOrdersList() {

    $.ajax({
        url: uri,
        data: "",
        type: "GET",
        dataType: "json",
        success: function (orderCount) {
            OrderListSuccess(orderCount);
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function OrderListSuccess(orderCount) {
    // Iterate over the collection of data
    $.each(orderCount, function (index, order) {
        // Add a row to the GradedAssignment table
        orderAddRow(order);
    });
}

function orderAddRow(order) {
    // Check if <tbody> tag exists, add one if not
    if ($("#orderTable tbody").length == 0) {
        $("#orderTable").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#orderTable tbody").append(
        orderBuildTableRow(order));
}

function orderBuildTableRow(order) {
    var ret =
        "<tr>" +
        "<td>" + order.StoreID + "</td>" +
        "<td>" + order.Pr + "</td>" +
        "</td>"
    "</tr>";
    return ret;
}
