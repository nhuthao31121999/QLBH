using Newtonsoft.Json;
using NLog;
using OnlineShop.Admin.Models;
using OnlineShop.Business.Implementations;
using OnlineShop.Entities.DtoEntities.Common;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace OnlineShop.Admin.Api
{
    [RoutePrefix("api/contact")]
    public class ContactController : ApiController
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ContactBusiness _contactBusiness;

        public ContactController(ContactBusiness contactBusiness)
        {
            _contactBusiness = contactBusiness;
        }

        public ContactController() : this(new ContactBusiness())
        {
        }

        [Route("getallcontact")]
        [HttpGet]
        public Response<List<ContactViewModel>> GetAllContacts()
        {
            try
            {
                var response = _contactBusiness.GetAllContacts();
                return response;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ContactViewModel>>(false, e.Message, null);
            }
        }

        [Route("insertcontact")]
        [HttpPost]
        public Response<Contacts> InsertContacts([FromBody] Contacts contact)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                contact.CreatedBy = userData.CodeUserName;
                return _contactBusiness.InsertContacts(contact);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }

        [Route("updatecontact")]
        [HttpPost]
        public Response<Contacts> UpdateContacts([FromBody] Contacts contact)
        {
            try
            {
                var osPrincipal = (UserIdentity)System.Web.HttpContext.Current.User;
                var userData = JsonConvert.DeserializeObject<UserViewModel>(osPrincipal.UserData);
                contact.LastUpdatedBy = userData.CodeUserName;
                return _contactBusiness.UpdateContacts(contact);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }

        [Route("deletecontact")]
        [HttpPost]
        public Response<Contacts> DeleteContacts([FromBody] Contacts contact)
        {
            try
            {
                return _contactBusiness.DeleteContacts(contact);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }
    }
}