define('app', ['app.dataservice', 'DateTime'], function (dataservice, DateTime) {

    var loadDateColumn = function (date) {
        dataservice.getTasksByDate(date, {
            success: function (data) {

                var dayColumn = $('#div-' + date);
                dayColumn.children('.todo-column-header').text(date);
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
            dataservice.createTask({ taskDate: date, title: 'new task' }, function () { loadDateColumn(date); });
        } else {
            $.post("/TodoTask/UpdateTask", { todoTaskId: todoTaskId, newTaskDate: date }, function () { }, "json");
        }
    };

    var moveOneDayBefore = function () {
        $('.todo-board > div:last-child').remove();

        var firstDate = $('.todo-board > div:first-child').attr('id').substring(4);
        firstDate = new DateTime(firstDate.substring(0, 4), firstDate.substring(5, 7), firstDate.substring(8, 10));
        var previousDate = firstDate.addDays(-1).getShortDate();

        var prevCol = $(
            '<div class="col-md-2 todo-column" id="div-' + previousDate + '">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>'
        );

        $('.todo-board').prepend(prevCol);
        loadDateColumn(previousDate);
    };

    var moveOneDayAfter = function () {
        $('.todo-board > div:first-child').remove();

        var firstDate = $('.todo-board > div:first-child').attr('id').substring(4);


        var lastDate = $('.todo-board > div:last-child').attr('id').substring(4);
        lastDate = new DateTime(lastDate.substring(0, 4), lastDate.substring(5, 7), lastDate.substring(8, 10));
        var nextDate = lastDate.addDays(1).getShortDate();

        var nextCol = $(
            '<div class="col-md-2 todo-column" id="div-' + nextDate + '">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>'
        );

        $('.todo-board').append(nextCol);
        loadDateColumn(nextDate);
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
            loadDateColumn(el.id.substring(4));
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