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
    public class ProducerBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ProducerRepository _producerRepository;

        public ProducerBusiness(ProducerRepository producerRepository)
        {
            _producerRepository = producerRepository;
        }

        public ProducerBusiness()
        {
            _producerRepository = new ProducerRepository();
        }

        public Response<List<ProducerViewModel>> GetAllProducers()
        {
            try
            {
                var data = _producerRepository.GetAllProducers();
                if (data != null && data.Any())
                    return new Response<List<ProducerViewModel>>(true, "Success", data);
                return new Response<List<ProducerViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ProducerViewModel>>(false, e.Message, null);
            }
        }

        public Response<Producers> InsertProducers(Producers producers)
        {
            try
            {
                var data = _producerRepository.InsertProducers(producers);
                if (data != null && data.Any())
                    return new Response<Producers>(true, "Success", data[0]);
                return new Response<Producers>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Producers>(false, e.Message, null);
            }
        }

        public Response<Producers> UpdateProducers(Producers producers)
        {
            try
            {
                var data = _producerRepository.UpdateProducers(producers);
                if (data != null && data.Any())
                    return new Response<Producers>(true, "Success", data[0]);
                return new Response<Producers>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Producers>(false, e.Message, null);
            }
        }

        public Response<int> DeleteProducers(Producers producers)
        {
            try
            {
                var deleteCount = _producerRepository.DeleteProducers(producers);
                return new Response<int>(true, "Success", deleteCount);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<int>(false, e.Message, 0);
            }
        }
    }
}
