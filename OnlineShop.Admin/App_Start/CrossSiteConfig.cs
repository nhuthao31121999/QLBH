using System.Web.Http;
using System.Web.Http.Cors;

namespace OnlineShop.Admin.App_Start
{
    public static class CrossSiteConfig
    {
        public static void EnableCrossSiteRequests(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*");
            config.EnableCors(cors);
        }
    }
}