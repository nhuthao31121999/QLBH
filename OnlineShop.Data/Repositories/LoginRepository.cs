using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.ViewModel;
using System;
using System.Data;
using System.Linq;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class LoginRepository : CommonRepository<UserViewModel>
    {
        public UserViewModel UserLoginAdmin(string username, string password)
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.UserLoginAdmin,
                                    new StoredProcedureParameter("UserName", username, DbType.String)
                                  , new StoredProcedureParameter("Password", password, DbType.String));
                return result.FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.Error($"UserLoginAdmin Failed: {e.Message}\n {e.StackTrace}");
                return new UserViewModel();
            }
        }
    }
}
