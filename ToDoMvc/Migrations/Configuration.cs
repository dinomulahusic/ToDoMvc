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
            AutomaticMigrationsEnabled = false;
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
                new TodoTask() { Title = "todo1", Date="2015-03-07" },
                new TodoTask() { Title = "todo2", Date="2015-03-07" },
                new TodoTask() { Title = "todo3", Date="2015-03-08" },
                new TodoTask() { Title = "todo4", Date="2015-03-06" },
                new TodoTask() { Title = "todo5", Date="2015-03-10" },
                new TodoTask() { Title = "todo6", Date="2015-03-10" }
            );
        }
    }
}
