"use strict";

var STRING_EMPTY = "";

// message bootbox About
var MSG_ABOUT_SAVED = "<span style='color:green; text-align:justify;'>Thông tin giới thiệu lưu thành công.</span>";
var MSG_ABOUT_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin giới thiệu lưu không thành công.</span>";
var MSG_ABOUT_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin giới thiệu cập nhật thành công.</span>";
var MSG_ABOUT_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin giới thiệu cập nhật không thành công.</span>";
var MSG_ABOUT_DELETED = "<span style='color:green; text-align:justify;'>Thông tin giới thiệu xóa thành công.</span>";
var MSG_ABOUT_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin giới thiệu xóa không thành công.</span>";

// message bootbox Categories
var MSG_CATEGORY_SAVED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại sản phẩm lưu thành công.</span>";
var MSG_CATEGORY_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại sản phẩm lưu không thành công.</span>";
var MSG_CATEGORY_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại sản phẩm cập nhật thành công.</span>";
var MSG_CATEGORY_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại sản phẩm cập nhật không thành công.</span>";
var MSG_CATEGORY_DELETED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại sản phẩm xóa thành công.</span>";
var MSG_CATEGORY_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại sản phẩm xóa không thành công.</span>";

// message bootbox Contact
var MSG_CONTACT_SAVED = "<span style='color:green; text-align:justify;'>Thông tin liên hệ lưu thành công.</span>";
var MSG_CONTACT_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin liên hệ lưu không thành công.</span>";
var MSG_CONTACT_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin liên hệ cập nhật thành công.</span>";
var MSG_CONTACT_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin liên hệ cập nhật không thành công.</span>";
var MSG_CONTACT_DELETED = "<span style='color:green; text-align:justify;'>Thông tin liên hệ xóa thành công.</span>";
var MSG_CONTACT_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin liên hệ xóa không thành công.</span>";

// message bootbox Content
var MSG_CONTENT_SAVED = "<span style='color:green; text-align:justify;'>Thông tin tin tức lưu thành công.</span>";
var MSG_CONTENT_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tin tức lưu không thành công.</span>";
var MSG_CONTENT_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin tin tức cập nhật thành công.</span>";
var MSG_CONTENT_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tin tức cập nhật không thành công.</span>";
var MSG_CONTENT_DELETED = "<span style='color:green; text-align:justify;'>Thông tin tin tức xóa thành công.</span>";
var MSG_CONTENT_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tin tức xóa không thành công.</span>";

// message bootbox FeedBack
var MSG_FEEDBACK_SAVED = "<span style='color:green; text-align:justify;'>Thông tin phản hồi đã được gửi thành công.</span>";
var MSG_FEEDBACK_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phản hồi gửi không thành công.</span>";
var MSG_FEEDBACK_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin phản hồi cập nhật thành công.</span>";
var MSG_FEEDBACK_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phản hồi cập nhật không thành công.</span>";
var MSG_FEEDBACK_DELETED = "<span style='color:green; text-align:justify;'>Thông tin phản hồi xóa thành công.</span>";
var MSG_FEEDBACK_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phản hồi xóa không thành công.</span>";

// message bootbox Footer
var MSG_FOOTER_SAVED = "<span style='color:green; text-align:justify;'>Thông tin chân trang lưu thành công.</span>";
var MSG_FOOTER_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin chân trang lưu không thành công.</span>";
var MSG_FOOTER_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin chân trang cập nhật thành công.</span>";
var MSG_FOOTER_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin chân trang cập nhật không thành công.</span>";
var MSG_FOOTER_DELETED = "<span style='color:green; text-align:justify;'>Thông tin chân trang xóa thành công.</span>";
var MSG_FOOTER_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin chân trang xóa không thành công.</span>";

// message bootbox Order
var MSG_ORDER_SAVED = "<span style='color:green; text-align:justify;'>Đơn hàng của bạn đã đặt thành công. Bạn hãy giữ máy và chờ nhân viên liên lạc.</span>";
var MSG_ORDER_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Đã xảy ra lỗi trong quá trình đặt hàng. Vui lòng thử lại.</span>";
var MSG_ORDER_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin đơn hàng cập nhật thành công.</span>";
var MSG_ORDER_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin đơn hàng cập nhật không thành công.</span>";
var MSG_ORDER_DELETED = "<span style='color:green; text-align:justify;'>Thông tin đơn hàng xóa thành công.</span>";
var MSG_ORDER_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin đơn hàng xóa không thành công.</span>";

// message bootbox Producer
var MSG_PRODUCER_SAVED = "<span style='color:green; text-align:justify;'>Thông tin nhà sản xuất lưu thành công.</span>";
var MSG_PRODUCER_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin nhà sản xuất lưu không thành công.</span>";
var MSG_PRODUCER_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin nhà sản xuất cập nhật thành công.</span>";
var MSG_PRODUCER_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin nhà sản xuất cập nhật không thành công.</span>";
var MSG_PRODUCER_DELETED = "<span style='color:green; text-align:justify;'>Thông tin nhà sản xuất xóa thành công.</span>";
var MSG_PRODUCER_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin nhà sản xuất xóa không thành công.</span>";

