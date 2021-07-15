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
    public class ProductBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ProductRepository _productRepository;

        public ProductBusiness(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public ProductBusiness()
        {
            _productRepository = new ProductRepository();
        }

        public Response<List<ProductViewModel>> GetAllProducts()
        {
            try
            {
                var data = _productRepository.GetAllProducts();
                if (data != null && data.Any())
                    return new Response<List<ProductViewModel>>(true, "Success", data);
                return new Response<List<ProductViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ProductViewModel>>(false, e.Message, null);
            }
        }

        public Response<List<Categories>> GetAllCategoryForProduct()
        {
            try
            {
                var data = _productRepository.GetAllCategoryForProduct();
                if (data != null && data.Any())
                    return new Response<List<Categories>>(true, "Success", data);
                return new Response<List<Categories>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        public Response<List<Producers>> GetAllProducerForProduct()
        {
            try
            {
                var data = _productRepository.GetAllProducerForProduct();
                if (data != null && data.Any())
                    return new Response<List<Producers>>(true, "Success", data);
                return new Response<List<Producers>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducerForProduct Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Producers>>(false, e.Message, null);
            }
        }

        public Response<Products> InsertProducts(Products products)
        {
            try
            {
                var data = _productRepository.InsertProducts(products);
                if (data != null && data.Any())
                    return new Response<Products>(true, "Success", data[0]);
                return new Response<Products>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }

        public Response<Products> UpdateProducts(Products products)
        {
            try
            {
                var data = _productRepository.UpdateProducts(products);
                if (data != null && data.Any())
                    return new Response<Products>(true, "Success", data[0]);
                return new Response<Products>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }

        public Response<Products> DeleteProducts(Products products)
        {
            try
            {
                var data = _productRepository.DeleteProducts(products);
                if (data != null && data.Any())
                    return new Response<Products>(true, "Success", data[0]);
                return new Response<Products>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Products>(false, e.Message, null);
            }
        }
    }
}
