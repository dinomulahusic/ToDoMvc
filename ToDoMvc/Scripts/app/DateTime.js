define('DateTime', [], function () {
    function DateTime() {
        var date = new Date();

        if (arguments.length == 1) {
            if (typeof arguments[0] === "string") {
                var dateString = arguments[0];
                var year = parseInt(dateString.substring(0, 4));
                var month = parseInt(dateString.substring(5, 7));
                var day = parseInt(dateString.substring(8, 10));

                date.setFullYear(year);
                date.setMonth(month - 1);
                date.setDate(day);
            }
        } else {
            if (arguments[0]) date.setFullYear(arguments[0]);
            if (arguments[1]) date.setMonth(arguments[1] - 1);
            if (arguments[2]) date.setDate(arguments[2]);

            if (arguments[3]) date.setHours(arguments[3]);
            if (arguments[4]) date.setMinutes(arguments[4]);
            if (arguments[5]) date.setSeconds(arguments[5]);
        }

        this.value = date;
    }

    DateTime.prototype.clone = function () {
        return new DateTime(this.value.getFullYear(), this.value.getMonth() + 1, this.value.getDate(), this.value.getHours(), this.value.getMinutes(), this.value.getSeconds());
    }

    DateTime.prototype.toString = function (format) {
        format = format || 'full';

        var fullYear = this.value.getFullYear();
        var year = fullYear.toString().substring(2);
        var month = this.value.getMonth() + 1;
        var day = this.value.getDate();

        if (day < 10) {
            day = '0' + day
        }

        if (month < 10) {
            month = '0' + month
        }

        if (format === "yyyy-mm-dd") {
            return fullYear + "-" + month + "-" + day;
        }

        return this.value.toString();
    }

    DateTime.prototype.getShortDate = function () {
        return this.toString('yyyy-mm-dd')
    }

    DateTime.prototype.addDays = function (daysToAdd) {
        var newDateTime = this.clone();
        addDaysImpl(newDateTime, daysToAdd);
        return newDateTime;
    }

    var addDaysImpl = function (dateTime, daysToAdd) {
        dateTime.value.setDate(dateTime.value.getDate() + daysToAdd);
    }

    return DateTime;
});