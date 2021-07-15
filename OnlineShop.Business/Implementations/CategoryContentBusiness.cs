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
    public class CategoryContentBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly CategoryContentRepository _categoryContentRepository;

        public CategoryContentBusiness(CategoryContentRepository categoryContentRepository)
        {
            _categoryContentRepository = categoryContentRepository;
        }

        public CategoryContentBusiness()
        {
            _categoryContentRepository = new CategoryContentRepository();
        }

        public Response<List<CategoryContentViewModel>> GetAllCategoryContent()
        {
            try
            {
                var data = _categoryContentRepository.GetAllCategoryContent();
                if (data != null && data.Any())
                    return new Response<List<CategoryContentViewModel>>(true, "Success", data);
                return new Response<List<CategoryContentViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContentViewModel>>(false, e.Message, null);
            }
        }

        public Response<List<CategoryContent>> GetAllCategoryContentForCategoryContentParent()
        {
            try
            {
                var data = _categoryContentRepository.GetAllCategoryContentForCategoryContentParent();
                if (data != null && data.Any())
                    return new Response<List<CategoryContent>>(true, "Success", data);
                return new Response<List<CategoryContent>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForCategoryContentParent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        public Response<CategoryContent> InsertCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var data = _categoryContentRepository.InsertCategoryContent(categoryContent);
                if (data != null && data.Any())
                    return new Response<CategoryContent>(true, "Success", data[0]);
                return new Response<CategoryContent>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        public Response<CategoryContent> UpdateCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var data = _categoryContentRepository.UpdateCategoryContent(categoryContent);
                if (data != null && data.Any())
                    return new Response<CategoryContent>(true, "Success", data[0]);
                return new Response<CategoryContent>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<CategoryContent>(false, e.Message, null);
            }
        }

        public Response<int> DeleteCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var deleteCount = _categoryContentRepository.DeleteCategoryContent(categoryContent);
                return new Response<int>(true, "Success", deleteCount);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}
