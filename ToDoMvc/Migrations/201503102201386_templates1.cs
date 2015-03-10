namespace ToDoMvc.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class templates1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TodoTaskTemplates", "DefaultCategoryId", c => c.Int(nullable: false));
            AddColumn("dbo.TodoTaskTemplates", "IsTaskRepeatable", c => c.Boolean(nullable: false));
            AddColumn("dbo.TodoTaskTemplates", "RepeatPeriod", c => c.Int(nullable: false));
            AddColumn("dbo.TodoTaskTemplates", "MoveToFirstWorkDay", c => c.Boolean(nullable: false));
            AddColumn("dbo.TodoTaskTemplates", "DefaultCategory_CategoryId", c => c.Int());
            CreateIndex("dbo.TodoTaskTemplates", "DefaultCategory_CategoryId");
            AddForeignKey("dbo.TodoTaskTemplates", "DefaultCategory_CategoryId", "dbo.Categories", "CategoryId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TodoTaskTemplates", "DefaultCategory_CategoryId", "dbo.Categories");
            DropIndex("dbo.TodoTaskTemplates", new[] { "DefaultCategory_CategoryId" });
            DropColumn("dbo.TodoTaskTemplates", "DefaultCategory_CategoryId");
            DropColumn("dbo.TodoTaskTemplates", "MoveToFirstWorkDay");
            DropColumn("dbo.TodoTaskTemplates", "RepeatPeriod");
            DropColumn("dbo.TodoTaskTemplates", "IsTaskRepeatable");
            DropColumn("dbo.TodoTaskTemplates", "DefaultCategoryId");
        }
    }
}
