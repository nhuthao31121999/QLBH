using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Entities.ViewModel
{
    public class LoginAdminViewModel
    {
        [Required(ErrorMessage = "Tài khoản không được trống")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được trống")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
