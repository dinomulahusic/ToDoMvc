using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToDoMvc.Models
{
    public class Category
    {
        public int CategoryId { get; set;}
        [Required, StringLength(20)]
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public string ForegroundColor { get; set; }
    }
}