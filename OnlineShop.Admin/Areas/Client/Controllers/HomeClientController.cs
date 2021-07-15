using System.Web.Mvc;

namespace OnlineShop.Admin.Areas.Client.Controllers
{
    public class HomeClientController : Controller
    {
        // GET: Client/HomeClient
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Content()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult ProductByCategory()
        {
            return View();
        }

        public ActionResult ContentByCategoryContent()
        {
            return View();
        }

        public ActionResult ContentDetail()
        {
            return View();
        }

        public ActionResult ProductDetail()
        {
            return View();
        }

        public ActionResult FindNameProduct(string productName)
        {
            ViewBag.ProductName = productName;
            return View();
        }
    }
}