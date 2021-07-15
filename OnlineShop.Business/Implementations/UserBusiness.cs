using NLog;
using OnlineShop.Data.Repositories;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Business.Implementations
{
    public class UserBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly UserRepository _userRepository;

        public UserBusiness(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserBusiness()
        {
            _userRepository = new UserRepository();
        }

        public Response<List<UserViewModel>> GetAllUsers()
        {
            try
            {
                var data = _userRepository.GetAllUsers();
                if (data != null && data.Any())
                    return new Response<List<UserViewModel>>(true, "Success", data);
                return new Response<List<UserViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserViewModel>>(false, e.Message, null);
            }
        }

        public Response<List<UserGroups>> GetAllUserGroupForUser()
        {
            try
            {
                var data = _userRepository.GetAllUserGroupForUser();
                if (data != null && data.Any())
                    return new Response<List<UserGroups>>(true, "Success", data);
                return new Response<List<UserGroups>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroupForUser Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserGroups>>(false, e.Message, null);
            }
        }

        public Response<Users> InsertUsers(Users users)
        {
            try
            {                
                var data = _userRepository.InsertUsers(users);
                if (data != null && data.Any())
                    return new Response<Users>(true, "Success", data[0]);
                return new Response<Users>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        public Response<Users> UpdateUsers(Users users)
        {
            try
            {
                var data = _userRepository.UpdateUsers(users);
                if (data != null && data.Any())
                    return new Response<Users>(true, "Success", data[0]);
                return new Response<Users>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }
    }
}
