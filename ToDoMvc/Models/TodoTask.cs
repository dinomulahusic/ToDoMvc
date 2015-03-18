using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToDoMvc.Models
{
    public class TodoTask
    {
        public int TodoTaskID { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }

        public int CategoryId { get; set; }

        [Display(Name = "Category")]
        public virtual Category Category { get; set; }

        [Display(Name = "Is Task Repeatable")]
        public bool IsTaskRepeatable { get; set; }

        [Display(Name = "Repeat Period")]
        public RepeatPeriod RepeatPeriod { get; set; }

        [Display(Name = "Move To First Work Day")]
        public bool MoveToFirstWorkDay { get; set; }
    }
}