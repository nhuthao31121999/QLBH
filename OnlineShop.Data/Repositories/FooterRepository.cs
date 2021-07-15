using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class FooterRepository : CommonRepository<FooterViewModel>
    {
        public List<FooterViewModel> GetAllFooters()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllFooters);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFooters Failed: {e.Message}\n {e.StackTrace}");
                return new List<FooterViewModel>();
            }
        }

        public List<Footers> InsertFooters(Footers footer)
        {
            try
            {
                var result = ListByStoredProcedure<Footers>(StoredProc.InsertFooters,
                                      new StoredProcedureParameter("Name", footer.Name, DbType.String)
                                    , new StoredProcedureParameter("Content", footer.Content, DbType.String)
                                    , new StoredProcedureParameter("Status", footer.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", footer.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", footer.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", footer.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", footer.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", footer.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFooters Failed: {e.Message}\n {e.StackTrace}");
                return new List<Footers>();
            }
        }

        public List<Footers> UpdateFooters(Footers footer)
        {
            try
            {
                var result = ListByStoredProcedure<Footers>(StoredProc.UpdateFooters,
                                       new StoredProcedureParameter("FooterID", footer.FooterID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", footer.Name, DbType.String)
                                    , new StoredProcedureParameter("Content", footer.Content, DbType.String)
                                    , new StoredProcedureParameter("Status", footer.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", footer.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", footer.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFooters Failed: {e.Message}\n {e.StackTrace}");
                return new List<Footers>();
            }
        }

        public List<Footers> DeleteFooters(Footers footer)
        {
            try
            {
                var result = ListByStoredProcedure<Footers>(StoredProc.DeleteFooters,
                                       new StoredProcedureParameter("FooterID", footer.FooterID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFooters Failed: {e.Message}\n {e.StackTrace}");
                return new List<Footers>();
            }
        }
    }
}
