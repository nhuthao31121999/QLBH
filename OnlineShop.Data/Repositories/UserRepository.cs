using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class UserRepository : CommonRepository<UserViewModel>
    {
        public List<UserViewModel> GetAllUsers()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllUsers);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUsers Failed: {e.Message}\n {e.StackTrace}");
                return new List<UserViewModel>();
            }
        }

        public List<UserGroups> GetAllUserGroupForUser()
        {
            try
            {
                var result = ListByStoredProcedure<UserGroups>(StoredProc.GetAllUserGroupForUser);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroupForUser Failed: {e.Message}\n {e.StackTrace}");
                return new List<UserGroups>();
            }
        }

        public List<Users> InsertUsers(Users user)
        {
            try
            {
                var result = ListByStoredProcedure<Users>(StoredProc.InsertUsers,
                                      new StoredProcedureParameter("CodeUserName", user.CodeUserName, DbType.String)
                                    , new StoredProcedureParameter("UserName", user.UserName, DbType.String)
                                    , new StoredProcedureParameter("Password", user.Password, DbType.String)
                                    , new StoredProcedureParameter("Name", user.Name, DbType.String)
                                    , new StoredProcedureParameter("Address", user.Address, DbType.String)
                                    , new StoredProcedureParameter("Email", user.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", user.Phone, DbType.String)
                                    , new StoredProcedureParameter("UserGroupID", user.UserGroupID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", user.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedDate", user.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedDate", user.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", user.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsers Failed: {e.Message}\n {e.StackTrace}");
                return new List<Users>();
            }
        }

        public List<Users> UpdateUsers(Users user)
        {
            try
            {
                var result = ListByStoredProcedure<Users>(StoredProc.UpdateUsers,
                                      new StoredProcedureParameter("UserID", user.UserID, DbType.Int32)
                                    , new StoredProcedureParameter("UserName", user.UserName, DbType.String)
                                    , new StoredProcedureParameter("Name", user.Name, DbType.String)
                                    , new StoredProcedureParameter("Address", user.Address, DbType.String)
                                    , new StoredProcedureParameter("Email", user.Email, DbType.String)
                                    , new StoredProcedureParameter("Phone", user.Phone, DbType.String)
                                    , new StoredProcedureParameter("UserGroupID", user.UserGroupID, DbType.Int32)
                                    , new StoredProcedureParameter("Status", user.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedDate", user.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsers Failed: {e.Message}\n {e.StackTrace}");
                return new List<Users>();
            }
        }
    }
}
