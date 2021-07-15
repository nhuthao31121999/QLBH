using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Entities.Entities
{
    public class Products
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public double? Price { get; set; }
        public double? Discount { get; set; }
        public string Image { get; set; }
        public bool Available { get; set; }
        public string Description { get; set; }
        public string Detail { get; set; }
        public string Warranty { get; set; }
        public int? Quantity { get; set; }
        public DateTime? Special { get; set; }
        public int? Views { get; set; }
        public int? CategoryID { get; set; }
        public int? ProducerID { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public bool? IsDelete { get; set; }
    }
}
