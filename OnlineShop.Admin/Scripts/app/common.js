function AddProduct() {
    var productId = parseInt($(".addToCart").attr('id'));
    $.ajax({
        url: '/ShoppingCart/Add',
        data: {
            productId: productId
        },
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                alert('Thêm sản phẩm vào giỏ hàng thành công.');
            }
            else {
                alert(response.message);
            }
        }
    });
}