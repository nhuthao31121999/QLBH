using OnlineShop.Entities.Entities;

namespace OnlineShop.Entities.ViewModel
{
    public class ContentViewModel : Contents
    {
        public string CategoryContentName { get; set; }
        public string CreatedByName { get; set; }
        public string LastUpdatedByName { get; set; }
    }
}
