using OnlineShop.Admin.Helper;
using OnlineShop.Business.Implementations;
using OnlineShop.Common;
using OnlineShop.Entities.ViewModel;
using System;
using System.Web.Mvc;

namespace OnlineShop.Admin.Controllers
{
    public class LoginController : Controller
    {
        private readonly LoginBusiness _loginBusiness = new LoginBusiness();

        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(LoginAdminViewModel model, string returnUrl)
        {
            try
            {
                if (!ModelState.IsValid)
                    return View(model);
                var result = _loginBusiness.UserLoginAdmin(model.UserName, EncriptFunctions.GeneratePassword(model.Password));
                if (result != null)
                {
                    new Security().UserSignIn(result, System.Web.HttpContext.Current);
                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                        && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                    {
                        return Redirect(returnUrl);
                    }
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", @"Tên đăng nhập hoặc mật khẩu không hợp lệ.");
                return View(model);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", @"Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại. Lỗi: " + ex.Message);
                return View();
            }
        }

        [HttpPost]
        public ActionResult Logout()
        {
            new Security().SignOutLocal(System.Web.HttpContext.Current);
            return RedirectToAction("Index", "Login");
        }
    }
}