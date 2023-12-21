export const multi_accounts_1 = {
  
    /* Button Settings */
    button: {
      position: "right", /* left, right or false. "position:false" does not pin to the left or right */
      style: 1, /* Button style. Number between 1 and 7 */
      src: '<i class="fab fa-whatsapp"></i>', /* Image, Icon or SVG */
      backgroundColor: "#10c379", /* Html color code */
      effect: 1, /* Button effect. Number between 1 and 7 */
      notificationNumber: "1", /* Custom text or false. To remove, (notificationNumber:false) */
      speechBubble: "How can we help you?", /* To remove, (speechBubble:false) */
      pulseEffect: true, /* To remove, (pulseEffect:false) */
      text: { /* For Button style larger than 1 */
        title: "Need help? Chat with us", /* Writing is required */
        description: "Customer Support", /* To remove, (description:false) */
        online: "I'm Online", /* To remove, (online:false) */
        offline: "I will be back soon" /* To remove, (offline:false) */
      }
    },
  
    /* Popup Settings */
    popup: {
      automaticOpen: false, /* true or false (Open popup automatically when the page is loaded) */
      outsideClickClosePopup: true, /* true or false (Clicking anywhere on the page will close the popup) */
      effect: 1, /* Popup opening effect. Number between 1 and 15 */
      header: {
        backgroundColor: "#10c379", /* Html color code */
        title: "Need help? Chat with us", /* Writing is required */
        description: "Click one of our representatives below" /* To remove, (description:false) */
      },
  
      /* Representative Settings */
      persons: []
    },
  
    /* Other Settings */
    sound: true, /* true (default sound), false or custom sound. Custom sound example, (sound:'assets/sound/notification.mp3') */
    changeBrowserTitle: "New Message!", /* Custom text or false. To remove, (changeBrowserTitle:false) */
    cookie: false, /* It does not show the speech bubble, notification number, and pulse effect again for the specified time. For example, do not show for 1 hour, (cookie:1) or to remove, (cookie:false) */
  }