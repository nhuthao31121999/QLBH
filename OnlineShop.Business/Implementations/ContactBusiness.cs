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
    public class ContactBusiness
    {
        protected readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly ContactRepository _contactRepository;

        public ContactBusiness(ContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public ContactBusiness()
        {
            _contactRepository = new ContactRepository();
        }

        public Response<List<ContactViewModel>> GetAllContacts()
        {
            try
            {
                var data = _contactRepository.GetAllContacts();
                if (data != null && data.Any())
                    return new Response<List<ContactViewModel>>(true, "Success", data);
                return new Response<List<ContactViewModel>>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<List<ContactViewModel>>(false, e.Message, null);
            }
        }

        public Response<Contacts> InsertContacts(Contacts contacts)
        {
            try
            {
                var data = _contactRepository.InsertContacts(contacts);
                if (data != null && data.Any())
                    return new Response<Contacts>(true, "Success", data[0]);
                return new Response<Contacts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }

        public Response<Contacts> UpdateContacts(Contacts contacts)
        {
            try
            {
                var data = _contactRepository.UpdateContacts(contacts);
                if (data != null && data.Any())
                    return new Response<Contacts>(true, "Success", data[0]);
                return new Response<Contacts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }

        public Response<Contacts> DeleteContacts(Contacts contacts)
        {
            try
            {
                var data = _contactRepository.DeleteContacts(contacts);
                if (data != null && data.Any())
                    return new Response<Contacts>(true, "Success", data[0]);
                return new Response<Contacts>(false, "Fail", null);
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContacts Failed: {e.Message}\n {e.StackTrace}");
                return new Response<Contacts>(false, e.Message, null);
            }
        }
    }
}
