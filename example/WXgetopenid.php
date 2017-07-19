<?php 

require_once "WxPay.JsApiPay.php";

// 获取用户openid
// 获取openid流程： 首先由前端跳转到此页面，此页面调用$tools的GetOpenid方法，GetOpenid方法判断
// 此页面参数是否带有code，如不带有则跳转到跳转到微信服务器https://open.weixin.qq.com/connect/oauth2/authorize
// 微信服务器处理完之后会跳回 'http://xxxxxx/example/WXgetopenid.php'（在WXjsapiPay.php中自己配置），code将带在页面参数中
// GetOpenid方法检测到页面带有code参数后通过getOpenidFromMp获取openid，之后此页面跳转回前端页面，openid带在参数中
$tools = new JsApiPay();
$openId = $tools->GetOpenid();
$url = 'http://xxxxxx/payTest/index.html?openid='.$openId;// 配置您的前端页面
Header("Location: $url");
?>
