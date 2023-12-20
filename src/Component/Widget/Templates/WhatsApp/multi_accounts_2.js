export const multi_accounts_2 = {

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
		persons: [

		/* Copy for more representatives [::Start Copy::] */
		{
			avatar: {
				src: '<img src="../../../../../public/main-file/assets/img/person/1.svg" alt="">', /* Image, Icon or SVG */
				backgroundColor: "#d6dde1", /* Html color code */
				onlineCircle: true /* Avatar online circle. To remove, (onlineCircle:false) */
			},
			text: {
				title: "Lorna Hensley", /* Writing is required */
				description: "Sales Support", /* To remove, (description:false) */
				online: "I'm Online", /* To remove, (online:false) */
				offline: "I will be back soon" /* To remove, (offline:false) */
			},
			link: {
				desktop: "https://web.whatsapp.com/send?phone=905377323226&text=Hi", /* Writing is required */
				mobile: "https://wa.me/905377323226/?text=Hi" /* If it is hidden desktop link will be valid. To remove, (mobile:false) */
			},
			onlineDay: {
				/* Change the day you are offline like this. (sunday:false) */
				sunday: "00:00-23:59",
				monday: "00:00-23:59",
				tuesday: "00:00-23:59",
				wednesday: "00:00-23:59",
				thursday: "00:00-23:59",
				friday: "00:00-23:59",
				saturday: "00:00-23:59"
			}
		},
		/* [::End Copy::] */

		/* Copy for more representatives [::Start Copy::] */
		{
			avatar: {
				src: '<img src="../../../../../public/main-file/assets/img/person/2.svg" alt="">', /* Font, Image or SVG */
				backgroundColor: "#d6dde1", /* Html color code */
				onlineCircle: true /* Avatar online circle. To remove, (onlineCircle:false) */
			},
			text: {
				title: "Mattie Simmonds", /* Writing is required */
				description: "Customer Support", /* Custom text or false. To remove, (description:false) */
				online: "I'm Online", /* Custom text or false. To remove, (online:false) */
				offline: "I will be back soon" /* Custom text or false. To remove, (offline:false) */
			},
			link: {
				desktop: "https://web.whatsapp.com/send?phone=905377323226&text=Hi", /* Writing is required */
				mobile: "https://wa.me/905377323226/?text=Hi" /* If it is hidden desktop link will be valid. To remove, (mobile:false) */
			},
			onlineDay: {
				/* Change the day you are offline like this. (sunday:false) */
				sunday: "00:00-23:59",
				monday: "00:00-23:59",
				tuesday: "00:00-23:59",
				wednesday: "00:00-23:59",
				thursday: "00:00-23:59",
				friday: "00:00-23:59",
				saturday: "00:00-23:59"
			}
		},
		/* [::End Copy::] */

		/* Copy for more representatives [::Start Copy::] */
		{
			avatar: {
				src: '<img src="../../../../../public/main-file/assets/img/person/3.svg" alt="">', /* Font, Image or SVG */
				backgroundColor: "#d6dde1", /* Html color code */
				onlineCircle: true /* Avatar online circle. To remove, (onlineCircle:false) */
			},
			text: {
				title: "Kole Cleg", /* Writing is required */
				description: "Techincal Support", /* Custom text or false. To remove, (description:false) */
				online: "I'm Online", /* Custom text or false. To remove, (online:false) */
				offline: "I will be back soon" /* Custom text or false. To remove, (offline:false) */
			},
			link: {
				desktop: "https://web.whatsapp.com/send?phone=905377323226&text=Hi", /* Writing is required */
				mobile: "https://wa.me/905377323226/?text=Hi" /* If it is hidden desktop link will be valid. To remove, (mobile:false) */
			},
			onlineDay: {
				/* Change the day you are offline like this. (sunday:false) */
				sunday: false,
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false
			}
		},
		/* [::End Copy::] */

		]
	},

	/* Other Settings */
	sound: true, /* true (default sound), false or custom sound. Custom sound example, (sound:'assets/sound/notification.mp3') */
	changeBrowserTitle: "New Message!", /* Custom text or false. To remove, (changeBrowserTitle:false) */
	cookie: false, /* It does not show the speech bubble, notification number, pulse effect and automatic open popup again for the specified time. For example, do not show for 1 hour, (cookie:1) or to remove, (cookie:false) */
}