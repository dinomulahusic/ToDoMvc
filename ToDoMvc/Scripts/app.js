var main = function () {
    $('.todo-column').each(function (i, el) {
        loadData(el.id);
    });

    loadTemplates();

    highlightCurrentDate();

    $('#moveOneDateBefore').button().click(function () {
        moveOneDayBefore();
    });

    $('#moveOneDateAfter').button().click(function () {
        moveOneDayAfter();
    });

    $('.todo-column-content').sortable({
        connectWith: ".todo-column-content",
        receive: addTodoTask,
        stop: todoTaskStop
    }).disableSelection();

    $('.template-area').sortable({
        connectWith: ".todo-column-content",
        helper: "clone",
        stop: function (event, ui) {
            $(this).sortable('cancel');
        }
    }).disableSelection();
};

var addTodoTask = function (event, ui) {
    var todoTaskId = ui.item.attr("id");
    if (todoTaskId.indexOf('temp-') == 0) {
        todoTaskStop(event, ui);
    }
};

var todoTaskStop = function (event, ui) {
    var todoTaskId = ui.item.attr("id");
    var date = ui.item.closest(".todo-column").attr("id").substring(4);

    if (todoTaskId.indexOf('temp-') == 0) {
        $.post("/TodoTask/CreateTask", { taskDate: date, title: 'new task' }, function () { }, "json");
        loadData('div-' + date);
    } else {
        $.post("/TodoTask/UpdateTask", { todoTaskId: todoTaskId, newTaskDate: date }, function () { }, "json");
    }
};

var moveOneDayBefore = function () {
    $('.todo-board > div:last-child').remove();

    var firstDate = $('.todo-board > div:first-child').attr('id').substring(4);
    var previousDate = getDateFormated(addDays(firstDate, -1));

    var prevCol = $(
        '<div class="col-md-2 todo-column" id="div-' + previousDate + '">' +
            '<div class="todo-column-header"></div>' +
            '<div class="todo-column-content"></div>' +
        '</div>'
    );

    $('.todo-board').prepend(prevCol);
    loadData('div-' + previousDate);
};

var moveOneDayAfter = function () {
    $('.todo-board > div:first-child').remove();

    var lastDate = $('.todo-board > div:last-child').attr('id').substring(4);
    var nextDate = getDateFormated(addDays(lastDate, 1));

    var nextCol = $(
        '<div class="col-md-2 todo-column" id="div-' + nextDate + '">' +
            '<div class="todo-column-header"></div>' +
            '<div class="todo-column-content"></div>' +
        '</div>'
    );

    $('.todo-board').append(nextCol);
    loadData('div-' + nextDate);
};

var addDays = function (date, days) {
    dateObj = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10));
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

    $('.todo-column-header-highlight').removeClass('todo-column-header-highlight');
    $('.todo-column-content-highlight').removeClass('todo-column-content-highlight');

    $('#div-' + today).children('.todo-column-header').addClass('todo-column-header-highlight');
    $('#div-' + today).children('.todo-column-content').addClass('todo-column-content-highlight');
};

var loadData = function (dateParam) {
    $.getJSON("/TodoTask/GetTodoTasks", { date: dateParam.substring(4) }, function (data) {
        var dayColumn = $('#' + dateParam);
        dayColumn.children('.todo-column-header').text(dateParam.substring(4));
        var content = dayColumn.find('.todo-column-content');

        content.children().remove();

        $.each(data, function (i, item) {
            content.append('<div id="' + item.TodoTaskID + '" class="sticky">' + item.Title + '</div>')
        });
    });
};

var loadTemplates = function () {
    $.getJSON("/TodoTask/GetTodoTaskTemplates", null, function (data) {
        var templatesArea = $('.template-area');
        templatesArea.children().remove();

        $.each(data, function (i, item) {
            templatesArea.append('<div id="temp-' + item.TodoTaskTemplateId + '" class="sticky sticky-template">' + item.Name + '</div>')
        });
    });
};

$(document).ready(main);