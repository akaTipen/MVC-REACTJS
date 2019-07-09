using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVC_REACTJS.Models;

namespace MVC_REACTJS.Controllers
{
    [Route("api/[controller]")]
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

        [HttpPost("[action]")]
        public JsonResult AddEmployee()
        {
            return Json(new { success = true, message = "berhasil" });
        }
    }
}
