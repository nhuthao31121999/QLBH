using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class CategoryContentRepository : CommonRepository<CategoryContentViewModel>
    {
        public List<CategoryContentViewModel> GetAllCategoryContent()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllCategoryContent);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContentViewModel>();
            }
        }

        public List<CategoryContent> GetAllCategoryContentForCategoryContentParent()
        {
            try
            {
                var result = ListByStoredProcedure<CategoryContent>(StoredProc.GetAllCategoryContentForCategoryContentParent);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryContentForCategoryContentParent Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public List<CategoryContent> InsertCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var result = ListByStoredProcedure<CategoryContent>(StoredProc.InsertCategoryContent,
                                      new StoredProcedureParameter("Name", categoryContent.Name, DbType.String)
                                    , new StoredProcedureParameter("ParentId", categoryContent.ParentId, DbType.Int32)
                                    , new StoredProcedureParameter("DisplayOrder", categoryContent.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", categoryContent.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", categoryContent.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", categoryContent.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", categoryContent.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", categoryContent.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", categoryContent.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public List<CategoryContent> UpdateCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var result = ListByStoredProcedure<CategoryContent>(StoredProc.UpdateCategoryContent,
                                      new StoredProcedureParameter("CategoryContentID", categoryContent.CategoryContentID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", categoryContent.Name, DbType.String)
                                    , new StoredProcedureParameter("ParentId", categoryContent.ParentId, DbType.Int32)
                                    , new StoredProcedureParameter("DisplayOrder", categoryContent.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", categoryContent.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", categoryContent.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", categoryContent.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryContent>();
            }
        }

        public int DeleteCategoryContent(CategoryContent categoryContent)
        {
            try
            {
                var result = ListByStoredProcedure<int>(StoredProc.DeleteCategoryContent,
                                      new StoredProcedureParameter("CategoryContentID", categoryContent.CategoryContentID, DbType.Int32));
                return (result != null) ? result.Count : 0;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategoryContent Failed: {e.Message}\n {e.StackTrace}");
                return 0;
            }
        }
    }
}
