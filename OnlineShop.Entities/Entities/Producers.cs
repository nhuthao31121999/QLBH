using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Entities.Entities
{
    public class Producers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProducerID { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool? Status { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public bool? IsDelete { get; set; }
    }
}
