using NLog;
using OnlineShop.Data.Repositories;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Business.Implementations
{
    public class OrderBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly OrderRepository _orderRepository;

        public OrderBusiness(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public OrderBusiness()
        {
            _orderRepository = new OrderRepository();
        }

        public Response<List<OrderViewModel>> GetAllOrders()
        {
            try
            {
                var data = _orderRepository.GetAllOrders();
                if (data != null && data.Any())
                    return new Response<List<OrderViewModel>>(true, "Success", data);
                return new Response<List<OrderViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllOrders Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<OrderViewModel>>(false, e.Message, null);
            }
        }

        public Response<Orders> UpdateOrders(Orders orders)
        {
            try
            {
                var data = _orderRepository.UpdateOrders(orders);
                if (data != null && data.Any())
                    return new Response<Orders>(true, "Success", data[0]);
                return new Response<Orders>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateOrders Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Orders>(false, e.Message, null);
            }
        }

        public ResponseList<OrderDetailViewModel> GetAllOrderDetails(int id)
        {
            try
            {
                var data = _orderRepository.GetAllOrderDetails(id);
                if (data != null && data.Any())
                    return new ResponseList<OrderDetailViewModel>(true, "Success", data, data.Count);
                return new ResponseList<OrderDetailViewModel>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllOrderDetails Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<OrderDetailViewModel>(false, e.Message, null, 0);
            }
        }

        public Response<TotalOrderDetailViewModel> TotalOrderDetail(int id)
        {
            try
            {
                var data = _orderRepository.TotalOrderDetail(id);
                if (data != null && data.Any())
                    return new Response<TotalOrderDetailViewModel>(true, "Success", data[0]);
                return new Response<TotalOrderDetailViewModel>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"TotalOrderDetail Failed: {e.Message}\n {e.StackTrace}");
                return new Response<TotalOrderDetailViewModel>(false, e.Message, null);
            }
        }
    }
}
