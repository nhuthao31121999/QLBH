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
    [RoutePrefix("api/slide")]
    public class SlideController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly SlideBusiness _slideBusiness;

        public SlideController(SlideBusiness slideBusiness)
        {
            _slideBusiness = slideBusiness;
        }

        public SlideController() : this(new SlideBusiness())
        {
        }

        [Route("getallslide")]
        [HttpGet]
        public Response<List<SlideViewModel>> GetAllSlides()
        {
            try
            {
                var response = _slideBusiness.GetAllSlides();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<SlideViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertslide")]
        [HttpPost]
        public Response<Slides> InsertSlides([FromBody] Slides slide)
        {
            try
            {
                
                return _slideBusiness.InsertSlides(slide);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }

        [Route("updateslide")]
        [HttpPost]
        public Response<Slides> UpdateSlides([FromBody] Slides slide)
        {
            try
            {
               
                return _slideBusiness.UpdateSlides(slide);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }

        [Route("deleteslide")]
        [HttpPost]
        public Response<Slides> DeleteSlides([FromBody] Slides slide)
        {
            try
            {
                return _slideBusiness.DeleteSlides(slide);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteSlides Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Slides>(false, e.Message, null);
            }
        }
    }
}