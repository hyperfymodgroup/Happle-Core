import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { css } from '@firebolt-dev/css'

export function HeadScreen({ world, player }) {
	const screenRef = useRef(null)
	const [content, setContent] = useState(null)

	useEffect(() => {
		// Create screen mesh
		const geometry = new THREE.PlaneGeometry(1, 0.3)
		const material = new THREE.MeshBasicMaterial({
			transparent: true,
			opacity: 0.8,
			side: THREE.DoubleSide
		})

		const screen = new THREE.Mesh(geometry, material)
		screen.position.y = 2
		screen.rotation.y = Math.PI // Face the player
		screenRef.current = screen

		// Add to player
		player.add(screen)

		// Create dynamic texture for content
		const canvas = document.createElement('canvas')
		canvas.width = 512
		canvas.height = 156
		const context = canvas.getContext('2d')
		const texture = new THREE.CanvasTexture(canvas)
		material.map = texture

		// Update content handler
		const updateScreen = (newContent) => {
			setContent(newContent)

			// Clear canvas
			context.clearRect(0, 0, canvas.width, canvas.height)

			// Draw background
			context.fillStyle = 'rgba(0, 0, 0, 0.7)'
			context.fillRect(0, 0, canvas.width, canvas.height)

			// Draw content
			context.fillStyle = '#00ff9d'
			context.font = '32px "Courier New"'
			context.textAlign = 'center'
			context.textBaseline = 'middle'
			context.fillText(newContent || '', canvas.width / 2, canvas.height / 2)

			// Update texture
			texture.needsUpdate = true
		}

		// Listen for content updates
		world.on('screenUpdate', updateScreen)

		// Initial content
		updateScreen(content)

		return () => {
			world.off('screenUpdate', updateScreen)
			player.remove(screen)
			geometry.dispose()
			material.dispose()
			texture.dispose()
		}
	}, [player])

	return null // This is a 3D-only component
} 