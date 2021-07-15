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
    public class CategoriesBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly CategoriesRepository _categoriesRepository;

        public CategoriesBusiness(CategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        public CategoriesBusiness()
        {
            _categoriesRepository = new CategoriesRepository();
        }

        public Response<List<CategoryViewModel>> GetAllCategories()
        {
            try
            {
                var data = _categoriesRepository.GetAllCategories();
                if (data != null && data.Any())
                    return new Response<List<CategoryViewModel>>(true, "Success", data);
                return new Response<List<CategoryViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryViewModel>>(false, e.Message, null);
            }
        }

        public Response<List<Categories>> GetAllCategoryForCategoryParent()
        {
            try
            {
                var data = _categoriesRepository.GetAllCategoryForCategoryParent();
                if (data != null && data.Any())
                    return new Response<List<Categories>>(true, "Success", data);
                return new Response<List<Categories>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForCategoryParent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<Categories>>(false, e.Message, null);
            }
        }

        public Response<Categories> InsertCategories(Categories categories)
        {
            try
            {
                var data = _categoriesRepository.InsertCategories(categories);
                if (data != null && data.Any())
                    return new Response<Categories>(true, "Success", data[0]);
                return new Response<Categories>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        public Response<Categories> UpdateCategories(Categories categories)
        {
            try
            {
                var data = _categoriesRepository.UpdateCategories(categories);
                if (data != null && data.Any())
                    return new Response<Categories>(true, "Success", data[0]);
                return new Response<Categories>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Categories>(false, e.Message, null);
            }
        }

        public Response<int> DeleteCategories(Categories categories)
        {
            try
            {
                var deleteCount = _categoriesRepository.DeleteCategories(categories);
                return new Response<int>(true, "Success", deleteCount);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategories Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}
