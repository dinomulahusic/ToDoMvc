﻿define('app.dataservice', [], function () {
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

    var postJson = function (url, data, callbacks) {
        var request = $.ajax({
            url: url,
            method: "POST",
            data: data,
            dataType: "html"
        });

        request.done(function (msg) {
            callbacks.success();
        });

        request.fail(function (jqXHR, textStatus) {
            callbacks.error("Request failed: " + textStatus);
        });
    };

    var logError = function(error) {
        console.log(error);
    };

    var createTask = function (todoTask, done, error) {
        postJson("/TodoTask/CreateTask", todoTask, { success: done, error: function (msg) { (typeof error === 'undefined') ? logError(msg) : error(msg); } });
    }

    var updateTask = function (todoTask, done, error) {
        postJson("/TodoTask/UpdateTask", todoTask, { success: done, error: function (msg) { (typeof error === 'undefined') ? logError(msg) : error(msg); } });
    }

    var getTasksByDate = function (date, done, error) {
        getJson("/TodoTask/GetTodoTasks", { date: date }, { success: done, error: function (msg) { (typeof error === 'undefined') ? logError(msg) : error(msg); } });
    };

    var loadTemplates = function (done, error) {
        getJson("/TodoTask/GetTodoTaskTemplates", null, { success: done, error: function (msg) { (typeof error === 'undefined') ? logError(msg) : error(msg); } });
    };

    return {
        getTasksByDate: getTasksByDate,
        loadTemplates: loadTemplates,
        createTask: createTask,
        updateTask: updateTask
    };
});