<?php 
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Credentials: true');
//
// if(isset($_GET["p"])){
	
// 	    get_widget_content();
    
// }else{
//     $json['status'] = 400;
//     $json['message'] = 'Required params missing';
//     $json['apiName'] = 'get_widget_content';
//     echo json_encode($json);
//     exit();

// }




// function get_widget_content(){
	// require_once '../database/database.php';
    // $widget_identifier = $_REQUEST['widget_identifier'];
    // $widget_id = $_REQUEST['widget_id'];
    // $sql_get_hero_banner = "SELECT * FROM custom_widget cw WHERE cw.widget_identifier = '$widget_identifier' AND widget_id = '$widget_id'";
    // $rs_get_hero_banner = mysqli_query($DBConnection, $sql_get_hero_banner) or die(mysqli_error($DBConnection));
    // if (mysqli_num_rows($rs_get_hero_banner)) {
    //     $row_get_hero_banner = mysqli_fetch_assoc($rs_get_hero_banner);
    //         $widget_id = $row_get_hero_banner['widget_id'];
    //         $widget_html = $row_get_hero_banner['widget_html'];
    //         $widget_css = $row_get_hero_banner['widget_css'];
            
    //         $arr_widget = array("widget_id" => "$widget_id", 
    //                             "widget_html" => "$widget_html",
    //                             "widget_css" => "$widget_css"
    //                         );
            
           
    //         $data = array(
    //                 'status' => "200",  
    //                 'message' => "widget fetch successful.", 
    //                 'apiName' => "get_widget_content", 
    //                 'widget_data' => $arr_widget
    //                 );
            
            // header('Content-type: application/json');
            // echo json_encode($arr_widget);
            
        // }else{
        //     // SPORTS DOES NOT EXIST
        //     $json['status'] = 400;
        //     $json['message'] = 'Unable to find any widget';
        //     $json['apiName'] = 'get_widget_content';
        //     $json['banners'] = '';
        //     echo json_encode($json);
        // }//end of if

        header('Content-type: application/json');
        echo ({'chatButtonSetting:{
            backgroundColor : "#f09d28",
            ctaText : "Chat with us",
            borderRadius : "25",
            marginLeft : "0",
            marginRight : "20",
            marginBottom : "20",
            ctaIconWATI : false,
            position : "right"
        },
        brandSetting:{
            brandName : "Wati",
            brandSubTitle : "undefined",
            brandImg : "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
            welcomeText : "Hi there!\nHow can I help you?",
            messageText : "Hello, %0A I have a question about {{page_link}}",
            backgroundColor : "#f09d28",
            ctaText : "Chat with us",
            borderRadius : "25",
            autoShow : false,
            phoneNumber : "919448557711"
        }'});
    
// }




// 'chatButtonSetting:{
//     backgroundColor : "#f09d28",
//     ctaText : "Chat with us",
//     borderRadius : "25",
//     marginLeft : "0",
//     marginRight : "20",
//     marginBottom : "20",
//     ctaIconWATI : false,
//     position : "right"
// },
// brandSetting:{
//     brandName : "Wati",
//     brandSubTitle : "undefined",
//     brandImg : "https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
//     welcomeText : "Hi there!\nHow can I help you?",
//     messageText : "Hello, %0A I have a question about {{page_link}}",
//     backgroundColor : "#f09d28",
//     ctaText : "Chat with us",
//     borderRadius : "25",
//     autoShow : false,
//     phoneNumber : "919448557711"
// }'



?>
