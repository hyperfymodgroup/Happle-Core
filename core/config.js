export const config = {
	idle: {
		enabled: true,
		delay: 5000,
		animations: [
			'idle_stretch',
			'idle_look_around',
			'idle_check_phone',
			'idle_dance',
			'idle_wave'
		]
	},

	headScreen: {
		enabled: true,
		dimensions: {
			width: 1,
			height: 0.3
		},
		resolution: {
			width: 512,
			height: 156
		},
		style: {
			opacity: 0.8,
			background: 'rgba(0, 0, 0, 0.7)',
			textColor: '#00ff9d',
			font: '32px "Courier New"'
		},
		position: {
			y: 2,
			rotation: Math.PI
		}
	},

	touch: {
		enabled: true,
		detection: {
			userAgents: [
				'OculusBrowser',
				'iPhone',
				'iPad',
				'iPod',
				'Android'
			]
		},
		interface: {
			buttonSize: 50,
			spacing: 10
		}
	},

	network: {
		reconnect: {
			enabled: true,
			maxAttempts: 5,
			delay: 1000
		}
	}
} 