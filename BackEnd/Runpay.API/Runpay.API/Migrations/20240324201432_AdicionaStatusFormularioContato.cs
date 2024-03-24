using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Runpay.API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaStatusFormularioContato : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "StatusContatoAtivo",
                table: "Contatos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusContatoAtivo",
                table: "Contatos");
        }
    }
}
