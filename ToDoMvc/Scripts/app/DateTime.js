window.DateTime = (function () {
    function DateTime(year, month, day, hours, minutes, seconds) {
        var date = new Date();

        if (year) date.setFullYear(year);
        if (month) date.setMonth(month - 1);
        if (day) date.setDate(day);
        if (hours) date.setHours(hours);
        if (minutes) date.setMinutes(minutes);
        if (seconds) date.setSeconds(seconds);

        this.value = date;
    }

    DateTime.prototype.clone = function() {
        return new DateTime(this.value.getFullYear(), this.value.getMonth() + 1, this.value.getDate(), this.value.getHours(), this.value.getMinutes(), this.value.getSeconds());
    }

    DateTime.prototype.toString = function (format) {
        format = format || 'full';

        var fullYear = this.value.getFullYear();
        var year = fullYear.toString().substring(2);
        var month = this.value.getMonth() + 1;
        var day = this.value.getDay();

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

    return {
        now: new DateTime(),
        parse: function (year, month, day, hours, minutes, seconds) { return new DateTime(year, month, day, hours, minutes, seconds); }
    }
}());