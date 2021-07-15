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
    public class SlideBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly SlideRepository _slideRepository;

        public SlideBusiness(SlideRepository slideRepository)
        {
            _slideRepository = slideRepository;
        }

        public SlideBusiness()
        {
            _slideRepository = new SlideRepository();
        }

        public Response<List<SlideViewModel>> GetAllSlides()
        {
            try
            {
                var data = _slideRepository.GetAllSlides();
                if (data != null && data.Any())
                    return new Response<List<SlideViewModel>>(true, "Success", data);
                return new Response<List<SlideViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<SlideViewModel>>(false, e.Message, null);
            }
        }

        public Response<Slides> InsertSlides(Slides slides)
        {
            try
            {
                var data = _slideRepository.InsertSlides(slides);
                if (data != null && data.Any())
                    return new Response<Slides>(true, "Success", data[0]);
                return new Response<Slides>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }

        public Response<Slides> UpdateSlides(Slides slides)
        {
            try
            {
                var data = _slideRepository.UpdateSlides(slides);
                if (data != null && data.Any())
                    return new Response<Slides>(true, "Success", data[0]);
                return new Response<Slides>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }

        public Response<Slides> DeleteSlides(Slides slides)
        {
            try
            {
                var data = _slideRepository.DeleteSlides(slides);
                if (data != null && data.Any())
                    return new Response<Slides>(true, "Success", data[0]);
                return new Response<Slides>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }
    }
}
