/**
 * Created by jinwt on 2017/7/14.
 */
var WXPay = {
    /**
     * 利用jsapi统一下单
     * openid 必填
     * info 商品描述,必填
     * total_fee 商品金额,单位为分，必填
     */
    WXjsapiPay: function ( openid, info, total_fee) {
        console.log('jsapiPay');
        $.ajax({
            url: './example/WXjsapiPay.php',
            type: 'GET',
            data: {
                openid: openid,
                body: info,
                attach: 'attach',
                detail: 'detail',
                total_fee: total_fee,
                goods_tag: 'goods_tag'
            },
            success: function(data) {
                console.log(data);
                data = data.split('{')[1].split('}')[0];
                data = '[{' + data + '}]';
                var paramters = $.parseJSON(data)[0];
                callpay(paramters);
            }
        });
    },
    /**
     * 查询订单,未收到用户支付成功推送时查询支付动态
     * type 查询种类，'transaction_id'为微信订单号查询 'out_trade_no'为商户内部订单号查询
     * id 微信订单号或商户内部订单号
     */
    WXorderquery: function (type, id) {
        var transaction_id = '';
        var out_trade_no = '';
        if ( type == 'transaction_id') {
            transaction_id = id;
        } else if ( type == 'out_trade_no'){
            out_trade_no = id;
        }
        $.ajax({
            url: './example/WXorderquery.php',
            type: 'GET',
            dataType: 'XML',
            data: {
                transaction_id: transaction_id,
                out_trade_no: out_trade_no
            },
            success: function (data) {
                var res = $.xml2json(data);
                console.log(res);
            }
        });
    },
    /**
     * 发起退款
     * type 退款种类，'transaction_id'为微信订单号退款 'out_trade_no'为商户内部订单号退款
     * id 微信订单号或商户内部订单号
     * total_fee 订单总金额，单位为分
     * refund_fee 退款金额，单位为分
     */
    WXrefund: function (type, id, total_fee, refund_fee) {
        console.log('refund');
        var transaction_id = '';
        var out_trade_no = '';
        if ( type == 'transaction_id') {
            transaction_id = id;
        } else if ( type == 'out_trade_no'){
            out_trade_no = id;
        }
        $.ajax({
            url: './example/WXrefund.php',
            type: 'GET',
            dataType:'XML',
            data: {
                transaction_id: transaction_id,
                out_trade_no: out_trade_no,
                total_fee: total_fee,
                refund_fee: refund_fee
            },
            success: function (data) {
                // return_code 为SUCCESS表示通信成功
                // result_code SUCCESS退款申请接收成功，结果通过退款查询接口查询
                // err_code/err_code_des 错误码和描述
                var res = $.xml2json(data);
                console.log(res);
                if ( res.return_code == 'SUCCESS' && res.result_code == 'SUCCESS') {
                    alert('退款成功,微信退款单号为' + res.refund_id);
                }
            }
        });
    },
    /**
     * 退款查询
     * type 退款种类，'transaction_id'为微信订单号退款 'out_trade_no'为商户内部订单号退款
     * 'out_refund_no'为商户退款单号  'refund_id' 为微信退款单号
     * id 微信订单号退款或商户内部订单号退款或商户退款单号或微信退款单号
     */
    WXrefundquery: function ( type, id) {
        var transaction_id = '';
        var out_trade_no = '';
        var out_refund_no = '';
        var refund_id = '';
        if ( type == 'transaction_id') {
            transaction_id = id;
        } else if ( type == 'out_trade_no'){
            out_trade_no = id;
        }else if ( type == 'out_refund_no'){
            out_refund_no = id;
        }else if ( type == 'refund_id'){
            refund_id = id;
        }
        $.ajax({
            url: './example/WXrefundquery.php',
            type: 'GET',
            dataType: 'XML',
            data: {
                transaction_id: transaction_id,
                out_trade_no: out_trade_no,
                out_refund_no: out_refund_no,
                refund_id: refund_id
            },
            success: function(data){
                var res = $.xml2json(data);
                console.log(res);
            }
        });
    }
}

// 调用微信JS api 支付
function jsApiCall(paramters)
{
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        paramters,
        function(res){
        	// 这里可以写支付后的回调
            WeixinJSBridge.log(res.err_msg);
            alert(res.err_code+res.err_desc+res.err_msg);
    }
);
}

function callpay(paramters)
{
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall(paramters), false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall(paramters));
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall(paramters));
        }
    }else{
        jsApiCall(paramters);
    }
}
