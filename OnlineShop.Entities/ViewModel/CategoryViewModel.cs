using OnlineShop.Entities.Entities;

namespace OnlineShop.Entities.ViewModel
{
    public class CategoryViewModel : Categories
    {
        public string ParentName { get; set; }
        public string CreatedByName { get; set; }
        public string LastUpdatedByName { get; set; }
    }
}
