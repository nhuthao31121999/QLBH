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
    public class FooterBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly FooterRepository _footerRepository;

        public FooterBusiness(FooterRepository footerRepository)
        {
            _footerRepository = footerRepository;
        }

        public FooterBusiness()
        {
            _footerRepository = new FooterRepository();
        }

        public Response<List<FooterViewModel>> GetAllFooters()
        {
            try
            {
                var data = _footerRepository.GetAllFooters();
                if (data != null && data.Any())
                    return new Response<List<FooterViewModel>>(true, "Success", data);
                return new Response<List<FooterViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<FooterViewModel>>(false, e.Message, null);
            }
        }

        public Response<Footers> InsertFooters(Footers footers)
        {
            try
            {
                var data = _footerRepository.InsertFooters(footers);
                if (data != null && data.Any())
                    return new Response<Footers>(true, "Success", data[0]);
                return new Response<Footers>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }

        public Response<Footers> UpdateFooters(Footers footers)
        {
            try
            {
                var data = _footerRepository.UpdateFooters(footers);
                if (data != null && data.Any())
                    return new Response<Footers>(true, "Success", data[0]);
                return new Response<Footers>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }

        public Response<Footers> DeleteFooters(Footers footers)
        {
            try
            {
                var data = _footerRepository.DeleteFooters(footers);
                if (data != null && data.Any())
                    return new Response<Footers>(true, "Success", data[0]);
                return new Response<Footers>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFooters Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Footers>(false, e.Message, null);
            }
        }
    }
}
