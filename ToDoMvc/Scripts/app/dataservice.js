define('app.dataservice', [], function () {
    var getJson = function (url, data, callbacks) {
        var request = $.ajax({
            url: url,
            method: "GET",
            data: data,
            dataType: "json"
        });

        request.done(function (data) {
            callbacks.success(data);
        });

        request.fail(function (jqXHR, textStatus) {
            callbacks.error("Request failed: " + textStatus);
        });
    };

    var getTasksByDate = function (date, callbacks) {
        getJson("/TodoTask/GetTodoTasks", { date: date }, callbacks);
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

    return {
        getTasksByDate: getTasksByDate,
        loadTemplates: loadTemplates
    };
});