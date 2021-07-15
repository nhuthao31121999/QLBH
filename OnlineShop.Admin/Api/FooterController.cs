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
    [RoutePrefix("api/footer")]
    public class FooterController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly FooterBusiness _footerBusiness;

        public FooterController(FooterBusiness footerBusiness)
        {
            _footerBusiness = footerBusiness;
        }

        public FooterController() : this(new FooterBusiness())
        {
        }

        [Route("getallfooter")]
        [HttpGet]
        public Response<List<FooterViewModel>> GetAllFooters()
        {
            try
            {
                var response = _footerBusiness.GetAllFooters();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<FooterViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertfooter")]
        [HttpPost]
        public Response<Footers> InsertFooters([FromBody] Footers footer)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                footer.CreatedBy = userData.CodeUserName;
                return _footerBusiness.InsertFooters(footer);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }

        [Route("updatefooter")]
        [HttpPost]
        public Response<Footers> UpdateFooters([FromBody] Footers footer)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                footer.LastUpdatedBy = userData.CodeUserName;
                return _footerBusiness.UpdateFooters(footer);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }

        [Route("deletefooter")]
        [HttpPost]
        public Response<Footers> DeleteFooters([FromBody] Footers footer)
        {
            try
            {
                return _footerBusiness.DeleteFooters(footer);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }
    }
}