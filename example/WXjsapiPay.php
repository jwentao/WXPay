<?php 
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";

$body = $_GET['body'];
$attach = $_GET['attach'];
$detail = $_GET['detail'];
$total_fee = $_GET['total_fee'];
$goods_tag = $_GET['goods_tag'];
//$notify_url = $_get['notify_url'];


//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
		echo "$key=$value;";
    }
}

// 获取用户openid
$tools = new JsApiPay();
$openId = $_GET['openid'];

// 统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody($body);
$input->SetAttach($attach);
$input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
$input->SetTotal_fee($total_fee);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag($goods_tag);
$input->SetNotify_url("");// 这里配置接收支付消息的地址
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);
//echo $order;
//echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
printf_info($order);
$jsApiParameters = $tools->GetJsApiParameters($order);
$res = json_encode($jsApiParameters);
//header('Content-Type: application/json');
echo $jsApiParameters;

?>

