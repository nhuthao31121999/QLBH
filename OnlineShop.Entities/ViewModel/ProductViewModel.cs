using OnlineShop.Entities.Entities;
using System;

namespace OnlineShop.Entities.ViewModel
{
    public class ProductViewModel : Products
    {
        public string CategoryName { get; set; }
        public string ProducerName { get; set; }
        public string CreatedByName { get; set; }
        public string LastUpdatedByName { get; set; }
    }
}
