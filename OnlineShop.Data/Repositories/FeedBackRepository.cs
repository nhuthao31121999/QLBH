using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class FeedBackRepository : CommonRepository<FeedBackViewModel>
    {
        public List<FeedBackViewModel> GetAllFeedBacks()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllFeedBacks);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new List<FeedBackViewModel>();
            }
        }

        public List<FeedBacks> InsertFeedBacks(FeedBacks feedBack)
        {
            try
            {
                var result = ListByStoredProcedure<FeedBacks>(StoredProc.InsertFeedBacks,
                                      new StoredProcedureParameter("Name", feedBack.Name, DbType.String)
                                    , new StoredProcedureParameter("Phone", feedBack.Phone, DbType.String)
                                    , new StoredProcedureParameter("Email", feedBack.Email, DbType.String)
                                    , new StoredProcedureParameter("Address", feedBack.Address, DbType.String)
                                    , new StoredProcedureParameter("Content", feedBack.Content, DbType.String)
                                    , new StoredProcedureParameter("Status", feedBack.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedDate", feedBack.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", feedBack.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", feedBack.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", feedBack.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new List<FeedBacks>();
            }
        }

        public List<FeedBacks> UpdateFeedBacks(FeedBacks feedBack)
        {
            try
            {
                var result = ListByStoredProcedure<FeedBacks>(StoredProc.UpdateFeedBacks,
                                      new StoredProcedureParameter("FeedBackID", feedBack.FeedBackID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", feedBack.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", feedBack.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", feedBack.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new List<FeedBacks>();
            }
        }

        public List<FeedBacks> DeleteFeedBacks(FeedBacks feedBack)
        {
            try
            {
                var result = ListByStoredProcedure<FeedBacks>(StoredProc.DeleteFeedBacks,
                                      new StoredProcedureParameter("FeedBackID", feedBack.FeedBackID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteFeedBacks Failed: {e.Message}\n {e.StackTrace}");
                return new List<FeedBacks>();
            }
        }
    }
}
