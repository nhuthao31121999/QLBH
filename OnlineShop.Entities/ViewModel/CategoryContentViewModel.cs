using OnlineShop.Entities.Entities;

namespace OnlineShop.Entities.ViewModel
{
    public class CategoryContentViewModel : CategoryContent
    {
        public string ParentName { get; set; }
        public string CreatedByName { get; set; }
        public string LastUpdatedByName { get; set; }
    }
}
