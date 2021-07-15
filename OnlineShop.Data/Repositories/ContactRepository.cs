using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class ContactRepository : CommonRepository<ContactViewModel>
    {
        public List<ContactViewModel> GetAllContacts()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllContacts);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllContacts Failed: {e.Message}\n {e.StackTrace}");
                return new List<ContactViewModel>();
            }
        }

        public List<Contacts> InsertContacts(Contacts contact)
        {
            try
            {
                var result = ListByStoredProcedure<Contacts>(StoredProc.InsertContacts,
                                      new StoredProcedureParameter("Content", contact.Content, DbType.String)
                                    , new StoredProcedureParameter("Status", contact.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", contact.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", contact.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", contact.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", contact.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", contact.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertContacts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contacts>();
            }
        }

        public List<Contacts> UpdateContacts(Contacts contact)
        {
            try
            {
                var result = ListByStoredProcedure<Contacts>(StoredProc.UpdateContacts,
                                      new StoredProcedureParameter("ContactID", contact.ContactID, DbType.Int32)
                                    , new StoredProcedureParameter("Content", contact.Content, DbType.String)
                                    , new StoredProcedureParameter("Status", contact.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", contact.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", contact.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateContacts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contacts>();
            }
        }

        public List<Contacts> DeleteContacts(Contacts contact)
        {
            try
            {
                var result = ListByStoredProcedure<Contacts>(StoredProc.DeleteContacts,
                                      new StoredProcedureParameter("ContactID", contact.ContactID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteContacts Failed: {e.Message}\n {e.StackTrace}");
                return new List<Contacts>();
            }
        }
    }
}
