using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class BindDataForClientHomePageRepository : CommonRepository<Products>
    {
        public List<Footers> BindFooterForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure<Footers>(StoredProc.BindFooterForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindFooterForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Footers>();
            }
        }

        public List<Products> BindHotProductForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.BindHotProductForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindHotProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Contents> BindNewNewsForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.BindNewNewsForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewNewsForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Products> BindNewProductForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.BindNewProductForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Slides> BindSlideForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure<Slides>(StoredProc.BindSlideForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindSlideForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Slides>();
            }
        }

        public List<Products> BindTopViewProductForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.BindTopViewProductForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindTopViewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Categories> BindCategoryForClientHomePage()
        {
            try
            {
                var result = ListByStoredProcedure<Categories>(StoredProc.BindCategoryForClientHomePage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public List<CategoryContent> BindCategoryContentForClientContentPage()
        {
            try
            {
                var result = ListByStoredProcedure<CategoryContent>(StoredProc.BindCategoryContentForClientContentPage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryContentForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public List<Products> GetProductByCategoryForClientHomePage(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetProductByCategoryForClientHomePage,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Contents> GetContentByCategoryContentForClientHomePage(int id)
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.GetContentByCategoryContentForClientHomePage,
                                    new StoredProcedureParameter("CategoryContentID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Categories> GetCategoryForClientHomePage(int id)
        {
            try
            {
                var result = GetByStoredProcedure<Categories>(StoredProc.GetCategoryForClientHomePage,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public List<CategoryContent> GetCategoryContentForClientHomePage(int id)
        {
            try
            {
                var result = GetByStoredProcedure<CategoryContent>(StoredProc.GetCategoryContentForClientHomePage,
                                    new StoredProcedureParameter("CategoryContentID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public List<Contents> BindDataForClientContentPage(/*PagingData2 pagingData*/)
        {
            try
            {
                //var offset = new StoredProcedureParameter("Offset", pagingData.Offset, DbType.Int32);
                //var length = new StoredProcedureParameter("Length", pagingData.Length, DbType.Int32);
                //var outputTotal = new StoredProcedureParameter("Total", 0, DbType.Int32, ParameterDirection.Output);

                var result = ListByStoredProcedure<Contents>(StoredProc.BindDataForClientContentPage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Abouts> BindDataForClientAboutPage()
        {
            try
            {
                var result = ListByStoredProcedure<Abouts>(StoredProc.BindDataForClientAboutPage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientAboutPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Abouts>();
            }
        }

        public List<ProductViewModel> GetProductByIdForClientHomePage(int id)
        {
            try
            {
                var result = GetByStoredProcedure<ProductViewModel>(StoredProc.GetProductByIdForClientHomePage,
                                    new StoredProcedureParameter("ProductID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<ProductViewModel>();
            }
        }

        public List<ContentViewModel> GetContentByIdForClientHomePage(int id)
        {
            try
            {
                var result = GetByStoredProcedure<ContentViewModel>(StoredProc.GetContentByIdForClientHomePage,
                                    new StoredProcedureParameter("ContentID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<ContentViewModel>();
            }
        }

        public List<Products> BindProductRelatedForClientProductDetailPage(int id)
        {
            try
            {
                var result = ListByStoredProcedure<Products>(StoredProc.BindProductRelatedForClientProductDetailPage,
                                    new StoredProcedureParameter("ProductID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindProductRelatedForClientProductDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Contents> BindContentRelatedForClientContentDetailPage(int id)
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.BindContentRelatedForClientContentDetailPage,
                                    new StoredProcedureParameter("ContentID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindContentRelatedForClientContentDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Contacts> BindDataForClientContactPage()
        {
            try
            {
                var result = ListByStoredProcedure<Contacts>(StoredProc.BindDataForClientContactPage);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContactPage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contacts>();
            }
        }

        public List<Users> InsertUsersForClient(Users user)
        {
            try
            {
                var result = ListByStoredProcedure<Users>(StoredProc.InsertUsersForClient,
                                      new StoredProcedureParameter("CodeUserName", user.CodeUserName, DbType.String)
                                    , new StoredProcedureParameter("UserName", user.UserName, DbType.String)
                                    , new StoredProcedureParameter("Password", user.Password, DbType.String)
                                    , new StoredProcedureParameter("Name", user.Name, DbType.String)
                                    , new StoredProcedureParameter("Address", user.Address, DbType.String)
                                    , new StoredProcedureParameter("Email", user.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", user.Phone, DbType.String)
                                    , new StoredProcedureParameter("UserGroupID", user.UserGroupID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", user.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedDate", user.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedDate", user.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", user.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new List<Users>();
            }
        }

        public List<Users> UpdateUsersForClient(Users user)
        {
            try
            {
                var result = ListByStoredProcedure<Users>(StoredProc.UpdateUsersForClient,
                                      new StoredProcedureParameter("UserID", user.UserID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", user.Name, DbType.String)
                                    , new StoredProcedureParameter("Address", user.Address, DbType.String)
                                    , new StoredProcedureParameter("Email", user.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", user.Phone, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", user.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new List<Users>();
            }
        }

        public List<Orders> InsertOrders(Orders order)
        {
            try
            {
                var result = ListByStoredProcedure<Orders>(StoredProc.InsertOrders,
                                      new StoredProcedureParameter("OrderName", order.OrderName, DbType.String)
                                    , new StoredProcedureParameter("OrderMobile", order.OrderMobile, DbType.String)
                                    , new StoredProcedureParameter("OrderAdress", order.OrderAdress, DbType.String)
                                    , new StoredProcedureParameter("OrderEmail", order.OrderEmail, DbType.String)
                                    , new StoredProcedureParameter("PaymentMethod", order.PaymentMethod, DbType.String)
                                    , new StoredProcedureParameter("Status", order.Status, DbType.Int32)
                                    , new StoredProcedureParameter("CreatedDate", order.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", order.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", order.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", order.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertOrders Failed: {e.Message}\n {e.StackTrace}");
                return new List<Orders>();
            }
        }

        public List<OrderDetails> InsertOrderDetails(OrderDetails orderDetail)
        {
            try
            {
                var result = ListByStoredProcedure<OrderDetails>(StoredProc.InsertOrderDetails,
                                      new StoredProcedureParameter("ProductID", orderDetail.ProductID, DbType.Int32)
                                    , new StoredProcedureParameter("OrderID", orderDetail.OrderID, DbType.Int32)
                                    , new StoredProcedureParameter("Quantity", orderDetail.Quantity, DbType.Int32)
                                    , new StoredProcedureParameter("Price", orderDetail.Price, DbType.Double)
                                    , new StoredProcedureParameter("Discount", orderDetail.Discount, DbType.Double));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertOrderDetails Failed: {e.Message}\n {e.StackTrace}");
                return new List<OrderDetails>();
            }
        }

        public List<Products> FindProductForClientHomePage(string productName)
        {
            try
            {
                var result = ListByStoredProcedure<Products>(StoredProc.FindProductForClientHomePage,
                                    new StoredProcedureParameter("ProductName", productName, DbType.String));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FindProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> FilterNameASC(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.FilterNameASC,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNameASC Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> FilterNewProduct(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.FilterNewProduct,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> FilterPriceASC(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.FilterPriceASC,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceASC Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> FilterPriceDESC(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.FilterPriceDESC,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceDESC Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }

        public List<Products> FilterTopViewProduct(int id)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.FilterTopViewProduct,
                                    new StoredProcedureParameter("CategoryID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterTopViewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new List<Products>();
            }
        }
    }
}