// message bootbox Product
var MSG_PRODUCT_SAVED = "<span style='color:green; text-align:justify;'>Thông tin sản phẩm lưu thành công.</span>";
var MSG_PRODUCT_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin sản phẩm lưu không thành công.</span>";
var MSG_PRODUCT_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin sản phẩm cập nhật thành công.</span>";
var MSG_PRODUCT_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin sản phẩm cập nhật không thành công.</span>";
var MSG_PRODUCT_DELETED = "<span style='color:green; text-align:justify;'>Thông tin sản phẩm xóa thành công.</span>";
var MSG_PRODUCT_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin sản phẩm xóa không thành công.</span>";

// message bootbox Slide
var MSG_SLIDE_SAVED = "<span style='color:green; text-align:justify;'>Thông tin trình chiếu lưu thành công.</span>";
var MSG_SLIDE_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin trình chiếu lưu không thành công.</span>";
var MSG_SLIDE_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin trình chiếu cập nhật thành công.</span>";
var MSG_SLIDE_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin trình chiếu cập nhật không thành công.</span>";
var MSG_SLIDE_DELETED = "<span style='color:green; text-align:justify;'>Thông tin trình chiếu xóa thành công.</span>";
var MSG_SLIDE_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin trình chiếu xóa không thành công.</span>";

// message bootbox UserGroup
var MSG_USERGROUP_SAVED = "<span style='color:green; text-align:justify;'>Thông tin phân quyền lưu thành công.</span>";
var MSG_USERGROUP_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phân quyền lưu không thành công.</span>";
var MSG_USERGROUP_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin phân quyền cập nhật thành công.</span>";
var MSG_USERGROUP_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phân quyền cập nhật không thành công.</span>";
var MSG_USERGROUP_DELETED = "<span style='color:green; text-align:justify;'>Thông tin phân quyền xóa thành công.</span>";
var MSG_USERGROUP_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin phân quyền xóa không thành công.</span>";

// message bootbox User
var MSG_USER_SAVED = "<span style='color:green; text-align:justify;'>Thông tin tài khoản lưu thành công.</span>";
var MSG_USER_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tài khoản lưu không thành công.</span>";
var MSG_USER_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin tài khoản cập nhật thành công.</span>";
var MSG_USER_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tài khoản cập nhật không thành công.</span>";
var MSG_USER_DELETED = "<span style='color:green; text-align:justify;'>Thông tin tài khoản xóa thành công.</span>";
var MSG_USER_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin tài khoản xóa không thành công.</span>";

// message bootbox CategoryContent
var MSG_CATEGORYCONTENT_SAVED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại tin tức lưu thành công.</span>";
var MSG_CATEGORYCONTENT_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại tin tức lưu không thành công.</span>";
var MSG_CATEGORYCONTENT_UPDATED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại tin tức cập nhật thành công.</span>";
var MSG_CATEGORYCONTENT_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại tin tức cập nhật không thành công.</span>";
var MSG_CATEGORYCONTENT_DELETED = "<span style='color:green; text-align:justify;'>Thông tin danh mục loại tin tức xóa thành công.</span>";
var MSG_CATEGORYCONTENT_DELETED_FAIL = "<span style='color:red; text-align:justify;'>Thông tin danh mục loại tin tức xóa không thành công.</span>";

// message bootbox comfirm Delete
var MSG_DELETE = "Bạn có chắc chắn muốn xóa bản ghi này?";
var MSG_DELETE_ERROR_CATEGORY = "<span style = 'color:red; text-align:justify;'>Bạn không thể xóa bản ghi này vì bản ghi này đang được sử dụng trong sản phẩm.</span>";
var MSG_DELETE_ERROR_PRODUCER = "<span style = 'color:red; text-align:justify;'>Bạn không thể xóa bản ghi này vì bản ghi này đang được sử dụng trong sản phẩm.</span>";
var MSG_DELETE_ERROR_CATEGORYCONTENT = "<span style = 'color:red; text-align:justify;'>Bạn không thể xóa bản ghi này vì bản ghi này đang được sử dụng trong tin tức.</span>";

var MSG_REGISTER_SAVED = "<span style='color:green; text-align:justify;'>Bạn đã đăng ký tài khoản thành công.</span>";
var MSG_REGISTER_SAVED_FAIL = "<span style='color:red; text-align:justify;'>Đã xảy ra lỗi trong quá trình đăng ký.</span>";
var MSG_REGISTER_UPDATED = "<span style='color:green; text-align:justify;'>Bạn đã cập nhật thông tin tài khoản thành công.</span>";
var MSG_REGISTER_UPDATED_FAIL = "<span style='color:red; text-align:justify;'>Đã xảy ra lỗi trong quá trình sửa thông tin.</span>";


function introduceDot(number) {
    var numberString = number.toString();
    var length = numberString.length;
    if (length < 4)
        return numberString;

    var insertIndex = length - 3;  // 10.000.000    8
    var loopCounter = length / 3;
    for (var i = 0; i < loopCounter; i++) {
        if (insertIndex < 1)
            break;
        numberString = numberString.insert(insertIndex, '.');
        insertIndex = insertIndex - 3;
    }
    return numberString;
}

function removeDot(number) {
    var numberString = number.toString();
    numberString = numberString.replaceAll('.', '');
    return parseInt(numberString);
}
String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};