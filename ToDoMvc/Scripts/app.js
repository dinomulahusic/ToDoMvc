var main = function () {
    $('td').each(function (i, el) {
        loadData(el.id);
    });

    highlightCurrentDate();

    $('#moveOneDateBefore').button().click(function () {
        moveOneDayBefore();
    });

    $('#moveOneDateAfter').button().click(function () {
        moveOneDayAfter();
    });

    $('#todo-table td').sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
};

var moveOneDayBefore = function () {
    $('#todo-table td:last-child').remove();
    $('#todo-table th:last-child').remove();

    var firstDate = $('#todo-table th:first-child').data('date');
    var previousDate = getDateFormated(addDays(firstDate, -1));
    var prevCol = $('<th id="head-' + previousDate + '" data-date="' + previousDate + '" >' + previousDate + '</th>');

    $('#todo-table thead tr').prepend(prevCol);
    $('#todo-table tbody tr').prepend('<td id="cell-' + previousDate + '" class="connectedSortable"></div>');
    loadData('cell-' + previousDate);
};

var moveOneDayAfter = function () {
    $('#todo-table td:first-child').remove();
    $('#todo-table th:first-child').remove();

    var lastDate = $('#todo-table th:last-child').data('date');
    var nextDate = getDateFormated(addDays(lastDate, 1));
    var nextCol = $('<th id="head-' + nextDate + '" data-date="' + nextDate + '" >' + nextDate + '</th>');

    $('#todo-table thead tr').append(nextCol);
    $('#todo-table tbody tr').append('<td id="cell-' + nextDate + '" class="connectedSortable"></div>');
    loadData('cell-' + nextDate);
};

var addDays = function (date, days) {
    dateObj = new Date(date.substring(0, 4), date.substring(5, 7), date.substring(8, 10));
    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
};

var getDateFormated = function (date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;
};

var highlightCurrentDate = function () {
    var today = getDateFormated(new Date());

    $('.currentDate').removeClass('currentDate');
    $('#cell-' + today).addClass('currentDate');
    $('#head-' + today).addClass('currentDate');
};

var loadData = function (dateParam) {
    $.getJSON("/Home/GetTodoTasks", { date: dateParam.substring(5) }, function (data) {
        var dayColumn = $('#' + dateParam);
        dayColumn.children().remove();

        $.each(data, function (i, item) {
            dayColumn.append('<div class="sticky">' + item.Title + '</div>')
        });
    });
};

$(document).ready(main);