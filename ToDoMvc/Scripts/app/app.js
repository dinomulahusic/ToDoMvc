define('app', ['app.dataservice', 'DateTime', 'templates'], function (dataservice, DateTime, templates) {

    var loadDateColumn = function (date) {
        var displayDateColumnItems = function (data) {
            var dayColumn = $('.todo-column[data-date="' + date + '"]');
            dayColumn.children('.todo-column-header').text(date);
            var content = dayColumn.find('.todo-column-content');

            content.children().remove();

            $.each(data, function (i, item) {
                content.append(templates.getTaskHtml(item.TodoTaskID, item.Title, item.Category.BackgroundColor, item.Category.ForegroundColor));
            });
        };

        dataservice.getTasksByDate(date, displayDateColumnItems);
    };

    var makeColumnsSortable = function () {
        $('.todo-column-content').sortable({
            connectWith: ".todo-column-content",
            receive: addTodoTask,
            stop: todoTaskStop
        }).disableSelection();
    };

    var addTodoTask = function (event, ui) {
        if (ui.item.hasClass('sticky-template')) {
            todoTaskStop(event, ui);
        }
    };

    var todoTaskStop = function (event, ui) {
        var date = ui.item.closest(".todo-column").data("date");

        if (ui.item.hasClass('sticky-template')) {
            $('#Dialog_TaskName').val(ui.item.data('default-title'));
            $('#createTaskDialog').data('date', date);
            $('#createTaskDialog').data('templateid', ui.item.data('template-id'));
            $("#createTaskDialog").dialog("open");
        } else {
            dataservice.updateTask({ todoTaskId: ui.item.attr("id"), newTaskDate: date }, function () { loadDateColumn(date); });
        }
    };

    var moveOneDayBefore = function () {
        $('.todo-board > div:last-child').remove();

        var firstDate = $('.todo-board > div:first-child').data("date");
        var previousDate = (new DateTime(firstDate)).addDays(-1).getShortDate();

        $('.todo-board').prepend(templates.getColumnHtml(previousDate));
        loadDateColumn(previousDate);
        makeColumnsSortable();
    };

    var moveOneDayAfter = function () {
        $('.todo-board > div:first-child').remove();

        var lastDate = $('.todo-board > div:last-child').data("date");
        var nextDate = (new DateTime(lastDate)).addDays(1).getShortDate();

        $('.todo-board').append(templates.getColumnHtml(nextDate));
        loadDateColumn(nextDate);
        makeColumnsSortable();
    };

    var highlightCurrentDate = function () {
        var today = (new DateTime()).getShortDate();

        $('.todo-column-header-highlight').removeClass('todo-column-header-highlight');
        $('.todo-column-content-highlight').removeClass('todo-column-content-highlight');

        var todoColumn$ = $('.todo-column[data-date="' + today + '"]');

        todoColumn$.children('.todo-column-header').addClass('todo-column-header-highlight');
        todoColumn$.children('.todo-column-content').addClass('todo-column-content-highlight');
    };

    var loadTemplates = function () {
        var displayTemplates = function (data) {
            var templatesArea = $('.template-area');
            templatesArea.children().remove();

            $.each(data, function (i, item) {
                templatesArea.append(templates.getStickyTemplateHtml(item.DefaultTaskTitle, item.Name, item.TodoTaskTemplateId, item.Category.BackgroundColor, item.Category.ForegroundColor));
            });
        };

        dataservice.loadTemplates(displayTemplates);
    };

    var displayColumns = function () {
        var todoBoard$ = $('.todo-board');

        for (var i = -1; i < 5; i++) {
            todoBoard$.append(templates.getColumnHtml((new DateTime()).addDays(i).getShortDate()));
        }
    };

    var initializeDialogs = function () {
        $("#createTaskDialog").dialog({
            autoOpen: false,
            dialogClass: "no-close",
            buttons: [
                {
                    text: "Create",
                    click: function () {
                        var date = $('#createTaskDialog').data('date');
                        var templateid = $('#createTaskDialog').data('templateid');
                        var title = $('#Dialog_TaskName').val();

                        dataservice.createTask({ taskDate: date, title: title, templateId: templateid }, function () { loadDateColumn(date); });
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };

    var start = function () {
        displayColumns();

        $('.todo-column').each(function (i, el) {
            loadDateColumn($(el).data("date"));
        });

        loadTemplates();

        initializeDialogs();


        highlightCurrentDate();

        $('#moveOneDateBefore').button().click(function () {
            moveOneDayBefore();
        });

        $('#moveOneDateAfter').button().click(function () {
            moveOneDayAfter();
        });

        makeColumnsSortable();

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