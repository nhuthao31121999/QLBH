using Newtonsoft.Json;
using OnlineShop.Entities.ViewModel;
using System;
using System.Web;
using System.Web.Security;

namespace OnlineShop.Admin.Helper
{
    public class Security
    {
        public string SetAuthCookie(HttpContext httpContext, FormsAuthenticationTicket authenticationTicket, string cookieName)
        {
            var encryptedTicket = FormsAuthentication.Encrypt(authenticationTicket);
            var cookie = new HttpCookie(cookieName, encryptedTicket)
            {
                HttpOnly = true,
                Expires = authenticationTicket.Expiration
            };
            httpContext.Response.Cookies.Add(cookie);
            return encryptedTicket;
        }

        public void UserSignIn(UserViewModel accountInfo, HttpContext curentHttpContext)
        {
            var loginToken = new FormsAuthenticationTicket(1, "SignInUser", DateTime.Now, DateTime.Now.AddHours(1),
                true, JsonConvert.SerializeObject(accountInfo));
            var token = SetAuthCookie(curentHttpContext, loginToken, "SignInUser");
            //var tokenModel = new TokenHelper(_cacheClient);
            //tokenModel.SetToken(accountInfo.UserID, token);
            SetAuthCookie(curentHttpContext, loginToken, "SignInUser");
        }

        //public void SetPermission(List<FunctionModel> funcs)
        //{
        //}

        //public void SetToken(string token, HttpContext curentHttpContext)
        //{
        //    var loginToken = new FormsAuthenticationTicket(1, Configuration.ConstKey.SignInToken, DateTime.Now, DateTime.Now.AddHours(1),
        //        true, token);
        //    SetAuthCookie(curentHttpContext, loginToken, Configuration.ConstKey.SignInToken);
        //}

        public bool CheckLogin(HttpContext curentHttpContext)
        {
            if (curentHttpContext == null)
            {
                return false;
            }
            var loginTokenCookie = curentHttpContext.Request.Cookies["SignInUser"];
            var result = loginTokenCookie != null && !string.IsNullOrEmpty(loginTokenCookie.Value);
            if (result)
            {
                UserViewModel userApp = null;
                //var tokenModel = new TokenHelper(_cacheClient);
                var token = FormsAuthentication.Decrypt(loginTokenCookie.Value);
                if (token != null) userApp = JsonConvert.DeserializeObject<UserViewModel>(token.UserData);
                //var tokenCurrent = tokenModel.GetToken(userApp.Id);
                //if (tokenCurrent != loginTokenCookie.Value)
                //{
                //    return true;
                //}
            }
            return result;
        }

        public UserViewModel CurrentUser(HttpContext curentHttpContext)
        {
            UserViewModel userApp = null;
            var loginTokenCookie = curentHttpContext.Request.Cookies["SignInUser"];

            if (loginTokenCookie != null)
            {
                try
                {
                    if ((new Security()).CheckLogin(curentHttpContext))
                    {
                        var token = FormsAuthentication.Decrypt(loginTokenCookie.Value);

                        if (token != null)
                        {
                            userApp = JsonConvert.DeserializeObject<UserViewModel>(token.UserData);
                        }
                    }
                    else
                    {
                        ClearLoginCookies(curentHttpContext);
                    }
                }
                catch
                {
                    return null;
                }
            }
            return userApp;
        }

        private static void ClearLoginCookies(HttpContext httpContext)
        {
            var cookie = new HttpCookie("SignInUser");
            DateTime nowDateTime = DateTime.Now;
            cookie.Expires = nowDateTime.AddDays(-1);
            httpContext.Response.Cookies.Add(cookie);

            //var cookieToken = new HttpCookie(Configuration.ConstKey.SignInToken);
            cookie.Expires = nowDateTime.AddDays(-1);
            //httpContext.Response.Cookies.Add(cookieToken);

            httpContext.Request.Cookies.Remove("SignInUser");
            //httpContext.Request.Cookies.Remove(Configuration.ConstKey.SignInToken);
        }

        //public List<string> UserFunctionKey(HttpContext curentHttpContext)
        //{
        //    var functionKey = curentHttpContext.Request.Cookies[Configuration.ConstKey.FunctionKey];
        //    if (functionKey != null)
        //    {
        //        try
        //        {
        //            var token = FormsAuthentication.Decrypt(functionKey.Value);
        //            if (token != null) return JsonConvert.DeserializeObject<List<string>>(token.UserData);
        //        }
        //        catch
        //        {
        //            return null;
        //        }
        //    }

        //    return null;
        //}

        public void SignOutLocal(HttpContext httpContext)
        {
            ClearLoginCookies(httpContext);
            FormsAuthentication.SignOut();
        }

        public void SignOutLocal()
        {
            FormsAuthentication.SignOut();
        }
    }
}