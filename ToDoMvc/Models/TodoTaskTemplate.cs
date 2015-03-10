using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToDoMvc.Models
{
    public class TodoTaskTemplate
    {
        public int TodoTaskTemplateId { get; set; }
        public string Name { get; set; }
        
        [Display(Name="Default Task Title")]
        public string DefaultTaskTitle { get; set; }

        public int CategoryId { get; set; }

        [Display(Name = "Category")]
        public Category Category { get; set; }

        [Display(Name = "Is Task Repeatable")]
        public bool IsTaskRepeatable { get; set; }

        [Display(Name = "Repeat Period")]
        public RepeatPeriod RepeatPeriod { get; set; }

        [Display(Name = "Move To First Work Day")]
        public bool MoveToFirstWorkDay { get; set; }
    }
}