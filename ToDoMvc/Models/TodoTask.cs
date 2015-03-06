using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoMvc.Models
{
    public class TodoTask
    {
        public int TodoTaskID { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
    }
}