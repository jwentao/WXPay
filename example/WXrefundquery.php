<?php
ini_set('date.timezone','Asia/Shanghai');
require_once "../lib/WxPay.Api.php";


if(isset($_GET["transaction_id"]) && $_GET["transaction_id"] != ""){
	$transaction_id = $_GET["transaction_id"];
	$input = new WxPayRefundQuery();
	$input->SetTransaction_id($transaction_id);
	echo(WxPayApi::refundQuery($input));
	exit();
}

if(isset($_GET["out_trade_no"]) && $_GET["out_trade_no"] != ""){
	$out_trade_no = $_GET["out_trade_no"];
	$input = new WxPayRefundQuery();
	$input->SetOut_trade_no($out_trade_no);
	echo(WxPayApi::refundQuery($input));
	exit();
}

if(isset($_GET["out_refund_no"]) && $_GET["out_refund_no"] != ""){
	$out_refund_no = $_GET["out_refund_no"];
	$input = new WxPayRefundQuery();
	$input->SetOut_refund_no($out_refund_no);
	echo(WxPayApi::refundQuery($input));
	exit();
}

if(isset($_GET["refund_id"]) && $_GET["refund_id"] != ""){
	$refund_id = $_GET["refund_id"];
	$input = new WxPayRefundQuery();
	$input->SetRefund_id($refund_id);
	echo(WxPayApi::refundQuery($input));
	exit();
}
	
?>
