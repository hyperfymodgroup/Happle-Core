import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { config } from '../config'

export function HeadScreen({ world, player, content }) {
	const screenRef = useRef(null)
	const textureRef = useRef(null)
	const canvasRef = useRef(null)
	const contextRef = useRef(null)

	useEffect(() => {
		if (!config.headScreen.enabled) return

		// Create canvas for texture
		const canvas = document.createElement('canvas')
		canvas.width = config.headScreen.resolution.width
		canvas.height = config.headScreen.resolution.height
		canvasRef.current = canvas

		// Get context and store ref
		const ctx = canvas.getContext('2d')
		contextRef.current = ctx

		// Create texture from canvas
		const texture = new THREE.CanvasTexture(canvas)
		textureRef.current = texture

		// Create screen mesh
		const geometry = new THREE.PlaneGeometry(
			config.headScreen.dimensions.width,
			config.headScreen.dimensions.height
		)

		const material = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			opacity: config.headScreen.style.opacity
		})

		const screen = new THREE.Mesh(geometry, material)
		screen.position.y = config.headScreen.position.y
		screen.rotation.y = config.headScreen.position.rotation
		screenRef.current = screen

		// Add to player
		player.add(screen)

		// Update content initially
		updateContent(content)

		// Listen for content updates
		world.on('happleCore:screenUpdate', updateContent)

		return () => {
			// Cleanup
			world.off('happleCore:screenUpdate', updateContent)
			if (screenRef.current) {
				player.remove(screenRef.current)
				geometry.dispose()
				material.dispose()
				texture.dispose()
			}
		}
	}, [world, player])

	// Update when content prop changes
	useEffect(() => {
		updateContent(content)
	}, [content])

	const updateContent = (text) => {
		if (!contextRef.current || !textureRef.current) return

		const ctx = contextRef.current
		const canvas = canvasRef.current

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Draw background
		ctx.fillStyle = config.headScreen.style.background
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Draw text
		ctx.fillStyle = config.headScreen.style.textColor
		ctx.font = config.headScreen.style.font
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'

		// Split text into lines if needed
		const lines = text.split('\n')
		const lineHeight = parseInt(config.headScreen.style.font)
		const startY = (canvas.height - (lines.length * lineHeight)) / 2

		lines.forEach((line, i) => {
			ctx.fillText(
				line,
				canvas.width / 2,
				startY + (i * lineHeight) + (lineHeight / 2)
			)
		})

		// Update texture
		textureRef.current.needsUpdate = true
	}

	return null
} 