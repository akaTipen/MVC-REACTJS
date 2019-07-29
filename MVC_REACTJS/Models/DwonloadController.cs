using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MVC_REACTJS.Models
{
    public class DwonloadController : Controller
    {
        private CompanyContext db = new CompanyContext();

        public FileResult GetReport(int Id)
        {
            Employees model = db.Employees.Find(Id);
            return File(model.Photo, "application/pdf");
        }
    }
}