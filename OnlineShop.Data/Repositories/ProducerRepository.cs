using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class ProducerRepository : CommonRepository<ProducerViewModel>
    {
        public List<ProducerViewModel> GetAllProducers()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllProducers);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllProducers Failed: {e.Message}\n {e.StackTrace}");
                return new List<ProducerViewModel>();
            }
        }

        public List<Producers> InsertProducers(Producers producer)
        {
            try
            {
                var result = ListByStoredProcedure<Producers>(StoredProc.InsertProducers,
                                      new StoredProcedureParameter("Name", producer.Name, DbType.String)
                                    , new StoredProcedureParameter("Logo", producer.Logo, DbType.String)
                                    , new StoredProcedureParameter("Email", producer.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", producer.Phone, DbType.String)
                                    , new StoredProcedureParameter("Status", producer.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", producer.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", producer.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", producer.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", producer.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", producer.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertProducers Failed: {e.Message}\n {e.StackTrace}");
                return new List<Producers>();
            }
        }

        public List<Producers> UpdateProducers(Producers producer)
        {
            try
            {
                var result = ListByStoredProcedure<Producers>(StoredProc.UpdateProducers,
                                      new StoredProcedureParameter("ProducerID", producer.ProducerID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", producer.Name, DbType.String)
                                    , new StoredProcedureParameter("Logo", producer.Logo, DbType.String)
                                    , new StoredProcedureParameter("Email", producer.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", producer.Phone, DbType.String)
                                    , new StoredProcedureParameter("Status", producer.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", producer.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", producer.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateProducers Failed: {e.Message}\n {e.StackTrace}");
                return new List<Producers>();
            }
        }

        public int DeleteProducers(Producers producer)
        {
            try
            {
                var result = ListByStoredProcedure<Producers>(StoredProc.DeleteProducers,
                                      new StoredProcedureParameter("ProducerID", producer.ProducerID, DbType.Int32));
                return (result != null) ? result.Count : 0;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteProducers Failed: {e.Message}\n {e.StackTrace}");
                return 0;
            }
        }
    }
}
