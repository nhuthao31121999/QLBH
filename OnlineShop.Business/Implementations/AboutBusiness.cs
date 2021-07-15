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
    public class AboutBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly AboutRepository _aboutRepository;

        public AboutBusiness(AboutRepository aboutRepository)
        {
            _aboutRepository = aboutRepository;
        }

        public AboutBusiness()
        {
            _aboutRepository = new AboutRepository();
        }

        public Response<List<AboutViewModel>> GetAllAbouts()
        {
            try
            {
                var data = _aboutRepository.GetAllAbouts();
                if (data != null && data.Any())
                    return new Response<List<AboutViewModel>>(true, "Success", data);
                return new Response<List<AboutViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<AboutViewModel>>(false, e.Message, null);
            }
        }

        public Response<Abouts> InsertAbouts(Abouts abouts)
        {
            try
            {
                var data = _aboutRepository.InsertAbouts(abouts);
                if (data != null && data.Any())
                    return new Response<Abouts>(true, "Success", data[0]);
                return new Response<Abouts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }

        public Response<Abouts> UpdateAbouts(Abouts abouts)
        {
            try
            {
                var data = _aboutRepository.UpdateAbouts(abouts);
                if (data != null && data.Any())
                    return new Response<Abouts>(true, "Success", data[0]);
                return new Response<Abouts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }

        public Response<Abouts> DeleteAbouts(Abouts abouts)
        {
            try
            {
                var data = _aboutRepository.DeleteAbouts(abouts);
                if (data != null && data.Any())
                    return new Response<Abouts>(true, "Success", data[0]);
                return new Response<Abouts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Abouts>(false, e.Message, null);
            }
        }
    }
}
