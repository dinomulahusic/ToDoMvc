namespace ToDoMvc.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ToDoMvc.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ToDoMvc.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ToDoMvc.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.TodoTasks.AddOrUpdate(
                    tt => tt.Title,
                    new TodoTask() { Title = "todo1", Date = DateTime.Now.Date.ToString("yyyy-mm-dd") },
                    new TodoTask() { Title = "todo2", Date = DateTime.Now.Date.AddDays(1).ToString("yyyy-mm-dd") },
                    new TodoTask() { Title = "todo3", Date = DateTime.Now.Date.AddDays(1).ToString("yyyy-mm-dd") },
                    new TodoTask() { Title = "todo4", Date = DateTime.Now.Date.AddDays(1).ToString("yyyy-mm-dd") },
                    new TodoTask() { Title = "todo5", Date = DateTime.Now.Date.AddDays(-1).ToString("yyyy-mm-dd") },
                    new TodoTask() { Title = "todo6", Date = DateTime.Now.Date.AddDays(2).ToString("yyyy-mm-dd") }
                );

            context.Categories.AddOrUpdate(
                    x => x.Name,
                    new Category() { CategoryId = 1, Name = "Test category", BackgroundColor="#aaaaaa" }
                );

            context.TodoTaskTemplates.AddOrUpdate(
                    x => x.Name,
                    new TodoTaskTemplate() { TodoTaskTemplateId = 1, Name = "Default task", DefaultTaskTitle="todo", CategoryId = 1, IsTaskRepeatable = true, MoveToFirstWorkDay = true, RepeatPeriod = RepeatPeriod.Day}
                );
        }
    }
}
