using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Entities.Entities
{
    public class OrderDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDetailID { get; set; }
        public int? ProductID { get; set; }
        public int? OrderID { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public double? Discount { get; set; }
    }
}
