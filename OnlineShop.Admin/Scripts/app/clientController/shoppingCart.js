var cartItems;

var cart = {
    init: function () {
        cart.loadData();
        cart.registerEvent();
    },

    registerEvent: function () {
        $('.txtQuantity').off('keyup').on('keyup', function () {
            var quantity = parseInt($(this).val());
            var productid = parseInt($(this).data('id'));
            var price = parseFloat($(this).data('price'));
            var discount = parseFloat($(this).data('discount'));

            if (isNaN(quantity) === false && discount && discount !== 0) {
                var amount = quantity * discount;
                $('#amount_' + productid).text(numeral(amount).format('0,0'));
            } else if (isNaN(quantity) === false && !discount && discount === 0) {
                var amount2 = quantity * price;
                $('#amount_' + productid).text(numeral(amount2).format('0,0'));
            }
            else {
                $('#amount_' + productid).text(0);
            }

            $('#lblTotalOrder').text(numeral(cart.getTotalOrder()).format('0,0'));
            cart.updateAll();

        });

        $('input[name="paymentMethod"]').off('click').on('click', function () {
            if ($(this).val() === 'Thanh toán bằng thẻ visa và master') {
                $('.boxContent').hide();
                $('#atm_online_content').show();
            }
            else if ($(this).val() === 'Chuyển khoản') {
                $('.boxContent').hide();
                $('#ck_content').show();
            }
            else {
                $('.boxContent').hide();
                $('#cod_content').show();

            }
        });

        $('#btnDeleteAll').off('click').on('click', function (e) {
            e.preventDefault();
            cart.deleteAll();
        });

        $('.btnDeleteItem').off('click').on('click', function (e) {
            e.preventDefault();
            var productId = parseInt($(this).data('id'));
            cart.deleteItem(productId);
        });

        $('#btnContinue').off('click').on('click', function (e) {
            e.preventDefault();
            window.location.href = "/Client/HomeClient";
        });
    },

    getTotalOrder: function () {
        var total = 0;
        $.each(cartItems, function (i, item) {
            var realPrice = 0;
            if (item.Product.Discount && item.Product.Discount !== 0) {
                realPrice = item.Product.Discount;
            }
            else {
                realPrice = item.Product.Price;
            }
            total += parseInt(item.Quantity) * parseFloat(realPrice);
        });
        return total;
    },

    deleteItem: function (productId) {
        if (confirm('Bạn muốn xóa bỏ sản phẩm này khỏi giỏ hàng ?')) {
            $.ajax({
                url: '/ShoppingCart/DeleteItem',
                data: {
                    productId: productId
                },
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        cart.loadData();
                    }
                }
            });
        }
    },

    deleteAll: function () {
        if (confirm('Bạn muốn xóa bỏ giỏ hàng ?')) {
            $.ajax({
                url: '/ShoppingCart/DeleteAll',
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        cart.loadData();

                    }
                }
            });
        }
    },

    updateAll: function () {
        var cartList = [];
        $.each($('.txtQuantity'), function (i, item) {
            cartList.push({
                ProductID: $(item).data('id'),
                Quantity: $(item).val()
            });
        });
        $.ajax({
            url: '/ShoppingCart/Update',
            type: 'POST',
            data: {
                cartData: JSON.stringify(cartList)
            },
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    cart.loadData();
                }
            }
        });
    },

    loadData: function () {
        $.ajax({
            url: '/ShoppingCart/GetAll',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    var template = $('#tplCart').html();
                    var html = '';
                    var data = res.data;
                    cartItems = data;
                    $.each(data, function (i, item) {
                        if (item.Product.Discount < item.Product.Price && item.Product.Discount !== 0) {
                            html += Mustache.render(template, {
                                ProductId: item.ProductID,
                                Code: item.Product.Code,
                                Name: item.Product.Name,
                                Image: item.Product.Image,
                                Warranty: item.Product.Warranty,
                                Price: item.Product.Price,
                                Discount: item.Product.Discount === null || item.Product.Discount === 0 ? "Không Có" : numeral(item.Product.Discount).format('0,0'),
                                Quantity: item.Quantity,
                                Amount: numeral(item.Quantity * item.Product.Discount).format('0,0')
                            });
                        }
                        else {
                            html += Mustache.render(template, {
                                ProductId: item.ProductID,
                                Code: item.Product.Code,
                                Name: item.Product.Name,
                                Image: item.Product.Image,
                                Price: numeral(item.Product.Price).format('0,0'),
                                Warranty: item.Product.Warranty,
                                Discount: item.Product.Discount === null || item.Product.Discount === 0 ? "Không Có" : numeral(item.Product.Discount).format('0,0'),
                                Quantity: item.Quantity,
                                Amount: numeral(item.Quantity * item.Product.Price).format('0,0')
                            });
                        }
                    });

                    $('#cartBody').html(html);

                    if (html === '') {
                        $('#cartContent').html('Không có sản phẩm nào trong giỏ hàng.');
                    }
                    $('#lblTotalOrder').text(numeral(cart.getTotalOrder()).format('0,0'));
                    cart.registerEvent();
                }
            }
        });
    }
};
cart.init();