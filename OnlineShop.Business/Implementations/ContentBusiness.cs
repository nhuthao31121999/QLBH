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
    public class ContentBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ContentRepository _contentRepository;

        public ContentBusiness(ContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public ContentBusiness()
        {
            _contentRepository = new ContentRepository();
        }

        public Response<List<ContentViewModel>> GetAllContents()
        {
            try
            {
                var data = _contentRepository.GetAllContents();
                if (data != null && data.Any())
                    return new Response<List<ContentViewModel>>(true, "Success", data);
                return new Response<List<ContentViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ContentViewModel>>(false, e.Message, null);
            }
        }

        public Response<List<CategoryContent>> GetAllCategoryContentForContent()
        {
            try
            {
                var data = _contentRepository.GetAllCategoryContentForContent();
                if (data != null && data.Any())
                    return new Response<List<CategoryContent>>(true, "Success", data);
                return new Response<List<CategoryContent>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForContent Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<CategoryContent>>(false, e.Message, null);
            }
        }

        public Response<Contents> InsertContents(Contents contents)
        {
            try
            {
                var data = _contentRepository.InsertContents(contents);
                if (data != null && data.Any())
                    return new Response<Contents>(true, "Success", data[0]);
                return new Response<Contents>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }

        public Response<Contents> UpdateContents(Contents contents)
        {
            try
            {
                var data = _contentRepository.UpdateContents(contents);
                if (data != null && data.Any())
                    return new Response<Contents>(true, "Success", data[0]);
                return new Response<Contents>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }

        public Response<Contents> DeleteContents(Contents contents)
        {
            try
            {
                var data = _contentRepository.DeleteContents(contents);
                if (data != null && data.Any())
                    return new Response<Contents>(true, "Success", data[0]);
                return new Response<Contents>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContents Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contents>(false, e.Message, null);
            }
        }
    }
}
