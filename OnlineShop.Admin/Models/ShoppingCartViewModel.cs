using OnlineShop.Entities.ViewModel;
using System;

namespace OnlineShop.Admin.Models
{
    [Serializable]
    public class ShoppingCartViewModel
    {
        public int ProductID { get; set; }
        public ProductViewModel Product { get; set; }
        public int? Quantity { get; set; }

    }
}