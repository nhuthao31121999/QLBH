using Newtonsoft.Json;
using OnlineShop.Entities.ViewModel;
using System.Security.Principal;
using System.Web.Security;

namespace OnlineShop.Admin.Models
{
    public class UserIdentity : IIdentity, IPrincipal
    {
        private readonly FormsAuthenticationTicket _ticket;
        public UserViewModel User = new UserViewModel();
        public UserIdentity(FormsAuthenticationTicket ticket)
        {
            _ticket = ticket;
            var user = JsonConvert.DeserializeObject<UserViewModel>(ticket?.UserData);
            User.CodeUserName = user.CodeUserName;
        }

        public string AuthenticationType
        {
            get { return "User"; }
        }

        public bool IsAuthenticated
        {
            get { return true; }
        }

        public string Name
        {
            get
            {
                if (this.AccountInfo != null)
                    return this.AccountInfo.Name;
                else
                    return _ticket.Name;
            }
        }

        public string UserData
        {
            get { return _ticket.UserData; }
        }

        public UserViewModel AccountInfo
        {
            get
            {
                if (!string.IsNullOrEmpty(_ticket.UserData))
                {
                    var obj = JsonConvert.DeserializeObject<UserViewModel>(_ticket.UserData);
                    return obj;
                }
                else
                {
                    return null;
                }
            }
        }

        public int UserId
        {
            get
            {
                if (this.AccountInfo != null)
                {
                    return this.AccountInfo.UserID;
                }
                else
                {
                    return -1;
                }
            }
        }

        public string UserName
        {
            get
            {
                if (this.AccountInfo != null)
                    return this.AccountInfo.UserName;
                else
                    return "";
            }
        }

        public bool IsInRole(string role)
        {
            return Roles.IsUserInRole(role);
        }

        public IIdentity Identity
        {
            get { return this; }
        }
    }
}