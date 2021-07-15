using NLog;
using OnlineShop.Admin.Models;
using OnlineShop.Business.Implementations;
using OnlineShop.Common;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/client")]
    public class HomeClientController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly BindDataForClientHomePageBusiness _bindDataForClientHomePageBusiness;
        private readonly FeedBackBusiness _feedBackBusiness;

        public HomeClientController(BindDataForClientHomePageBusiness bindDataForClientHomePageBusiness, FeedBackBusiness feedBackBusiness)
        {
            _bindDataForClientHomePageBusiness = bindDataForClientHomePageBusiness;
            _feedBackBusiness = feedBackBusiness;
        }

        public HomeClientController() : this(new BindDataForClientHomePageBusiness(), new FeedBackBusiness())
        {
        }

        [Route("BindSlideForClientHomePage")]
        [HttpGet]
        public Response<List<Slides>> BindSlideForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindSlideForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindSlideForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Slides>>(false, e.Message, null);
            }
        }

        [Route("BindHotProductForClientHomePage")]
        [HttpGet]
        public Response<List<Products>> BindHotProductForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindHotProductForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindHotProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        [Route("BindNewProductForClientHomePage")]
        [HttpGet]
        public Response<List<Products>> BindNewProductForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindNewProductForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        [Route("BindFooterForClientHomePage")]
        [HttpGet]
        public Response<List<Footers>> BindFooterForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindFooterForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindFooterForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Footers>>(false, e.Message, null);
            }
        }

        [Route("BindTopViewProductForClientHomePage")]
        [HttpGet]
        public Response<List<Products>> BindTopViewProductForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindTopViewProductForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindTopViewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        [Route("BindNewNewsForClientHomePage")]
        [HttpGet]
        public Response<List<Contents>> BindNewNewsForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindNewNewsForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewNewsForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contents>>(false, e.Message, null);
            }
        }

        [Route("BindCategoryForClientHomePage")]
        [HttpGet]
        public Response<List<Categories>> BindCategoryForClientHomePage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindCategoryForClientHomePage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        [Route("BindCategoryContentForClientContentPage")]
        [HttpGet]
        public Response<List<CategoryContent>> BindCategoryContentForClientContentPage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindCategoryContentForClientContentPage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryContentForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        [Route("GetProductByCategoryForClientHomePage/{id}")]
        [HttpGet]
        public ResponseList<Products> GetProductByCategoryForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetProductByCategoryForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("GetContentByCategoryContentForClientHomePage/{id}")]
        [HttpGet]
        public ResponseList<Contents> GetContentByCategoryContentForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetContentByCategoryContentForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Contents>(false, e.Message, null, 0);
            }
        }

        [Route("GetCategoryForClientHomePage/{id}")]
        [HttpGet]
        public Response<Categories> GetCategoryForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetCategoryForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        [Route("GetCategoryContentForClientHomePage/{id}")]
        [HttpGet]
        public Response<CategoryContent> GetCategoryContentForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetCategoryContentForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        [Route("BindDataForClientContentPage")]
        [HttpGet]
        public Response<List<Contents>> BindDataForClientContentPage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindDataForClientContentPage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contents>>(false, e.Message, null);
            }
        }

        [Route("BindDataForClientAboutPage")]
        [HttpGet]
        public Response<List<Abouts>> BindDataForClientAboutPage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindDataForClientAboutPage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientAboutPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Abouts>>(false, e.Message, null);
            }
        }

        [Route("GetContentByIdForClientHomePage/{id}")]
        [HttpGet]
        public Response<ContentViewModel> GetContentByIdForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetContentByIdForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<ContentViewModel>(false, e.Message, null);
            }
        }

        [Route("GetProductByIdForClientHomePage/{id}")]
        [HttpGet]
        public Response<ProductViewModel> GetProductByIdForClientHomePage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.GetProductByIdForClientHomePage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<ProductViewModel>(false, e.Message, null);
            }
        }

        [Route("BindProductRelatedForClientProductDetailPage/{id}")]
        [HttpGet]
        public ResponseList<Products> BindProductRelatedForClientProductDetailPage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindProductRelatedForClientProductDetailPage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindProductRelatedForClientProductDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("BindContentRelatedForClientContentDetailPage/{id}")]
        [HttpGet]
        public ResponseList<Contents> BindContentRelatedForClientContentDetailPage(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindContentRelatedForClientContentDetailPage(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindContentRelatedForClientContentDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Contents>(false, e.Message, null, 0);
            }
        }

        [Route("BindDataForClientContactPage")]
        [HttpGet]
        public Response<List<Contacts>> BindDataForClientContactPage()
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.BindDataForClientContactPage();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContactPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contacts>>(false, e.Message, null);
            }
        }



        [Route("insertfeedback")]
        [HttpPost]
        public Response<FeedBacks> InsertFeedBacks([FromBody] FeedBacks feedback)
        {
            try
            {
                return _feedBackBusiness.InsertFeedBacks(feedback);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }

        [Route("InsertUsersForClient")]
        [HttpPost]
        public Response<Users> InsertUsersForClient([FromBody] Users user)
        {
            try
            {
                user.Password = EncriptFunctions.GeneratePassword(user.Password);
                return _bindDataForClientHomePageBusiness.InsertUsersForClient(user);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        [Route("UpdateUsersForClient")]
        [HttpPost]
        public Response<Users> UpdateUsersForClient([FromBody] Users user)
        {
            try
            {
                return _bindDataForClientHomePageBusiness.UpdateUsersForClient(user);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        [Route("FindProductForClientHomePage/{productName}")]
        [HttpGet]
        public Response<List<Products>> FindProductForClientHomePage(string productName)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FindProductForClientHomePage(productName);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FindProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        [Route("FilterNameASC/{id}")]
        [HttpGet]
        public ResponseList<Products> FilterNameASC(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FilterNameASC(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNameASC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("FilterNewProduct/{id}")]
        [HttpGet]
        public ResponseList<Products> FilterNewProduct(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FilterNewProduct(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("FilterPriceASC/{id}")]
        [HttpGet]
        public ResponseList<Products> FilterPriceASC(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FilterPriceASC(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceASC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("FilterPriceDESC/{id}")]
        [HttpGet]
        public ResponseList<Products> FilterPriceDESC(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FilterPriceDESC(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceDESC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        [Route("FilterTopViewProduct/{id}")]
        [HttpGet]
        public ResponseList<Products> FilterTopViewProduct(int id)
        {
            try
            {
                var response = _bindDataForClientHomePageBusiness.FilterTopViewProduct(id);
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"FilterTopViewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }
    }
}