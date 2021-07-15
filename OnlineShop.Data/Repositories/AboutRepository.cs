using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class AboutRepository : CommonRepository<AboutViewModel>
    {
        public List<AboutViewModel> GetAllAbouts()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllAbouts);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new List<AboutViewModel>();
            }
        }

        public List<Abouts> InsertAbouts(Abouts about)
        {
            try
            {
                var result = ListByStoredProcedure<Abouts>(StoredProc.InsertAbouts,
                                      new StoredProcedureParameter("Name", about.Name, DbType.String)
                                    , new StoredProcedureParameter("Description", about.Description, DbType.String)
                                    , new StoredProcedureParameter("Image", about.Image, DbType.String)
                                    , new StoredProcedureParameter("Detail", about.Detail, DbType.String)
                                    , new StoredProcedureParameter("Status", about.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", about.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", about.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", about.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", about.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", about.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Abouts>();
            }
        }

        public List<Abouts> UpdateAbouts(Abouts about)
        {
            try
            {
                var result = ListByStoredProcedure<Abouts>(StoredProc.UpdateAbouts,
                                      new StoredProcedureParameter("AboutID", about.AboutID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", about.Name, DbType.String)
                                    , new StoredProcedureParameter("Description", about.Description, DbType.String)
                                    , new StoredProcedureParameter("Image", about.Image, DbType.String)
                                    , new StoredProcedureParameter("Detail", about.Detail, DbType.String)
                                    , new StoredProcedureParameter("Status", about.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", about.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", about.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Abouts>();
            }
        }

        public List<Abouts> DeleteAbouts(Abouts about)
        {
            try
            {
                var result = ListByStoredProcedure<Abouts>(StoredProc.DeleteAbouts,
                                      new StoredProcedureParameter("AboutID", about.AboutID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteAbouts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Abouts>();
            }
        }
    }
}
