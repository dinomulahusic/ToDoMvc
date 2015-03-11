using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ToDoMvc.Models;
using ToDoMvc.Models.ViewModels;

namespace ToDoMvc.Controllers
{
    public class TodoTaskTemplatesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: TodoTaskTemplates
        public async Task<ActionResult> Index()
        {
            return View(await db.TodoTaskTemplates.ToListAsync());
        }

        // GET: TodoTaskTemplates/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TodoTaskTemplate todoTaskTemplate = await db.TodoTaskTemplates.FindAsync(id);
            if (todoTaskTemplate == null)
            {
                return HttpNotFound();
            }
            return View(todoTaskTemplate);
        }

        // GET: TodoTaskTemplates/Create
        public ActionResult Create()
        {
            var model = new TodoTaskTemplateVM()
            {
                Template = new TodoTaskTemplate(),
                Categories = new SelectList(db.Categories.ToList(), "CategoryId", "Name")
            };
            return View(model);
        }

        // POST: TodoTaskTemplates/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(TodoTaskTemplateVM todoTaskTemplate)
        {
            if (ModelState.IsValid)
            {
                db.TodoTaskTemplates.Add(todoTaskTemplate.Template);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(todoTaskTemplate);
        }

        // GET: TodoTaskTemplates/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TodoTaskTemplate todoTaskTemplate = await db.TodoTaskTemplates.FindAsync(id);
            if (todoTaskTemplate == null)
            {
                return HttpNotFound();
            }
            return View(todoTaskTemplate);
        }

        // POST: TodoTaskTemplates/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "TodoTaskTemplateId,Name,DefaultTaskTitle,DefaultCategoryId,IsTaskRepeatable,RepeatPeriod,MoveToFirstWorkDay")] TodoTaskTemplate todoTaskTemplate)
        {
            if (ModelState.IsValid)
            {
                db.Entry(todoTaskTemplate).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(todoTaskTemplate);
        }

        // GET: TodoTaskTemplates/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TodoTaskTemplate todoTaskTemplate = await db.TodoTaskTemplates.FindAsync(id);
            if (todoTaskTemplate == null)
            {
                return HttpNotFound();
            }
            return View(todoTaskTemplate);
        }

        // POST: TodoTaskTemplates/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            TodoTaskTemplate todoTaskTemplate = await db.TodoTaskTemplates.FindAsync(id);
            db.TodoTaskTemplates.Remove(todoTaskTemplate);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
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
