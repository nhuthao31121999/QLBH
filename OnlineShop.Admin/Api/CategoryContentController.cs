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
    [RoutePrefix("api/categorycontent")]
    public class CategoryContentController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly CategoryContentBusiness _categoryContentBusiness;

        public CategoryContentController(CategoryContentBusiness categoryContentBusiness)
        {
            _categoryContentBusiness = categoryContentBusiness;
        }

        public CategoryContentController() : this(new CategoryContentBusiness())
        {
        }

        [Route("getallcategorycontent")]
        [HttpGet]
        public Response<List<CategoryContentViewModel>> GetAllCategoryContent()
        {
            try
            {
                var response = _categoryContentBusiness.GetAllCategoryContent();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContentViewModel>>(false, e.Message, null);
            }
        }

        [Route("getallcategorycontentforcategorycontentparent")]
        [HttpGet]
        public Response<List<CategoryContent>> GetAllCategoryContentForCategoryContentParent()
        {
            try
            {
                var response = _categoryContentBusiness.GetAllCategoryContentForCategoryContentParent();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForCategoryContentParent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        [Route("insertcategorycontent")]
        [HttpPost]
        public Response<CategoryContent> InsertCategoryContent([FromBody] CategoryContent categoryContent)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                categoryContent.CreatedBy = userData.CodeUserName;
                return _categoryContentBusiness.InsertCategoryContent(categoryContent);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        [Route("updatecategorycontent")]
        [HttpPost]
        public Response<CategoryContent> UpdateCategoryContent([FromBody] CategoryContent categoryContent)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                categoryContent.LastUpdatedBy = userData.CodeUserName;
                return _categoryContentBusiness.UpdateCategoryContent(categoryContent);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        [Route("deletecategorycontent")]
        [HttpPost]
        public Response<int> DeleteCategoryContent([FromBody] CategoryContent categoryContent)
        {
            try
            {
                return _categoryContentBusiness.DeleteCategoryContent(categoryContent);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}