using OnlineShop.Admin.Models;
using OnlineShop.Business.Implementations;
using OnlineShop.Common;
using OnlineShop.Entities.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace OnlineShop.Admin.Areas.Client.Controllers
{
    public class ShoppingCartController : Controller
    {
        private readonly BindDataForClientHomePageBusiness _bindDataForClientHomePageBusiness = new BindDataForClientHomePageBusiness();

        // GET: Client/ShoppingCart
        public ActionResult Index()
        {
            if (Session[OnlineShopConstants.SessionCart] == null)
            {
                Session[OnlineShopConstants.SessionCart] = new List<ShoppingCartViewModel>();
            }
            return View();
        }

        public JsonResult GetAll()
        {
            if (Session[OnlineShopConstants.SessionCart] == null)
                Session[OnlineShopConstants.SessionCart] = new List<ShoppingCartViewModel>();
            var cart = (List<ShoppingCartViewModel>)Session[OnlineShopConstants.SessionCart];
            return Json(new
            {
                data = cart,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(int productId)
        {
            var cart = (List<ShoppingCartViewModel>)Session[OnlineShopConstants.SessionCart];
            var product = _bindDataForClientHomePageBusiness.GetProductByIdForClientHomePage(productId);
            if (cart == null)
            {
                cart = new List<ShoppingCartViewModel>();
            }
            if (product.Data.Quantity == 0)
            {
                return Json(new
                {
                    status = false,
                    message = "Sản phẩm này hiện đang hết hàng. Vui lòng liên hệ với hotline 09.492.340.86"
                });
            }
            if (cart.Any(x => x.ProductID == productId))
            {
                foreach (var item in cart)
                {
                    if (item.ProductID == productId)
                    {
                        item.Quantity += 1;
                    }
                }
            }
            else
            {
                ShoppingCartViewModel newItem = new ShoppingCartViewModel();
                newItem.ProductID = productId;
                newItem.Product = product.Data;
                newItem.Quantity = 1;
                cart.Add(newItem);
            }

            Session[OnlineShopConstants.SessionCart] = cart;
            return Json(new
            {
                status = true
            });
        }

        [HttpPost]
        public JsonResult DeleteItem(int productId)
        {
            var cartSession = (List<ShoppingCartViewModel>)Session[OnlineShopConstants.SessionCart];
            if (cartSession != null)
            {
                cartSession.RemoveAll(x => x.ProductID == productId);
                Session[OnlineShopConstants.SessionCart] = cartSession;
                return Json(new
                {
                    status = true
                });
            }
            return Json(new
            {
                status = false
            });
        }

        [HttpPost]
        public JsonResult Update(string cartData)
        {
           var cartViewModel = new JavaScriptSerializer().Deserialize<List<ShoppingCartViewModel>>(cartData);

            var cartSession = (List<ShoppingCartViewModel>)Session[OnlineShopConstants.SessionCart];
            foreach (var item in cartSession)
            {
                foreach (var jitem in cartViewModel)
                {
                    if (item.ProductID == jitem.ProductID)
                    {
                        item.Quantity = jitem.Quantity;
                    }
                }
            }

            Session[OnlineShopConstants.SessionCart] = cartSession;
            return Json(new
            {
                status = true
            });
        }

        [HttpPost]
        public JsonResult DeleteAll()
        {
            Session[OnlineShopConstants.SessionCart] = new List<ShoppingCartViewModel>();
            return Json(new
            {
                status = true
            });
        }

        public ActionResult InsertOrders(Orders orders)
        {
            var cart = (List<ShoppingCartViewModel>)Session[OnlineShopConstants.SessionCart];
            var insertOrder = _bindDataForClientHomePageBusiness.InsertOrders(orders);
            foreach (var item in cart)
            {
                var detail = new OrderDetails();
                detail.OrderID = insertOrder.Data.OrderID;
                detail.ProductID = item.ProductID;
                detail.Quantity = item.Quantity;
                detail.Price = item.Product.Price;
                detail.Discount = item.Product.Discount;
                _bindDataForClientHomePageBusiness.InsertOrderDetails(detail);
            }
            Session[OnlineShopConstants.SessionCart] = new List<ShoppingCartViewModel>();
            return Json(new
            {
                status = true
            });
        }
    }
}