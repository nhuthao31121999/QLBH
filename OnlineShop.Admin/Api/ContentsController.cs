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
    [RoutePrefix("api/content")]
    public class ContentsController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ContentBusiness _contentBusiness;

        public ContentsController(ContentBusiness contentBusiness)
        {
            _contentBusiness = contentBusiness;
        }

        public ContentsController() : this(new ContentBusiness())
        {
        }

        [Route("getallcontent")]
        [HttpGet]
        public Response<List<ContentViewModel>> GetAllContents()
        {
            try
            {
                var response = _contentBusiness.GetAllContents();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ContentViewModel>>(false, e.Message, null);
            }
        }

        [Route("getallcategorycontentforcontent")]
        [HttpGet]
        public Response<List<CategoryContent>> GetAllCategoryContentForContent()
        {
            try
            {
                var response = _contentBusiness.GetAllCategoryContentForContent();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        [Route("insertcontent")]
        [HttpPost]
        public Response<Contents> InsertContents([FromBody] Contents content)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                content.CreatedBy = userData.CodeUserName;
                return _contentBusiness.InsertContents(content);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }

        [Route("updatecontent")]
        [HttpPost]
        public Response<Contents> UpdateContents([FromBody] Contents content)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                content.LastUpdatedBy = userData.CodeUserName;
                return _contentBusiness.UpdateContents(content);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }

        [Route("deletecontent")]
        [HttpPost]
        public Response<Contents> DeleteContents([FromBody] Contents content)
        {
            try
            {
                return _contentBusiness.DeleteContents(content);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }
    }
}