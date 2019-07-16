using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MVC_REACTJS.Models;

namespace MVC_REACTJS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleDataController : Controller
    {
        #region Examples
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
        #endregion

        private CompanyContext db = new CompanyContext();

        [HttpGet("[action]")]
        public IEnumerable<Employees> Employees()
        {
            return db.Employees.ToList();
        }

        [HttpGet("[action]/{id}")]
        public Employees EmployeeDetail(int id)
        {
            return db.Employees.Find(id);
        }

        [HttpPatch("[action]/{id}")]
        public JsonResult UpdateEmployee(int id, [FromBody]EmployeesViewModel employee)
        {
            try
            {
                byte[] file = null;
                if (employee.Photo.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        employee.Photo.CopyTo(ms);
                        file = ms.ToArray();
                    }
                }
             
                Employees model = db.Employees.Find(id);
                model.EmployeeId = employee.EmployeeId;
                model.EmployeeName = employee.EmployeeName;
                model.JoinDate = employee.JoinDate;
                model.Weight = employee.Weight;
                model.Height = employee.Height;
                model.DepartmentId = employee.DepartmentId;
                model.Photo = file;
                db.SaveChanges();

                return Json(new { success = true, message = "berhasil" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

        }

        [HttpPost("[action]")]
        public JsonResult AddEmployee(EmployeesViewModel employee)
        {
            try
            {
                byte[] file = null;
                if (employee.Photo.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        employee.Photo.CopyTo(ms);
                        file = ms.ToArray();
                    }
                }
                Employees model = new Employees();
                model.EmployeeId = employee.EmployeeId;
                model.EmployeeName = employee.EmployeeName;
                model.JoinDate = employee.JoinDate;
                model.Weight = employee.Weight;
                model.Height = employee.Height;
                model.DepartmentId = employee.DepartmentId;
                model.Photo = file;

                db.Employees.Add(model);
                db.SaveChanges();

                return Json(new { success = true, message = "berhasil" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

        }

        [HttpDelete("[action]/{id}")]
        public JsonResult DeleteEmployee(int id)
        {
            try
            {
                Employees employee = db.Employees.Find(id);
                db.Employees.Remove(employee);
                db.SaveChanges();

                return Json(new { success = true, message = "berhasil" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet("[action]")]
        public JsonResult DepartementList()
        {
            var DepartementList = db.Departments.Select(a => new { a.DepartmentId, a.DepartmenName }).ToList();
            List<SelectListItem> DepartementListItem = new SelectList(DepartementList, "DepartmentId", "DepartmenName").ToList();

            return Json(DepartementListItem);
        }

        public FileResult GetReport(int Id)
        {
            Employees model = db.Employees.Find(Id);
            return File(model.Photo, "application/pdf");
        }
    }
}
