define('app', ['app.dataservice', 'DateTime'], function (dataservice, DateTime) {

    var loadDateColumn = function (date) {
        var displayDateColumnItems = function (data) {
            var dayColumn = $('.todo-column[data-date="' + date + '"]');
            dayColumn.children('.todo-column-header').text(date);
            var content = dayColumn.find('.todo-column-content');

            content.children().remove();

            $.each(data, function (i, item) {
                content.append('<div id="' + item.TodoTaskID + '" class="sticky">' + item.Title + '</div>')
            });
        };

        dataservice.getTasksByDate(date, displayDateColumnItems);
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
            dataservice.updateTask({ todoTaskId: todoTaskId, newTaskDate: date }, function () { loadDateColumn(date); });
        }
    };

    var moveOneDayBefore = function () {
        $('.todo-board > div:last-child').remove();

        var firstDate = $('.todo-board > div:first-child').data("date");
        firstDate = new DateTime(firstDate);
        var previousDate = firstDate.addDays(-1).getShortDate();

        var prevCol = $(
            '<div class="col-md-2 todo-column" data-date="' + previousDate + '">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>'
        );

        $('.todo-board').prepend(prevCol);
        loadDateColumn(previousDate);
    };

    var moveOneDayAfter = function () {
        $('.todo-board > div:first-child').remove();

        var lastDate = $('.todo-board > div:last-child').data("date");
        lastDate = new DateTime(lastDate);
        var nextDate = lastDate.addDays(1).getShortDate();

        var nextCol = $(
            '<div class="col-md-2 todo-column" data-date="' + nextDate + '">' +
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

        var todoColumn$ = $('.todo-column[data-date="' + today + '"]');

        todoColumn$.children('.todo-column-header').addClass('todo-column-header-highlight');
        todoColumn$.children('.todo-column-content').addClass('todo-column-content-highlight');
    };

    var start = function () {
        $('.todo-column').each(function (i, el) {
            loadDateColumn($(el).data("date"));
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