using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class UserGroupRepository : CommonRepository<UserGroupViewModel>
    {
        public List<UserGroupViewModel> GetAllUserGroups()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllUserGroups);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new List<UserGroupViewModel>();
            }
        }

        public List<UserGroups> InsertUserGroups(UserGroups userGroup)
        {
            try
            {
                var result = ListByStoredProcedure<UserGroups>(StoredProc.InsertUserGroups,
                                      new StoredProcedureParameter("Name", userGroup.Name, DbType.String)
                                    , new StoredProcedureParameter("Description", userGroup.Description, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", userGroup.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedDate", userGroup.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new List<UserGroups>();
            }
        }

        public List<UserGroups> UpdateUserGroups(UserGroups userGroup)
        {
            try
            {
                var result = ListByStoredProcedure<UserGroups>(StoredProc.UpdateUserGroups,
                                      new StoredProcedureParameter("UserGroupID", userGroup.UserGroupID, DbType.Int32)
                                    , new StoredProcedureParameter("Name", userGroup.Name, DbType.String)
                                    , new StoredProcedureParameter("Description", userGroup.Description, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", userGroup.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new List<UserGroups>();
            }
        }
    }
}
