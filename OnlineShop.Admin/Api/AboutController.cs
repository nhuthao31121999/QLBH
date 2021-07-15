using NLog;
using OnlineShop.Admin.Models;
using OnlineShop.Business.Implementations;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Newtonsoft.Json;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/about")]
    public class AboutController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly AboutBusiness _aboutBusiness;

        public AboutController(AboutBusiness aboutBusiness)
        {
            _aboutBusiness = aboutBusiness;
        }

        public AboutController() : this(new AboutBusiness())
        {
        }

        [Route("getallabout")]
        [HttpGet]
        public Response<List<AboutViewModel>> GetAllAbouts()
        {
            try
            {
                var response = _aboutBusiness.GetAllAbouts();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<AboutViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertabout")]
        [HttpPost]
        public Response<Abouts> InsertAbouts([FromBody] Abouts about)
        {
            try
            {
                
                return _aboutBusiness.InsertAbouts(about);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }

        [Route("updateabout")]
        [HttpPost]
        public Response<Abouts> UpdateAbouts([FromBody] Abouts about)
        {
            try
            {
                
                return _aboutBusiness.UpdateAbouts(about);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }

        [Route("deleteabout")]
        [HttpPost]
        public Response<Abouts> DeleteAbouts([FromBody] Abouts about)
        {
            try
            {
                return _aboutBusiness.DeleteAbouts(about);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }
    }
}