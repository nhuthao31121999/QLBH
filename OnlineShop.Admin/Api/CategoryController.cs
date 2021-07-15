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
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly CategoriesBusiness _categoriesBusiness;

        public CategoryController(CategoriesBusiness categoriesBusiness)
        {
            _categoriesBusiness = categoriesBusiness;
        }

        public CategoryController() : this(new CategoriesBusiness())
        {
        }

        [Route("getallcategory")]
        [HttpGet]
        public Response<List<CategoryViewModel>> GetAllCategories()
        {
            try
            {
                var response = _categoriesBusiness.GetAllCategories();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryViewModel>>(false, e.Message, null);
            }
        }

        [Route("getallcategoryforcategoryparent")]
        [HttpGet]
        public Response<List<Categories>> GetAllCategoryForCategoryParent()
        {
            try
            {
                var response = _categoriesBusiness.GetAllCategoryForCategoryParent();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForCategoryParent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        [Route("insertcategory")]
        [HttpPost]
        public Response<Categories> InsertCategories([FromBody] Categories categories)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                categories.CreatedBy = userData.CodeUserName;
                return _categoriesBusiness.InsertCategories(categories);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        [Route("updatecategory")]
        [HttpPost]
        public Response<Categories> UpdateCategories([FromBody] Categories categories)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                categories.LastUpdatedBy = userData.CodeUserName;
                return _categoriesBusiness.UpdateCategories(categories);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        [Route("deletecategory")]
        [HttpPost]
        public Response<int> DeleteCategories([FromBody] Categories categories)
        {
            try
            {
                return _categoriesBusiness.DeleteCategories(categories);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}