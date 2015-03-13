define('app', ['app.dataservice'], function (dataservice) {

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
        firstDate = new DateTime(firstDate.substring(0,4), firstDate.substring(5,7), firstDate.substring(8,10));
        var previousDate = firstDate.addDays(-1).getShortDate();// getDateFormated(addDays(firstDate, -1));

        var prevCol = $(
            '<div class="col-md-2 todo-column" id="div-' + previousDate + '">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>'
        );

        $('.todo-board').prepend(prevCol);
        dataservice.getTasksByDate(previousDate, {
            success: function (data) {

                var dayColumn = $('#div-' + previousDate);
                dayColumn.children('.todo-column-header').text(previousDate);
                var content = dayColumn.find('.todo-column-content');

                content.children().remove();

                $.each(data, function (i, item) {
                    content.append('<div id="' + item.TodoTaskID + '" class="sticky">' + item.Title + '</div>')
                });
            },
            error: function (error) {
                alert(error);
            }
        });

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

    var highlightCurrentDate = function () {
        var today = (new DateTime()).getShortDate();

        $('.todo-column-header-highlight').removeClass('todo-column-header-highlight');
        $('.todo-column-content-highlight').removeClass('todo-column-content-highlight');

        $('#div-' + today).children('.todo-column-header').addClass('todo-column-header-highlight');
        $('#div-' + today).children('.todo-column-content').addClass('todo-column-content-highlight');
    };

    var start = function () {
        $('.todo-column').each(function (i, el) {
            dataservice.getTasksByDate(el.id.substring(4), {
                success: function (data) {

                    var dayColumn = $('#' + el.id);
                    dayColumn.children('.todo-column-header').text(el.id.substring(4));
                    var content = dayColumn.find('.todo-column-content');

                    content.children().remove();

                    $.each(data, function (i, item) {
                        content.append('<div id="' + item.TodoTaskID + '" class="sticky">' + item.Title + '</div>')
                    });
                },
                error: function (error) {
                    alert(error);
                }
            });
        });

        dataservice.loadTemplates();

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

    return {
        start: start
    }
});

/*var main = function () {
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



$(document).ready(main);*/