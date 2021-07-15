using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class CategoriesRepository : CommonRepository<CategoryViewModel>
    {
        public List<CategoryViewModel> GetAllCategories()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllCategories);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategories Failed: {e.Message}\n {e.StackTrace}");
                return new List<CategoryViewModel>();
            }
        }

        public List<Categories> GetAllCategoryForCategoryParent()
        {
            try
            {
                var result = ListByStoredProcedure<Categories>(StoredProc.GetAllCategoryForCategoryParent);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllCategoryForCategoryParent Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public List<Categories> InsertCategories(Categories categories)
        {
            try
            {
                var result = ListByStoredProcedure<Categories>(StoredProc.InsertCategories,
                                      new StoredProcedureParameter("Name", categories.Name, DbType.String)
                                    , new StoredProcedureParameter("ParentId", categories.ParentId, DbType.Int32)
                                    , new StoredProcedureParameter("DisplayOrder", categories.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", categories.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", categories.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", categories.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", categories.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", categories.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", categories.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertCategories Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public List<Categories> UpdateCategories(Categories categories)
        {
            try
            {
                var result = ListByStoredProcedure<Categories>(StoredProc.UpdateCategories,
                                      new StoredProcedureParameter("CategoryID", categories.CategoryID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", categories.Name, DbType.String)
                                    , new StoredProcedureParameter("ParentId", categories.ParentId, DbType.Int32)
                                    , new StoredProcedureParameter("DisplayOrder", categories.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", categories.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", categories.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", categories.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateCategories Failed: {e.Message}\n {e.StackTrace}");
                return new List<Categories>();
            }
        }

        public int DeleteCategories(Categories categories)
        {
            try
            {
                var result = ListByStoredProcedure<int>(StoredProc.DeleteCategories,
                                      new StoredProcedureParameter("CategoryID", categories.CategoryID, DbType.Int32));
                return (result!= null)? result.Count : 0;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteCategories Failed: {e.Message}\n {e.StackTrace}");
                return 0;
            }
        }
    }
}
