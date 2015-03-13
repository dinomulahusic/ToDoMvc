﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoMvc.Models;

namespace ToDoMvc.Controllers
{
    public class TodoTaskController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public JsonResult GetTodoTasks(string date)
        {
            return Json(db.TodoTasks.Where(x => x.Date == date).ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTodoTaskTemplates()
        {
            return Json(db.TodoTaskTemplates.ToList(), JsonRequestBehavior.AllowGet);
        }

        public void UpdateTask(int todoTaskId, string newTaskDate)
        {
            DateTime newDate = DateTime.ParseExact(newTaskDate, "yyyy-MM-dd", null);
            TodoTask task = db.TodoTasks.Find(todoTaskId);
            if (task.Date != newTaskDate)
            {
                task.Date = newTaskDate;
            }
            
            db.SaveChanges();
        }

        public void CreateTask(string taskDate, string title)
        {
            TodoTask task = new TodoTask() { Title = title, Date = taskDate };
            db.TodoTasks.Add(task);

            db.SaveChanges();

            //return Json("done", JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}