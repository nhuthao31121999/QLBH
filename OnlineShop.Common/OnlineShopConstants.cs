using System.Configuration;

namespace OnlineShop.Common
{
    public static class OnlineShopConstants
    {
        public const string YearFormat = "yyyy";
        public const string DateFormat = "dd-MM-yyyy";
        public const string DataContractDateFormat = "dd-MMM-yyyy";
        public const string GridDateFormat = "{0:dd-MM-yyyy}";
        public const string CommonDateFormat = "{0:dd-MM-yyyy}";
        public const string DateTimeFormat = "dd-MM-yyyy hh:mm tt";
        public const string DateTimeFullFormat = "dd-MM-yyyy HH:mm:ss";
        public const string CurrencyFormat = "{0:c}";
        public const int ButtonCount = 10;
        public const int ScrollHeight = 250;

        public const string Star = "*";
        public const char Comma = ',';
        public const string Separator = " | ";
        public const string BreakLineHtml = "<br />";
        public const string Ascending = "ASC";
        public const string Descending = "DESC";

        public const string DataContextName = "OnlineShopDbContext";

        public const string MSG_SERVER_ERROR = "Internal Server Error";

        public const string SINGAPORE_TIME = "Singapore Standard Time";
        public const string MSG_UPLOAD_ATTACHMENTS_SUCCESS = "Attachment(s) uploaded successfully.";
        public const string MSG_UPLOAD_ATTACHMENTS_ERROR = "Unable to upload {0}.";

        //Send Mail constants
        public const string PLACE_HOLDER_REGEX = @"\[(?:Table)?\[([^\]]+)\]\]";
        public const string TEXT_OPTION = "Text";
        public const string SQL_OPTION = "SQL";
        public const string TABLE_OPTION = "Table";
        public const string MAP_TO = "_MAP_TO_";
        public const int OPTION_MAP_TO = 2;

        public const string SessionCart = "SessionCart";

        //Reserve ENE Web API Url
        public static readonly string WebApiReverseUrl = ConfigurationManager.AppSettings[ConfigKey.WebApiReverseUrl];

        public static class SessionKey
        {
            public const string Sitemap = "SessionKeySitemap";
        }


        public static class UserDefinedTable
        {
            public const string IntList = "IntList";
            public const string StringList = "StringList";
        }

        public static class StoredProc
        {
            #region Abouts
            public const string GetAllAbouts = "GetAllAbouts";
            public const string InsertAbouts = "InsertAbouts";
            public const string UpdateAbouts = "UpdateAbouts";
            public const string DeleteAbouts = "DeleteAbouts";
            #endregion

            #region Categories
            public const string GetAllCategories = "GetAllCategories";
            public const string InsertCategories = "InsertCategories";
            public const string UpdateCategories = "UpdateCategories";
            public const string DeleteCategories = "DeleteCategories";
            public const string GetAllCategoryForCategoryParent = "GetAllCategoryForCategoryParent";
            #endregion

            #region CategoryContent
            public const string GetAllCategoryContent = "GetAllCategoryContent";
            public const string InsertCategoryContent = "InsertCategoryContent";
            public const string UpdateCategoryContent = "UpdateCategoryContent";
            public const string DeleteCategoryContent = "DeleteCategoryContent";
            public const string GetAllCategoryContentForCategoryContentParent = "GetAllCategoryContentForCategoryContentParent";
            #endregion

            #region Contacts
            public const string GetAllContacts = "GetAllContacts";
            public const string InsertContacts = "InsertContacts";
            public const string UpdateContacts = "UpdateContacts";
            public const string DeleteContacts = "DeleteContacts";
            #endregion

            #region Contents
            public const string GetAllContents = "GetAllContents";
            public const string InsertContents = "InsertContents";
            public const string UpdateContents = "UpdateContents";
            public const string DeleteContents = "DeleteContents";
            public const string GetAllCategoryContentForContent = "GetAllCategoryContentForContent";
            #endregion

            #region FeedBacks
            public const string GetAllFeedBacks = "GetAllFeedBacks";
            public const string InsertFeedBacks = "InsertFeedBacks";
            public const string UpdateFeedBacks = "UpdateFeedBacks";
            public const string DeleteFeedBacks = "DeleteFeedBacks";
            #endregion

            #region Footers
            public const string GetAllFooters = "GetAllFooters";
            public const string InsertFooters = "InsertFooters";
            public const string UpdateFooters = "UpdateFooters";
            public const string DeleteFooters = "DeleteFooters";
            #endregion

