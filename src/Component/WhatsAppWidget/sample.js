export const runJs = () => {
    
 var url = 'https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?2850';
 var s = document.createElement('script');
 s.type = 'text/javascript';
 s.async = true;
 s.src = url;
 s.id='wati'
 var options = {
 "enabled":true,
 "chatButtonSetting":{
     "backgroundColor":"#00e785",
     "ctaText":"Chat with us",
     "borderRadius":"25",
     "marginLeft": "0",
     "marginRight": "20",
     "marginBottom": "20",
     "ctaIconWATI":true,
     "position":"right"
 },
 "brandSetting":{
     "brandName":"Wati",
     "brandSubTitle":"undefined",
     "brandImg":"https://www.wati.io/wp-content/uploads/2023/04/Wati-logo.svg",
     "welcomeText":"Hi there!\nHow can I help you?",
     "messageText":"{{page_link}}Hello, %0A I have a question about {{page_link}}{{page_link}}{{page_title}}",
     "backgroundColor":"#00e785",
     "ctaText":"Chat with us",
     "borderRadius":"25",
     "autoShow":false,
     "phoneNumber":"8088853252"
 }
 };
 s.onload = function() {
    //  CreateWhatsappChatWidget(options);
 };
 var x = document.getElementsByTagName('script')[0];
 x.parentNode.insertBefore(s, x);
}

export const clearJs = () => {
    document.getElementById('wati').remove();
   }