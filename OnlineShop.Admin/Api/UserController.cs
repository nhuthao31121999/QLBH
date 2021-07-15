using NLog;
using OnlineShop.Business.Implementations;
using OnlineShop.Common;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly UserBusiness _userBusiness;

        public UserController(UserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }

        public UserController() : this(new UserBusiness())
        {
        }

        [Route("getalluser")]
        [HttpGet]
        public Response<List<UserViewModel>> GetAllUsers()
        {
            try
            {
                var response = _userBusiness.GetAllUsers();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserViewModel>>(false, e.Message, null);
            }
        }

        [Route("getallusergroupforuser")]
        [HttpGet]
        public Response<List<UserGroups>> GetAllUserGroupForUser()
        {
            try
            {
                var response = _userBusiness.GetAllUserGroupForUser();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllUserGroupForUser Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<UserGroups>>(false, e.Message, null);
            }
        }

        [Route("insertuser")]
        [HttpPost]
        public Response<Users> InsertUsers([FromBody] Users user)
        {
            try
            {
                user.Password = EncriptFunctions.GeneratePassword(user.Password);
                return _userBusiness.InsertUsers(user);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }

        [Route("updateuser")]
        [HttpPost]
        public Response<Users> UpdateUsers([FromBody] Users user)
        {
            try
            {
                return _userBusiness.UpdateUsers(user);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateUsers Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Users>(false, e.Message, null);
            }
        }
    }
}