            #region OrderDetails
            public const string GetAllOrderDetails = "GetAllOrderDetails";
            public const string InsertOrderDetails = "InsertOrderDetails";
            public const string TotalOrderDetail = "TotalOrderDetail";
            #endregion

            #region Orders
            public const string GetAllOrders = "GetAllOrders";
            public const string InsertOrders = "InsertOrders";
            public const string UpdateOrders = "UpdateOrders";
            public const string DeleteOrders = "DeleteOrders";
            #endregion

            #region Producers
            public const string GetAllProducers = "GetAllProducers";
            public const string InsertProducers = "InsertProducers";
            public const string UpdateProducers = "UpdateProducers";
            public const string DeleteProducers = "DeleteProducers";
            #endregion

            #region Products
            public const string GetAllProducts = "GetAllProducts";
            public const string InsertProducts = "InsertProducts";
            public const string UpdateProducts = "UpdateProducts";
            public const string DeleteProducts = "DeleteProducts";
            public const string GetAllCategoryForProduct = "GetAllCategoryForProduct";
            public const string GetAllProducerForProduct = "GetAllProducerForProduct";
            #endregion

            #region Slides
            public const string GetAllSlides = "GetAllSlides";
            public const string InsertSlides = "InsertSlides";
            public const string UpdateSlides = "UpdateSlides";
            public const string DeleteSlides = "DeleteSlides";
            #endregion

            #region UserGroups
            public const string GetAllUserGroups = "GetAllUserGroups";
            public const string InsertUserGroups = "InsertUserGroups";
            public const string UpdateUserGroups = "UpdateUserGroups";
            public const string DeleteUserGroups = "DeleteUserGroups";
            #endregion

            #region Users
            public const string GetAllUsers = "GetAllUsers";
            public const string InsertUsers = "InsertUsers";
            public const string UpdateUsers = "UpdateUsers";
            public const string DeleteUsers = "DeleteUsers";
            public const string GetAllUserGroupForUser = "GetAllUserGroupForUser";
            #endregion

            #region Client
            public const string BindFooterForClientHomePage = "BindFooterForClientHomePage";
            public const string BindHotProductForClientHomePage = "BindHotProductForClientHomePage";
            public const string BindNewNewsForClientHomePage = "BindNewNewsForClientHomePage";
            public const string BindNewProductForClientHomePage = "BindNewProductForClientHomePage";
            public const string BindSlideForClientHomePage = "BindSlideForClientHomePage";
            public const string BindTopViewProductForClientHomePage = "BindTopViewProductForClientHomePage";
            public const string BindCategoryForClientHomePage = "BindCategoryForClientHomePage";
            public const string BindCategoryContentForClientContentPage = "BindCategoryContentForClientContentPage";
            public const string GetProductByCategoryForClientHomePage = "GetProductByCategoryForClientHomePage";
            public const string GetCategoryForClientHomePage = "GetCategoryForClientHomePage";
            public const string BindDataForClientContentPage = "BindDataForClientContentPage";
            public const string GetContentByCategoryContentForClientHomePage = "GetContentByCategoryContentForClientHomePage";
            public const string GetCategoryContentForClientHomePage = "GetCategoryContentForClientHomePage";
            public const string BindDataForClientAboutPage = "BindDataForClientAboutPage";
            public const string GetContentByIdForClientHomePage = "GetContentByIdForClientHomePage";
            public const string GetProductByIdForClientHomePage = "GetProductByIdForClientHomePage";
            public const string BindProductRelatedForClientProductDetailPage = "BindProductRelatedForClientProductDetailPage";
            public const string BindContentRelatedForClientContentDetailPage = "BindContentRelatedForClientContentDetailPage";
            public const string BindDataForClientContactPage = "BindDataForClientContactPage";
            public const string InsertUsersForClient = "InsertUsersForClient";
            public const string UpdateUsersForClient = "UpdateUsersForClient";
            public const string FindProductForClientHomePage = "FindProductForClientHomePage";
            public const string FilterNameASC = "FilterNameASC";
            public const string FilterNewProduct = "FilterNewProduct";
            public const string FilterPriceASC = "FilterPriceASC";
            public const string FilterPriceDESC = "FilterPriceDESC";
            public const string FilterTopViewProduct = "FilterTopViewProduct";
            #endregion

            #region Login
            public const string UserLoginAdmin = "UserLoginAdmin";
            #endregion
        }
    }
}
