using System;
using System.Collections.Generic;

namespace MVC_REACTJS.Models
{
    public partial class Employees
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? JoinDate { get; set; }
        public byte[] Photo { get; set; }
        public decimal? Height { get; set; }
        public double? Weight { get; set; }
        public int DepartmentId { get; set; }

        public virtual Departments Department { get; set; }
    }
}
