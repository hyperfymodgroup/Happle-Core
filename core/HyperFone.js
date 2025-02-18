import { useEffect, useRef } from 'react'
import { HeadScreen } from './components/HeadScreen'
import { IdleManager } from './animations/IdleManager'
import { config } from './config'

export function HyperFone({ world }) {
	const idleManagerRef = useRef(null)

	useEffect(() => {
		// Initialize idle manager
		const idleManager = new IdleManager(world)
		idleManagerRef.current = idleManager

		// Start idle system
		const cleanup = idleManager.init()

		return () => {
			if (cleanup) cleanup()
		}
	}, [world])

	return (
		<>
			{/* Head screen for local player */}
			<HeadScreen
				world={world}
				player={world.avatar.object}
				content={world.avatar.status || ''}
			/>

			{/* Head screens for other players */}
			{world.players.map(player => (
				<HeadScreen
					key={player.id}
					world={world}
					player={player.object}
					content={player.status || ''}
				/>
			))}
		</>
	)
}

// Export config for external use
export { config } 