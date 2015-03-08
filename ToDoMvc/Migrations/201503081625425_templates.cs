namespace ToDoMvc.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class templates : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TodoTaskTemplates",
                c => new
                    {
                        TodoTaskTemplateId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        DefaultTaskTitle = c.String(),
                    })
                .PrimaryKey(t => t.TodoTaskTemplateId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TodoTaskTemplates");
        }
    }
}
