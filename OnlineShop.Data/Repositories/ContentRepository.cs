using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class ContentRepository : CommonRepository<ContentViewModel>
    {
        public List<ContentViewModel> GetAllContents()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllContents);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContents Failed: {e.Message}\n {e.StackTrace}");
                return new List<ContentViewModel>();
            }
        }

        public List<CategoryContent> GetAllCategoryContentForContent()
        {
            try
            {
                var result = ListByStoredProcedure<CategoryContent>(StoredProc.GetAllCategoryContentForContent);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForContent Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public List<Contents> InsertContents(Contents content)
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.InsertContents,
                                      new StoredProcedureParameter("Title", content.Title, DbType.String)
                                    , new StoredProcedureParameter("Image", content.Image, DbType.String)
                                    , new StoredProcedureParameter("Description", content.Description, DbType.String)
                                    , new StoredProcedureParameter("Detail", content.Detail, DbType.String)
                                    , new StoredProcedureParameter("ContenSource", content.ContenSource, DbType.String)
                                    , new StoredProcedureParameter("CategoryContentID", content.CategoryContentID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", content.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", content.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", content.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", content.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", content.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", content.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContents Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Contents> UpdateContents(Contents content)
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.UpdateContents,
                                       new StoredProcedureParameter("ContentID", content.ContentID, DbType.Int32)
                                    , new StoredProcedureParameter("Title", content.Title, DbType.String)
                                    , new StoredProcedureParameter("Image", content.Image, DbType.String)
                                    , new StoredProcedureParameter("Description", content.Description, DbType.String)
                                    , new StoredProcedureParameter("Detail", content.Detail, DbType.String)
                                    , new StoredProcedureParameter("ContenSource", content.ContenSource, DbType.String)
                                    , new StoredProcedureParameter("CategoryContentID", content.CategoryContentID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", content.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", content.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", content.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContents Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }

        public List<Contents> DeleteContents(Contents content)
        {
            try
            {
                var result = ListByStoredProcedure<Contents>(StoredProc.DeleteContents,
                                       new StoredProcedureParameter("ContentID", content.ContentID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContents Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contents>();
            }
        }
    }
}
