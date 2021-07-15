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
    [RoutePrefix("api/producer")]
    public class ProducerController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ProducerBusiness _producerBusiness;

        public ProducerController(ProducerBusiness producerBusiness)
        {
            _producerBusiness = producerBusiness;
        }

        public ProducerController() : this(new ProducerBusiness())
        {
        }

        [Route("getallproducer")]
        [HttpGet]
        public Response<List<ProducerViewModel>> GetAllProducers()
        {
            try
            {
                var response = _producerBusiness.GetAllProducers();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ProducerViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertproducer")]
        [HttpPost]
        public Response<Producers> InsertProducers([FromBody] Producers producer)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                producer.CreatedBy = userData.CodeUserName;
                return _producerBusiness.InsertProducers(producer);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Producers>(false, e.Message, null);
            }
        }

        [Route("updateproducer")]
        [HttpPost]
        public Response<Producers> UpdateProducers([FromBody] Producers producer)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                producer.LastUpdatedBy = userData.CodeUserName;
                return _producerBusiness.UpdateProducers(producer);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Producers>(false, e.Message, null);
            }
        }

        [Route("deleteproducer")]
        [HttpPost]
        public Response<int> DeleteProducers([FromBody] Producers producer)
        {
            try
            {
                return _producerBusiness.DeleteProducers(producer);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}