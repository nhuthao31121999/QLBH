using NLog;
using OnlineShop.Business.Implementations;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/usergroup")]
    public class UserGroupController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly UserGroupBusiness _userGroupBusiness;

        public UserGroupController(UserGroupBusiness userGroupBusiness)
        {
            _userGroupBusiness = userGroupBusiness;
        }

        public UserGroupController() : this(new UserGroupBusiness())
        {
        }

        [Route("getallusergroup")]
        [HttpGet]
        public Response<List<UserGroupViewModel>> GetAllUserGroups()
        {
            try
            {
                var response = _userGroupBusiness.GetAllUserGroups();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserGroupViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertusergroup")]
        [HttpPost]
        public Response<UserGroups> InsertUserGroups([FromBody] UserGroups usergroup)
        {
            try
            {
                return _userGroupBusiness.InsertUserGroups(usergroup);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<UserGroups>(false, e.Message, null);
            }
        }

        [Route("updateusergroup")]
        [HttpPost]
        public Response<UserGroups> UpdateUserGroups([FromBody] UserGroups usergroup)
        {
            try
            {
                return _userGroupBusiness.UpdateUserGroups(usergroup);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUserGroups Failed: {e.Message}\n {e.StackTrace}");
                return new Response<UserGroups>(false, e.Message, null);
            }
        }
    }
}