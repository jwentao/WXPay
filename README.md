# WXPay
about weixin pay<br/>
参考微信文档提供的示例开发的js+php实现微信公众号支付、退款以及相关查询<br/>

##说明
本套代码适合初次接触微信支付的开发者做参考用<br/>
本套代码实现的是微信公众号支付以及相关退款、订单查询、退款查询功能<br/>
如果你要开始微信支付开发，请确保您已取得相关权限<br/>

##相关配置
首先需要将下载好的证书存放于cert目录中<br/>
在lib/WxPay.Config.php中配置APPID、商户id、商户支付秘钥、公众号秘钥以及证书目录等<br/>
在example/WXgetopenid.<br/>
在example/WxPay.JsApiPay.php中配置WxPay.JsApiPay.php所在的服务器路径<br/>
在example/WXjsapiPay.php中配置支付通知的路径<br/>

jin_wentao@qq.com
