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
    [RoutePrefix("api/feedback")]
    public class FeedBackController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly FeedBackBusiness _feedBackBusiness;

        public FeedBackController(FeedBackBusiness feedBackBusiness)
        {
            _feedBackBusiness = feedBackBusiness;
        }

        public FeedBackController() : this(new FeedBackBusiness())
        {
        }

        [Route("getallfeedback")]
        [HttpGet]
        public Response<List<FeedBackViewModel>> GetAllFeedBacks()
        {
            try
            {
                var response = _feedBackBusiness.GetAllFeedBacks();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<FeedBackViewModel>>(false, e.Message, null);
            }
        }

        [Route("updatefeedback")]
        [HttpPost]
        public Response<FeedBacks> UpdateFeedBacks([FromBody] FeedBacks feedback)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                feedback.LastUpdatedBy = userData.CodeUserName;
                return _feedBackBusiness.UpdateFeedBacks(feedback);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }

        [Route("deletefeedback")]
        [HttpPost]
        public Response<FeedBacks> DeleteFeedBacks([FromBody] FeedBacks feedback)
        {
            try
            {
                return _feedBackBusiness.DeleteFeedBacks(feedback);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }
    }
}