using NLog;
using OnlineShop.Data.Repositories;
using OnlineShop.Entities.ViewModel;
using System;

namespace OnlineShop.Business.Implementations
{
    public class LoginBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly LoginRepository _loginRepository;

        public LoginBusiness(LoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }

        public LoginBusiness()
        {
            _loginRepository = new LoginRepository();
        }

        public UserViewModel UserLoginAdmin(string username, string password)
        {
            try
            {
                var data = _loginRepository.UserLoginAdmin(username, password);
                return data;
            }
            catch (Exception e)
            {
                _logger.Error($"UserLoginAdmin Failed: {e.Message}\n {e.StackTrace}");
                return new UserViewModel();
            }
        }
    }
}
