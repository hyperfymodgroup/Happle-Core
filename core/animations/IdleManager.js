import { config } from '../config'

export class IdleManager {
	constructor(world) {
		this.world = world
		this.currentAnimation = null
		this.idleTimeout = null
		this.idleDelay = config.idle.delay || 5000
		this.enabled = config.idle.enabled !== false
		this.animations = config.idle.animations || [
			'idle_stretch',
			'idle_look_around',
			'idle_check_phone'
		]
	}

	init() {
		if (!this.enabled) return

		// Movement listeners
		const resetEvents = ['playerMove', 'playerRotate', 'playerJump', 'playerAction']
		resetEvents.forEach(event => {
			this.world.on(event, this.resetIdleTimer)
		})

		// Start idle check
		this.startIdleCheck()

		return () => {
			resetEvents.forEach(event => {
				this.world.off(event, this.resetIdleTimer)
			})
			if (this.idleTimeout) {
				clearTimeout(this.idleTimeout)
			}
			this.stopCurrentAnimation()
		}
	}

	resetIdleTimer = () => {
		if (!this.enabled) return

		if (this.idleTimeout) {
			clearTimeout(this.idleTimeout)
		}

		// Stop any current animation
		this.stopCurrentAnimation()

		// Start new timer
		this.idleTimeout = setTimeout(() => {
			this.playIdleAnimation()
		}, this.idleDelay)
	}

	stopCurrentAnimation() {
		if (this.currentAnimation) {
			this.world.avatar.stopAnimation(this.currentAnimation)
			this.world.emit('happleCore:idleEnd')
			this.currentAnimation = null
		}
	}

	playIdleAnimation() {
		// Don't play if player is moving or performing action
		if (this.world.avatar.isMoving || this.world.avatar.isActing) {
			return this.resetIdleTimer()
		}

		// Select random animation
		const randomAnim = this.animations[Math.floor(Math.random() * this.animations.length)]

		// Play animation
		this.currentAnimation = randomAnim
		this.world.avatar.playAnimation(randomAnim, {
			loop: false,
			onComplete: () => {
				this.currentAnimation = null
				this.resetIdleTimer()
			}
		})

		// Emit event
		this.world.emit('happleCore:idleStart', randomAnim)
	}

	startIdleCheck() {
		// Initial idle check
		this.resetIdleTimer()
	}
} 