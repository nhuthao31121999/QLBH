using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class OrderRepository : CommonRepository<OrderViewModel>
    {
        public List<OrderViewModel> GetAllOrders()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllOrders);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllOrders Failed: {e.Message}\n {e.StackTrace}");
                return new List<OrderViewModel>();
            }
        }

        public List<Orders> UpdateOrders(Orders order)
        {
            try
            {
                var result = ListByStoredProcedure<Orders>(StoredProc.UpdateOrders,
                                     new StoredProcedureParameter("OrderID", order.OrderID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", order.Status, DbType.Int32)
                                    , new StoredProcedureParameter("LastUpdatedBy", order.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", order.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateOrders Failed: {e.Message}\n {e.StackTrace}");
                return new List<Orders>();
            }
        }

        public List<OrderDetailViewModel> GetAllOrderDetails(int id)
        {
            try
            {
                var result = ListByStoredProcedure<OrderDetailViewModel>(StoredProc.GetAllOrderDetails,
                                    new StoredProcedureParameter("OrderID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new List<OrderDetailViewModel>();
            }
        }

        public List<TotalOrderDetailViewModel> TotalOrderDetail(int id)
        {
            try
            {
                var result = ListByStoredProcedure<TotalOrderDetailViewModel>(StoredProc.TotalOrderDetail,
                                    new StoredProcedureParameter("OrderID", id, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"TotalOrderDetail Failed: {e.Message}\n {e.StackTrace}");
                return new List<TotalOrderDetailViewModel>();
            }
        }
    }
}
