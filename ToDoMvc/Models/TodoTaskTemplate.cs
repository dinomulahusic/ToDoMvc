using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoMvc.Models
{
    public class TodoTaskTemplate
    {
        public int TodoTaskTemplateId { get; set; }
        public string Name { get; set; }
        public string DefaultTaskTitle { get; set; }
    }
}