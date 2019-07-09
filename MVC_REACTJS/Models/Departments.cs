using System;
using System.Collections.Generic;

namespace MVC_REACTJS.Models
{
    public partial class Departments
    {
        public Departments()
        {
            Employees = new HashSet<Employees>();
        }

        public int DepartmentId { get; set; }
        public string DepartmenCode { get; set; }
        public string DepartmenName { get; set; }

        public virtual ICollection<Employees> Employees { get; set; }
    }
}
