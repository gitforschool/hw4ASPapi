using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace hw4ASPapi.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            return File("~/index.html", "text/html");
        }
    }
}
