using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoMvc.Models;

namespace ToDoMvc.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult GetTodoTasks(string date)
        {
            var todos = new List<TodoTask>() { 
                new TodoTask() { TodoTaskID = 1, Title = "Todo1", Date = "2015-03-06"},
                new TodoTask() { TodoTaskID = 5, Title = "Todo5", Date = "2015-03-06"},
                new TodoTask() { TodoTaskID = 2, Title = "Todo2", Date = "2015-03-08"},
                new TodoTask() { TodoTaskID = 3, Title = "Todo3", Date = "2015-03-09"},
                new TodoTask() { TodoTaskID = 4, Title = "Todo4", Date = "2015-03-05"},
            };

            return Json(todos.Where(x => x.Date == date).ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}