var main = function () {
    $('#todo-table td').sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
};

$(document).ready(main);