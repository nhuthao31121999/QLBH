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
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ProductBusiness _productBusiness;

        public ProductController(ProductBusiness productBusiness)
        {
            _productBusiness = productBusiness;
        }

        public ProductController() : this(new ProductBusiness())
        {
        }

        [Route("getallproduct")]
        [HttpGet]
        public Response<List<ProductViewModel>> GetAllProducts()
        {
            try
            {
                var response = _productBusiness.GetAllProducts();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ProductViewModel>>(false, e.Message, null);
            }
        }

        [Route("getallcategoryforproduct")]
        [HttpGet]
        public Response<List<Categories>> GetAllCategoryForProduct()
        {
            try
            {
                var response = _productBusiness.GetAllCategoryForProduct();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        [Route("getallproducerforproduct")]
        [HttpGet]
        public Response<List<Producers>> GetAllProducerForProduct()
        {
            try
            {
                var response = _productBusiness.GetAllProducerForProduct();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducerForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Producers>>(false, e.Message, null);
            }
        }

        [Route("insertproduct")]
        [HttpPost]
        public Response<Products> InsertProducts([FromBody] Products product)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                product.CreatedBy = userData.CodeUserName;
                return _productBusiness.InsertProducts(product);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }

        [Route("updateproduct")]
        [HttpPost]
        public Response<Products> UpdateProducts([FromBody] Products product)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                product.LastUpdatedBy = userData.CodeUserName;
                return _productBusiness.UpdateProducts(product);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }

        [Route("deleteproduct")]
        [HttpPost]
        public Response<Products> DeleteProducts([FromBody] Products product)
        {
            try
            {
                return _productBusiness.DeleteProducts(product);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }
    }
}