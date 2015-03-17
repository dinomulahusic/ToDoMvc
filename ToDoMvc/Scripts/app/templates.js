define('templates', [], function () {
    function templates() {
        this.columnTemplate = '<div class="col-md-2 todo-column" data-date="{{date}}">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>';

        this.taskTemplate = '<div id="{{taskId}}" class="sticky">{{taskTitle}}</div>';
    }

    templates.prototype.generateHtml = function (templateHtml, data) {
        var template = Handlebars.compile(templateHtml);
        return template(data);
    }

    templates.prototype.getColumnHtml = function (date) {
        return this.generateHtml(this.columnTemplate, { date: date });
    }

    templates.prototype.getTaskHtml = function (taskId, taskTitle) {
        return this.generateHtml(this.taskTemplate, { taskId: taskId, taskTitle: taskTitle });
    }

    return new templates();
});