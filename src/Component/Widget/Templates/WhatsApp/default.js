import { v4 as uuidv4 } from "uuid";

export const def_template = {

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
			id: uuidv4(),
			avatar: {
				src: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASmSURBVHgBnVZbTBxVGP7mvhd2t+wuCxXELUiFCqHaS9LaNKiR1m1MljbaihjUFxOTqkkTEy+J6IuJD0brmw+2iTFpUlOtD7ReEiEaX6qlxCpEs7akZamUBhh2dmdm5+KZmS4U2NmB/snsnst/vv/+n0NhDdS7p7eaChTe5HnuWYZlG1ZsZ0wYP+vAeye/OXXVC4vyYjj8+FM7WIb53gQ2cBwH63OhrG6qT584+9WvuFuBR7rSSZrHb2QYs5kpCoLgA027HpvTYDxUyVIalbThMVASZpFpmlAUGaqqQtO0ct8Go6h9WBGz0mZvd1q3lGKJRU0JDj52NTvLMiioFMayUmkpn1XnIkNDQ1o5TBZuwlIH74Nm2B54or0K8SoGfoEHyyx3CkcEkhijrT6AMxduWkuBewLRevI/sS6BlAmdJApqwyxiQRqRoB8C75ow2JTwIxHmMS2qKEJW3PhcY/jluTPXSdSIW0x7nrml4+zIPCTFWORRiia+vTSPy5OyPRc4x+WnBwdvuOG6WmhRY5T/NxnnNlvZ2VwjAIaBoLCkoyWgOc6hMcbb84eTIVT52SuVMF0t/G7gxd17Hwhsboxxt63RMT4preKbmMmDY5zx/XUBpDpjmy588mr7ugXmYf5FLBu2J6Qcwn4WB3fWrOJLbY3DxzkwxPlFUjpDO147ftkN17PTDA70/0KQHqnZELYLvqCodrZapBQ14talqFjCtr/+6aOV8CoWvqO1+aP1r2pOWYn5AsYnsvY3t7DcxTSNL7zwWC8GFfTHAmUelWQl6iNlUVsdQTwSsvcYepm+V7ki94MXnqeFPQMn52iaeUzTjf9EqbAoaIWwWRhaquPYR9e88DxjWKKv3+rdSthHgj4eoYAfPIkdySVIsgxKx7a9b392cS04ni4t0eik0dhao0OU8rg5v2CnpNXMWWJpNsfQWCN5WvhC+kiSBXWiSqC7ulsd/QzSAKz+U3Lr+TENeUU/rVF4w+sSZiptvtRzuJMxmWFyEbZHt+xCvG0XmNwUaF0BTbqPyQYgtxxAjquBODXxIAXq0La2Lecvjv85s26BffvTXTwrnCI+aPBX16HjmWMwattR3LidxEyFHm9FbudRaIkOhBtaMfP379DyCxEK9IGOppaR0X/Gyt4Wq3zf151+97nu9CxNsz8RtyUpisa9qVeg3dbNCMRxaYrC6DUFJhew11STQcO+l8EKQcvVSRP0cN++dPb5/T0fVLSwP5V+RzfwPhn6SCmAIfdcrKUTTbufhChK9nz2egaZc59DzGYgJJohRGJkL4/ExjrkblxBfiYLXdehG0aI5NSejuZW/JEZHy5rIWkmh5bGRTsLOX/YFlRdHUIul4c/3gA+EgcfiqGqvgWSJCMaDdk8DO+3z2ja0mVPIt1/p4xlZWG9zEpjnuftR9OiKyxrYxHHrRRDQAsIh4NYSdYZ66z17nEwKcpV4OIiy9qfG8nzt2DF1o2ss1bp3GlpRYGlW74c6Sp5tUmiPS7KEjhfsCyfYZTHKKumrhtwo4XppXYpi7OufKbpYBB/Gq4CSf847jCbrhoq4tziuDA7XZbH7kSmc578Lruy/gdc2bgNZaB1HQAAAABJRU5ErkJggg==" alt="">', /* Image, Icon or SVG */
				backgroundColor: "#ffffff", /* Html color code */
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
			id: uuidv4(),
			avatar: {
				src: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASmSURBVHgBnVZbTBxVGP7mvhd2t+wuCxXELUiFCqHaS9LaNKiR1m1MljbaihjUFxOTqkkTEy+J6IuJD0brmw+2iTFpUlOtD7ReEiEaX6qlxCpEs7akZamUBhh2dmdm5+KZmS4U2NmB/snsnst/vv/+n0NhDdS7p7eaChTe5HnuWYZlG1ZsZ0wYP+vAeye/OXXVC4vyYjj8+FM7WIb53gQ2cBwH63OhrG6qT584+9WvuFuBR7rSSZrHb2QYs5kpCoLgA027HpvTYDxUyVIalbThMVASZpFpmlAUGaqqQtO0ct8Go6h9WBGz0mZvd1q3lGKJRU0JDj52NTvLMiioFMayUmkpn1XnIkNDQ1o5TBZuwlIH74Nm2B54or0K8SoGfoEHyyx3CkcEkhijrT6AMxduWkuBewLRevI/sS6BlAmdJApqwyxiQRqRoB8C75ow2JTwIxHmMS2qKEJW3PhcY/jluTPXSdSIW0x7nrml4+zIPCTFWORRiia+vTSPy5OyPRc4x+WnBwdvuOG6WmhRY5T/NxnnNlvZ2VwjAIaBoLCkoyWgOc6hMcbb84eTIVT52SuVMF0t/G7gxd17Hwhsboxxt63RMT4preKbmMmDY5zx/XUBpDpjmy588mr7ugXmYf5FLBu2J6Qcwn4WB3fWrOJLbY3DxzkwxPlFUjpDO147ftkN17PTDA70/0KQHqnZELYLvqCodrZapBQ14talqFjCtr/+6aOV8CoWvqO1+aP1r2pOWYn5AsYnsvY3t7DcxTSNL7zwWC8GFfTHAmUelWQl6iNlUVsdQTwSsvcYepm+V7ki94MXnqeFPQMn52iaeUzTjf9EqbAoaIWwWRhaquPYR9e88DxjWKKv3+rdSthHgj4eoYAfPIkdySVIsgxKx7a9b392cS04ni4t0eik0dhao0OU8rg5v2CnpNXMWWJpNsfQWCN5WvhC+kiSBXWiSqC7ulsd/QzSAKz+U3Lr+TENeUU/rVF4w+sSZiptvtRzuJMxmWFyEbZHt+xCvG0XmNwUaF0BTbqPyQYgtxxAjquBODXxIAXq0La2Lecvjv85s26BffvTXTwrnCI+aPBX16HjmWMwattR3LidxEyFHm9FbudRaIkOhBtaMfP379DyCxEK9IGOppaR0X/Gyt4Wq3zf151+97nu9CxNsz8RtyUpisa9qVeg3dbNCMRxaYrC6DUFJhew11STQcO+l8EKQcvVSRP0cN++dPb5/T0fVLSwP5V+RzfwPhn6SCmAIfdcrKUTTbufhChK9nz2egaZc59DzGYgJJohRGJkL4/ExjrkblxBfiYLXdehG0aI5NSejuZW/JEZHy5rIWkmh5bGRTsLOX/YFlRdHUIul4c/3gA+EgcfiqGqvgWSJCMaDdk8DO+3z2ja0mVPIt1/p4xlZWG9zEpjnuftR9OiKyxrYxHHrRRDQAsIh4NYSdYZ66z17nEwKcpV4OIiy9qfG8nzt2DF1o2ss1bp3GlpRYGlW74c6Sp5tUmiPS7KEjhfsCyfYZTHKKumrhtwo4XppXYpi7OufKbpYBB/Gq4CSf847jCbrhoq4tziuDA7XZbH7kSmc578Lruy/gdc2bgNZaB1HQAAAABJRU5ErkJggg==" alt="">', /* Font, Image or SVG */
				backgroundColor: "#ffffff", /* Html color code */
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
			id: uuidv4(),
			avatar: {
				src: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASmSURBVHgBnVZbTBxVGP7mvhd2t+wuCxXELUiFCqHaS9LaNKiR1m1MljbaihjUFxOTqkkTEy+J6IuJD0brmw+2iTFpUlOtD7ReEiEaX6qlxCpEs7akZamUBhh2dmdm5+KZmS4U2NmB/snsnst/vv/+n0NhDdS7p7eaChTe5HnuWYZlG1ZsZ0wYP+vAeye/OXXVC4vyYjj8+FM7WIb53gQ2cBwH63OhrG6qT584+9WvuFuBR7rSSZrHb2QYs5kpCoLgA027HpvTYDxUyVIalbThMVASZpFpmlAUGaqqQtO0ct8Go6h9WBGz0mZvd1q3lGKJRU0JDj52NTvLMiioFMayUmkpn1XnIkNDQ1o5TBZuwlIH74Nm2B54or0K8SoGfoEHyyx3CkcEkhijrT6AMxduWkuBewLRevI/sS6BlAmdJApqwyxiQRqRoB8C75ow2JTwIxHmMS2qKEJW3PhcY/jluTPXSdSIW0x7nrml4+zIPCTFWORRiia+vTSPy5OyPRc4x+WnBwdvuOG6WmhRY5T/NxnnNlvZ2VwjAIaBoLCkoyWgOc6hMcbb84eTIVT52SuVMF0t/G7gxd17Hwhsboxxt63RMT4preKbmMmDY5zx/XUBpDpjmy588mr7ugXmYf5FLBu2J6Qcwn4WB3fWrOJLbY3DxzkwxPlFUjpDO147ftkN17PTDA70/0KQHqnZELYLvqCodrZapBQ14talqFjCtr/+6aOV8CoWvqO1+aP1r2pOWYn5AsYnsvY3t7DcxTSNL7zwWC8GFfTHAmUelWQl6iNlUVsdQTwSsvcYepm+V7ki94MXnqeFPQMn52iaeUzTjf9EqbAoaIWwWRhaquPYR9e88DxjWKKv3+rdSthHgj4eoYAfPIkdySVIsgxKx7a9b392cS04ni4t0eik0dhao0OU8rg5v2CnpNXMWWJpNsfQWCN5WvhC+kiSBXWiSqC7ulsd/QzSAKz+U3Lr+TENeUU/rVF4w+sSZiptvtRzuJMxmWFyEbZHt+xCvG0XmNwUaF0BTbqPyQYgtxxAjquBODXxIAXq0La2Lecvjv85s26BffvTXTwrnCI+aPBX16HjmWMwattR3LidxEyFHm9FbudRaIkOhBtaMfP379DyCxEK9IGOppaR0X/Gyt4Wq3zf151+97nu9CxNsz8RtyUpisa9qVeg3dbNCMRxaYrC6DUFJhew11STQcO+l8EKQcvVSRP0cN++dPb5/T0fVLSwP5V+RzfwPhn6SCmAIfdcrKUTTbufhChK9nz2egaZc59DzGYgJJohRGJkL4/ExjrkblxBfiYLXdehG0aI5NSejuZW/JEZHy5rIWkmh5bGRTsLOX/YFlRdHUIul4c/3gA+EgcfiqGqvgWSJCMaDdk8DO+3z2ja0mVPIt1/p4xlZWG9zEpjnuftR9OiKyxrYxHHrRRDQAsIh4NYSdYZ66z17nEwKcpV4OIiy9qfG8nzt2DF1o2ss1bp3GlpRYGlW74c6Sp5tUmiPS7KEjhfsCyfYZTHKKumrhtwo4XppXYpi7OufKbpYBB/Gq4CSf847jCbrhoq4tziuDA7XZbH7kSmc578Lruy/gdc2bgNZaB1HQAAAABJRU5ErkJggg==" alt="">', /* Font, Image or SVG */
				backgroundColor: "#ffffff", /* Html color code */
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
	cookie: false, /* It does not show the speech bubble, notification number, and pulse effect again for the specified time. For example, do not show for 1 hour, (cookie:1) or to remove, (cookie:false) */
}