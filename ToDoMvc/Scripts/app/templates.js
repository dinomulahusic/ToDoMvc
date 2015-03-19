define('templates', [], function () {
    function templates() {
        this.columnTemplate = '<div class="col-md-2 todo-column" data-date="{{date}}">' +
                '<div class="todo-column-header"></div>' +
                '<div class="todo-column-content"></div>' +
            '</div>';

        this.taskTemplate = '<div id="{{taskId}}" class="sticky" style="background-color: {{backgroundColor}}; color: {{color}}">{{taskTitle}}</div>';

        this.stickyTemplateTemplate = '<div class="sticky sticky-template" style="background-color: {{backgroundColor}}; color: {{color}}" data-default-title="{{defaultTaskTitle}}" data-template-id="{{templateId}}">{{itemName}}</div>';
    }

    templates.prototype.generateHtml = function (templateHtml, data) {
        var template = Handlebars.compile(templateHtml);
        return template(data);
    }

    templates.prototype.getColumnHtml = function (date) {
        return this.generateHtml(this.columnTemplate, { date: date });
    }

    templates.prototype.getTaskHtml = function (taskId, taskTitle, backgroundColor, color) {
        return this.generateHtml(this.taskTemplate, { taskId: taskId, taskTitle: taskTitle, backgroundColor: backgroundColor, color: color });
    }

    templates.prototype.getStickyTemplateHtml = function (defaultTaskTitle, itemName, templateId, backgroundColor, color) {
        return this.generateHtml(this.stickyTemplateTemplate, { defaultTaskTitle: defaultTaskTitle, itemName: itemName, templateId: templateId, backgroundColor: backgroundColor, color: color });
    }

    return new templates();
});