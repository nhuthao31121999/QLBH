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
    public class BindDataForClientHomePageBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly BindDataForClientHomePageRepository _bindDataForClientHomePageRepository;

        public BindDataForClientHomePageBusiness(BindDataForClientHomePageRepository bindDataForClientHomePageRepository)
        {
            _bindDataForClientHomePageRepository = bindDataForClientHomePageRepository;
        }

        public BindDataForClientHomePageBusiness()
        {
            _bindDataForClientHomePageRepository = new BindDataForClientHomePageRepository();
        }

        public Response<List<Slides>> BindSlideForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindSlideForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Slides>>(true, "Success", data);
                return new Response<List<Slides>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindSlideForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Slides>>(false, e.Message, null);
            }
        }

        public Response<List<Products>> BindHotProductForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindHotProductForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Products>>(true, "Success", data);
                return new Response<List<Products>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindHotProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        public Response<List<Products>> BindNewProductForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindNewProductForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Products>>(true, "Success", data);
                return new Response<List<Products>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        public Response<List<Footers>> BindFooterForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindFooterForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Footers>>(true, "Success", data);
                return new Response<List<Footers>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindFooterForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Footers>>(false, e.Message, null);
            }
        }

        public Response<List<Products>> BindTopViewProductForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindTopViewProductForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Products>>(true, "Success", data);
                return new Response<List<Products>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindTopViewProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        public Response<List<Contents>> BindNewNewsForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindNewNewsForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Contents>>(true, "Success", data);
                return new Response<List<Contents>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindNewNewsForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contents>>(false, e.Message, null);
            }
        }

        public Response<List<Categories>> BindCategoryForClientHomePage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindCategoryForClientHomePage();
                if (data != null && data.Any())
                    return new Response<List<Categories>>(true, "Success", data);
                return new Response<List<Categories>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        public Response<List<CategoryContent>> BindCategoryContentForClientContentPage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindCategoryContentForClientContentPage();
                if (data != null && data.Any())
                    return new Response<List<CategoryContent>>(true, "Success", data);
                return new Response<List<CategoryContent>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindCategoryContentForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        public ResponseList<Products> GetProductByCategoryForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetProductByCategoryForClientHomePage(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Contents> GetContentByCategoryContentForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetContentByCategoryContentForClientHomePage(id);
                if (data != null && data.Any())
                    return new ResponseList<Contents>(true, "Success", data, data.Count);
                return new ResponseList<Contents>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Contents>(false, e.Message, null, 0);
            }
        }

        public Response<Categories> GetCategoryForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetCategoryForClientHomePage(id);
                if (data != null && data.Any())
                    return new Response<Categories>(true, "Success", data[0]);
                return new Response<Categories>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByCategoryForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        public Response<CategoryContent> GetCategoryContentForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetCategoryContentForClientHomePage(id);
                if (data != null && data.Any())
                    return new Response<CategoryContent>(true, "Success", data[0]);
                return new Response<CategoryContent>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetCategoryContentForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        public Response<List<Contents>> BindDataForClientContentPage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindDataForClientContentPage();
                if (data != null && data.Any())
                    return new Response<List<Contents>>(true, "Success", data);
                return new Response<List<Contents>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContentPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contents>>(false, e.Message, null);
            }
        }

        public Response<List<Abouts>> BindDataForClientAboutPage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindDataForClientAboutPage();
                if (data != null && data.Any())
                    return new Response<List<Abouts>>(true, "Success", data);
                return new Response<List<Abouts>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientAboutPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Abouts>>(false, e.Message, null);
            }
        }

        public Response<ContentViewModel> GetContentByIdForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetContentByIdForClientHomePage(id);
                if (data != null && data.Any())
                    return new Response<ContentViewModel>(true, "Success", data[0]);
                return new Response<ContentViewModel>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetContentByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<ContentViewModel>(false, e.Message, null);
            }
        }

        public Response<ProductViewModel> GetProductByIdForClientHomePage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.GetProductByIdForClientHomePage(id);
                if (data != null && data.Any())
                    return new Response<ProductViewModel>(true, "Success", data[0]);
                return new Response<ProductViewModel>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetProductByIdForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<ProductViewModel>(false, e.Message, null);
            }
        }

        public ResponseList<Products> BindProductRelatedForClientProductDetailPage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindProductRelatedForClientProductDetailPage(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"BindProductRelatedForClientProductDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Contents> BindContentRelatedForClientContentDetailPage(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindContentRelatedForClientContentDetailPage(id);
                if (data != null && data.Any())
                    return new ResponseList<Contents>(true, "Success", data, data.Count);
                return new ResponseList<Contents>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"BindContentRelatedForClientContentDetailPage Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Contents>(false, e.Message, null, 0);
            }
        }

        public Response<List<Contacts>> BindDataForClientContactPage()
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.BindDataForClientContactPage();
                if (data != null && data.Any())
                    return new Response<List<Contacts>>(true, "Success", data);
                return new Response<List<Contacts>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"BindDataForClientContactPage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Contacts>>(false, e.Message, null);
            }
        }

        public Response<Users> InsertUsersForClient(Users users)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.InsertUsersForClient(users);
                if (data != null && data.Any())
                    return new Response<Users>(true, "Success", data[0]);
                return new Response<Users>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        public Response<Users> UpdateUsersForClient(Users users)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.UpdateUsersForClient(users);
                if (data != null && data.Any())
                    return new Response<Users>(true, "Success", data[0]);
                return new Response<Users>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsersForClient Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        public Response<Orders> InsertOrders(Orders orders)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.InsertOrders(orders);
                if (data != null && data.Any())
                    return new Response<Orders>(true, "Success", data[0]);
                return new Response<Orders>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertOrders Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Orders>(false, e.Message, null);
            }
        }

        public Response<OrderDetails> InsertOrderDetails(OrderDetails orderDetail)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.InsertOrderDetails(orderDetail);
                if (data != null && data.Any())
                    return new Response<OrderDetails>(true, "Success", data[0]);
                return new Response<OrderDetails>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertOrderDetails Failed: {e.Message}\n {e.StackTrace}");
                return new Response<OrderDetails>(false, e.Message, null);
            }
        }

        public Response<List<Products>> FindProductForClientHomePage(string productName)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FindProductForClientHomePage(productName);
                if (data != null && data.Any())
                    return new Response<List<Products>>(true, "Success", data);
                return new Response<List<Products>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"FindProductForClientHomePage Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Products>>(false, e.Message, null);
            }
        }

        public ResponseList<Products> FilterPriceDESC(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FilterPriceDESC(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceDESC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Products> FilterNameASC(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FilterNameASC(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNameASC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Products> FilterNewProduct(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FilterNewProduct(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"FilterNewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Products> FilterPriceASC(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FilterPriceASC(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"FilterPriceASC Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }

        public ResponseList<Products> FilterTopViewProduct(int id)
        {
            try
            {
                var data = _bindDataForClientHomePageRepository.FilterTopViewProduct(id);
                if (data != null && data.Any())
                    return new ResponseList<Products>(true, "Success", data, data.Count);
                return new ResponseList<Products>(false, "Fail", null, 0);
            }
            catch (Exception e)
            {
                _logger.Error($"FilterTopViewProduct Failed: {e.Message}\n {e.StackTrace}");
                return new ResponseList<Products>(false, e.Message, null, 0);
            }
        }
    }
}
