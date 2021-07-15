using Newtonsoft.Json;
using NLog;
using OnlineShop.Admin.Models;
using OnlineShop.Business.Implementations;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/order")]
    public class OrderController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly OrderBusiness _orderBusiness;

        public OrderController(OrderBusiness orderBusiness)
        {
            _orderBusiness = orderBusiness;
        }

        public OrderController() : this(new OrderBusiness())
        {
        }

        [Route("getallorder")]
        [HttpGet]
        public Response<List<OrderViewModel>> GetAllOrders()
        {
            try
            {
                var response = _orderBusiness.GetAllOrders();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllOrders Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<OrderViewModel>>(false, e.Message, null);
            }
        }

        [Route("UpdateOrders")]
        [HttpPost]
        public Response<Orders> UpdateOrders([FromBody] Orders order)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                order.LastUpdatedBy = userData.CodeUserName;
                return _orderBusiness.UpdateOrders(order);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateOrders Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Orders>(false, e.Message, null);
            }
        }

        [Route("GetAllOrderDetails/{id}")]
        [HttpGet]
        public ResponseList<OrderDetailViewModel> GetAllOrderDetails(int id)
        {
            try
            {
                var response = _orderBusiness.GetAllOrderDetails(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllOrderDetails Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<OrderDetailViewModel>(false, e.Message, null, 0);
            }
        }

        [Route("TotalOrderDetail/{id}")]
        [HttpGet]
        public Response<TotalOrderDetailViewModel> TotalOrderDetail(int id)
        {
            try
            {
                var response = _orderBusiness.TotalOrderDetail(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"TotalOrderDetail Failed: {e.Message}\n {e.StackTrace}");
                return new Response<TotalOrderDetailViewModel>(false, e.Message, null);
            }
        }
    }
}