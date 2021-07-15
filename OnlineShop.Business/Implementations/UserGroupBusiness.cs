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
    public class UserGroupBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly UserGroupRepository _userGroupRepository;

        public UserGroupBusiness(UserGroupRepository userGroupRepository)
        {
            _userGroupRepository = userGroupRepository;
        }

        public UserGroupBusiness()
        {
            _userGroupRepository = new UserGroupRepository();
        }

        public Response<List<UserGroupViewModel>> GetAllUserGroups()
        {
            try
            {
                var data = _userGroupRepository.GetAllUserGroups();
                if (data != null && data.Any())
                    return new Response<List<UserGroupViewModel>>(true, "Success", data);
                return new Response<List<UserGroupViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserGroupViewModel>>(false, e.Message, null);
            }
        }

        public Response<UserGroups> InsertUserGroups(UserGroups userGroups)
        {
            try
            {
                var data = _userGroupRepository.InsertUserGroups(userGroups);
                if (data != null && data.Any())
                    return new Response<UserGroups>(true, "Success", data[0]);
                return new Response<UserGroups>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<UserGroups>(false, e.Message, null);
            }
        }

        public Response<UserGroups> UpdateUserGroups(UserGroups userGroups)
        {
            try
            {
                var data = _userGroupRepository.UpdateUserGroups(userGroups);
                if (data != null && data.Any())
                    return new Response<UserGroups>(true, "Success", data[0]);
                return new Response<UserGroups>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<UserGroups>(false, e.Message, null);
            }
        }
    }
}
