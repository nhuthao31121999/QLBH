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
    public class FeedBackBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly FeedBackRepository _feedBackRepository;

        public FeedBackBusiness(FeedBackRepository feedBackRepository)
        {
            _feedBackRepository = feedBackRepository;
        }

        public FeedBackBusiness()
        {
            _feedBackRepository = new FeedBackRepository();
        }

        public Response<List<FeedBackViewModel>> GetAllFeedBacks()
        {
            try
            {
                var data = _feedBackRepository.GetAllFeedBacks();
                if (data != null && data.Any())
                    return new Response<List<FeedBackViewModel>>(true, "Success", data);
                return new Response<List<FeedBackViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<FeedBackViewModel>>(false, e.Message, null);
            }
        }

        public Response<FeedBacks> InsertFeedBacks(FeedBacks feedBacks)
        {
            try
            {
                var data = _feedBackRepository.InsertFeedBacks(feedBacks);
                if (data != null && data.Any())
                    return new Response<FeedBacks>(true, "Success", data[0]);
                return new Response<FeedBacks>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }

        public Response<FeedBacks> UpdateFeedBacks(FeedBacks feedBacks)
        {
            try
            {
                var data = _feedBackRepository.UpdateFeedBacks(feedBacks);
                if (data != null && data.Any())
                    return new Response<FeedBacks>(true, "Success", data[0]);
                return new Response<FeedBacks>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }

        public Response<FeedBacks> DeleteFeedBacks(FeedBacks feedBacks)
        {
            try
            {
                var data = _feedBackRepository.DeleteFeedBacks(feedBacks);
                if (data != null && data.Any())
                    return new Response<FeedBacks>(true, "Success", data[0]);
                return new Response<FeedBacks>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new Response<FeedBacks>(false, e.Message, null);
            }
        }
    }
}
