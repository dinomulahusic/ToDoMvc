var main = function () {
    $('td').each(function (i, el) {
        loadData(el.id);
    });

    $('#todo-table td').sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
};

var loadData = function (dateParam) {
    $.getJSON("/Home/GetTodoTasks", { date: dateParam }, function (data) {
        var dayColumn = $('#' + dateParam);
        dayColumn.children().remove();

        $.each(data, function (i, item) {
            dayColumn.append('<div class="sticky">' + item.Title + '</div>')
        });
    });
};

$(document).ready(main);