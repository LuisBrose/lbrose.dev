"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function generateCodeSymbolPoints3D(count: number) {
  const points: THREE.Vector3[] = []

  const drawVolumetricLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    particlesForLine: number,
    thickness: number
  ) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const length = Math.sqrt(dx * dx + dy * dy)
    const dirX = dx / length
    const dirY = dy / length
    const perpX = -dirY
    const perpY = dirX

    const particlesPerPoint = 3
    const steps = Math.ceil(particlesForLine / particlesPerPoint)
    
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1)
      const baseX = x1 + dx * t
      const baseY = y1 + dy * t

      for (let j = 0; j < particlesPerPoint; j++) {
        const offsetDist = (Math.random() - 0.5) * thickness
        const offsetX = perpX * offsetDist
        const offsetY = perpY * offsetDist
        const z = (Math.random() - 0.5) * 0.6
        points.push(new THREE.Vector3(baseX + offsetX, baseY + offsetY, z))
      }
    }
  }

  const scale = 0.025
  const thickness = 0.08
  
  // Distribute particles evenly
  const particlesPerArm = 1350
  const particlesForSlash = 2250

  // Less than sign <
  // Smaller brackets: shorter arms and closer together
  drawVolumetricLine(-50 * scale, 0, -20 * scale, 22.5 * scale, particlesPerArm, thickness)
  drawVolumetricLine(-50 * scale, 0, -20 * scale, -22.5 * scale, particlesPerArm, thickness)

  // Forward slash / - more tilted (less steep)
  drawVolumetricLine(12 * scale, 35 * scale, -12 * scale, -35 * scale, particlesForSlash, thickness)

  // Greater than sign >
  drawVolumetricLine(50 * scale, 0, 20 * scale, 22.5 * scale, particlesPerArm, thickness)
  drawVolumetricLine(50 * scale, 0, 20 * scale, -22.5 * scale, particlesPerArm, thickness)

  return points
}

interface ParticleLogo3dProps {
  color?: string
  particleCount?: number
  particleSize?: number
  speed?: number
  className?: string
}

export function ParticleLogo3d({
  color = "#a1a1aa",
  particleCount = 7650,
  particleSize = 0.05,
  speed = 0.5,
  className = "",
}: ParticleLogo3dProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.InstancedMesh | null>(null)
  const particlesGroupRef = useRef<THREE.Group | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const baseParticlePositionsRef = useRef<THREE.Vector3[]>([])
  const particleDisplacementsRef = useRef<THREE.Vector3[]>([])
  const particleScatterVelocitiesRef = useRef<THREE.Vector3[]>([])

  const rotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const gyroTargetRef = useRef({ x: 0, y: 0 })
  const gyroInfluenceRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const lastDragTimeRef = useRef(0)
  const lastGyroRef = useRef({ gamma: 0, beta: 0 })
  const gyroEnabledRef = useRef(false)

  const containerWidth = 400
  const containerHeight = 400
  const canvasOverflowMultiplier = 2.5

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const canvasWidth = containerWidth * canvasOverflowMultiplier
    const canvasHeight = containerHeight * canvasOverflowMultiplier

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const baseFOV = 50
    const adjustedFOV =
      2 *
      Math.atan(Math.tan((baseFOV * Math.PI) / 180 / 2) * canvasOverflowMultiplier) *
      (180 / Math.PI)
    const camera = new THREE.PerspectiveCamera(adjustedFOV, canvasWidth / canvasHeight, 0.1, 1000)
    camera.position.z = 4
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(canvasWidth, canvasHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const canvas = renderer.domElement
    canvas.style.position = "absolute"
    const offsetX = (canvasWidth - containerWidth) / 2
    const offsetY = (canvasHeight - containerHeight) / 2
    canvas.style.left = `-${offsetX}px`
    canvas.style.top = `-${offsetY}px`
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.style.display = "block"
    canvas.style.touchAction = "pan-y"
    container.appendChild(canvas)
    rendererRef.current = renderer

    const points = generateCodeSymbolPoints3D(particleCount)
    const actualParticleCount = points.length

    baseParticlePositionsRef.current = []
    particleDisplacementsRef.current = []
    particleScatterVelocitiesRef.current = []

    const threeColor = new THREE.Color(color)
    const sphereGeometry = new THREE.SphereGeometry(particleSize * 0.15, 8, 8)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, actualParticleCount)
    particlesRef.current = particles

    const instanceColors = new Float32Array(actualParticleCount * 3)
    const matrix = new THREE.Matrix4()

    for (let i = 0; i < actualParticleCount; i++) {
      const point = points[i]
      baseParticlePositionsRef.current.push(point.clone())
      particleDisplacementsRef.current.push(new THREE.Vector3(0, 0, 0))
      particleScatterVelocitiesRef.current.push(new THREE.Vector3(0, 0, 0))

      matrix.setPosition(point.x, point.y, point.z)
      particles.setMatrixAt(i, matrix)

      instanceColors[i * 3] = threeColor.r
      instanceColors[i * 3 + 1] = threeColor.g
      instanceColors[i * 3 + 2] = threeColor.b
    }

    particles.instanceMatrix.needsUpdate = true
    particles.instanceColor = new THREE.InstancedBufferAttribute(instanceColors, 3)

    const particlesGroup = new THREE.Group()
    particlesGroupRef.current = particlesGroup
    particlesGroup.add(particles)
    scene.add(particlesGroup)

    const CURSOR_PHYSICS = {
      RETURN_FORCE: 0.15,
      FRICTION: 0.92,
      CURSOR_REPULSION: 2.5,
    }

    const cursorRadius = 150

    let lastFrameTime = performance.now()
    const targetDeltaTime = 1000 / 60

    const lerpFactor = 0.03
    const velocityDecay = 0.96

    const animate = () => {
      const now = performance.now()
      const deltaTime = now - lastFrameTime
      lastFrameTime = now
      const deltaFactor = deltaTime / targetDeltaTime

      const rotationSpeed = speed * 0.01
      const actualSpeed = rotationSpeed

      if (!isDraggingRef.current) {
        targetRotationRef.current.x += actualSpeed * deltaFactor
        
        // Apply gyro influence with decay
        const gyroDecay = 0.98
        gyroInfluenceRef.current.x *= gyroDecay
        gyroInfluenceRef.current.y *= gyroDecay
        
        // Blend gyro influence into target
        targetRotationRef.current.x += gyroInfluenceRef.current.x * deltaFactor
        targetRotationRef.current.y += gyroInfluenceRef.current.y * deltaFactor
        
        // Gravity: pull pitch (y) back to upright, not yaw (x) which is the spin
        const gravityStrength = 0.01
        const pullY = (0 - targetRotationRef.current.y) * gravityStrength * deltaFactor
        targetRotationRef.current.y += pullY
      }

      if (!isDraggingRef.current && lerpFactor > 0) {
        const threshold = 0.01
        if (
          Math.abs(velocityRef.current.x) > threshold ||
          Math.abs(velocityRef.current.y) > threshold
        ) {
          targetRotationRef.current.x += velocityRef.current.x * deltaFactor
          targetRotationRef.current.y += velocityRef.current.y * deltaFactor
          targetRotationRef.current.y = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, targetRotationRef.current.y)
          )
          const decayFactor = Math.pow(velocityDecay, deltaFactor)
          velocityRef.current.x *= decayFactor
          velocityRef.current.y *= decayFactor
        } else {
          velocityRef.current.x = 0
          velocityRef.current.y = 0
        }
      }

      const dx = targetRotationRef.current.x - rotationRef.current.x
      const dy = targetRotationRef.current.y - rotationRef.current.y
      const threshold = 0.01

      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || rotationSpeed !== 0) {
        const timeLerpFactor = 1 - Math.pow(1 - lerpFactor, deltaFactor)
        rotationRef.current.x += dx * timeLerpFactor
        rotationRef.current.y += dy * timeLerpFactor
        rotationRef.current.y = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, rotationRef.current.y)
        )
      }

      particlesGroup.rotation.y = rotationRef.current.x
      particlesGroup.rotation.x = rotationRef.current.y
      particlesGroup.updateMatrixWorld(true)

      // Cursor repulsion (only when mouse is present)
      if (mouseRef.current && particlesRef.current) {
        const currentCamera = cameraRef.current
        if (!currentCamera) return

        const currentCanvasWidth = containerWidth * canvasOverflowMultiplier
        const currentCanvasHeight = containerHeight * canvasOverflowMultiplier
        const cursorRadiusSquared = cursorRadius * cursorRadius
        const mouse = mouseRef.current

        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i]
          const displacement = particleDisplacementsRef.current[i]

          const currentLocalPos = new THREE.Vector3()
          currentLocalPos.copy(basePos)
          currentLocalPos.add(displacement)

          const worldPos = new THREE.Vector3()
          worldPos.copy(currentLocalPos)
          worldPos.applyMatrix4(particlesGroup.matrixWorld)

          const projected = worldPos.clone().project(currentCamera)
          const screenX = (projected.x * 0.5 + 0.5) * currentCanvasWidth
          const screenY = (-projected.y * 0.5 + 0.5) * currentCanvasHeight

          const dxMouse = mouse.x - screenX
          const dyMouse = mouse.y - screenY
          const distanceSquared = dxMouse * dxMouse + dyMouse * dyMouse

          if (distanceSquared < cursorRadiusSquared && distanceSquared > 0) {
            const distance = Math.sqrt(distanceSquared)
            const force = (cursorRadius - distance) / cursorRadius

            const cameraRight = new THREE.Vector3()
            const cameraUp = new THREE.Vector3()
            cameraRight.setFromMatrixColumn(currentCamera.matrixWorld, 0).normalize()
            cameraUp.setFromMatrixColumn(currentCamera.matrixWorld, 1).normalize()

            const angle = Math.atan2(dyMouse, dxMouse)
            const repulsionStrength = force * CURSOR_PHYSICS.CURSOR_REPULSION * 0.008 * deltaFactor
            const repulsionX = -Math.cos(angle) * repulsionStrength
            const repulsionY = Math.sin(angle) * repulsionStrength

            const worldRepulsion = new THREE.Vector3()
            worldRepulsion.addScaledVector(cameraRight, repulsionX)
            worldRepulsion.addScaledVector(cameraUp, repulsionY)

            const localRepulsion = new THREE.Vector3()
            localRepulsion.copy(worldRepulsion)
            const inverseGroupMatrix = new THREE.Matrix4()
            inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert()
            localRepulsion.applyMatrix4(inverseGroupMatrix)

            displacement.add(localRepulsion)
          }
        }
      }

      // Spring force: always pull particles back to home (runs every frame)
      if (particlesRef.current) {
        const returnMultiplier = mouseRef.current ? 1 : 3
        const springForce = CURSOR_PHYSICS.RETURN_FORCE * returnMultiplier * deltaFactor

        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const displacement = particleDisplacementsRef.current[i]
          displacement.multiplyScalar(1 - springForce)
        }
      }

      if (particleScatterVelocitiesRef.current.length > 0 && particlesRef.current) {
        for (let i = 0; i < particleScatterVelocitiesRef.current.length; i++) {
          const scatterVelocity = particleScatterVelocitiesRef.current[i]
          const displacement = particleDisplacementsRef.current[i]

          displacement.addScaledVector(scatterVelocity, deltaFactor * 0.1)

          const scatterFriction = Math.pow(0.95, deltaFactor)
          scatterVelocity.multiplyScalar(scatterFriction)

          const scatterReturnForce = CURSOR_PHYSICS.RETURN_FORCE * speed * deltaFactor
          scatterVelocity.multiplyScalar(1 - scatterReturnForce)
        }
      }

      if (particlesRef.current) {
        const matrix = new THREE.Matrix4()
        for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
          const basePos = baseParticlePositionsRef.current[i]
          const displacement = particleDisplacementsRef.current[i]
          const finalPos = new THREE.Vector3()
          finalPos.copy(basePos)
          finalPos.add(displacement)
          matrix.setPosition(finalPos.x, finalPos.y, finalPos.z)
          particlesRef.current.setMatrixAt(i, matrix)
        }
        particlesRef.current.instanceMatrix.needsUpdate = true
      }

      renderer.render(scene, camera)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true
      velocityRef.current.x = 0
      velocityRef.current.y = 0
      lastMouseRef.current = { x: event.clientX, y: event.clientY }
      lastDragTimeRef.current = performance.now()

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentTime = performance.now()
        const sensitivity = 0.01
        const dx = moveEvent.clientX - lastMouseRef.current.x
        const dy = moveEvent.clientY - lastMouseRef.current.y

        targetRotationRef.current.x += dx * sensitivity
        targetRotationRef.current.y += dy * sensitivity
        targetRotationRef.current.y = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotationRef.current.y)
        )

        if (currentTime - lastDragTimeRef.current > 0) {
          const timeNormalization = targetDeltaTime / (currentTime - lastDragTimeRef.current)
          velocityRef.current.x = dx * sensitivity * 0.3 * timeNormalization
          velocityRef.current.y = dy * sensitivity * 0.3 * timeNormalization
        }

        lastMouseRef.current = { x: moveEvent.clientX, y: moveEvent.clientY }
        lastDragTimeRef.current = currentTime
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        isDraggingRef.current = false
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousedown", handleMouseDown)

    const handleMouseMoveCursor = (event: MouseEvent) => {
      const containerRect = container.getBoundingClientRect()
      const mouseXInContainer = event.clientX - containerRect.left
      const mouseYInContainer = event.clientY - containerRect.top

      if (
        mouseXInContainer >= 0 &&
        mouseXInContainer <= containerRect.width &&
        mouseYInContainer >= 0 &&
        mouseYInContainer <= containerRect.height
      ) {
        mouseRef.current = {
          x: mouseXInContainer + offsetX,
          y: mouseYInContainer + offsetY,
        }
      } else {
        mouseRef.current = null
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = null
    }

    const handleClick = (event: MouseEvent) => {
      if (!particlesRef.current || !cameraRef.current) return

      particlesGroup.updateMatrixWorld(true)

      const containerRect = container.getBoundingClientRect()
      const clickX = event.clientX - containerRect.left + offsetX
      const clickY = event.clientY - containerRect.top + offsetY

      const cursorRadiusSquared = cursorRadius * cursorRadius
      const clickForce = 10

      const clickContainerWidth = containerWidth
      const clickContainerHeight = containerHeight
      const clickCanvasWidth = clickContainerWidth * canvasOverflowMultiplier
      const clickCanvasHeight = clickContainerHeight * canvasOverflowMultiplier
      const currentCamera = cameraRef.current

      const ndcX = (clickX / clickCanvasWidth) * 2 - 1
      const ndcY = 1 - (clickY / clickCanvasHeight) * 2

      const clickRay = new THREE.Vector3(ndcX, ndcY, 0.5)
      clickRay.unproject(currentCamera)

      const cameraWorldPos = new THREE.Vector3()
      cameraWorldPos.setFromMatrixPosition(currentCamera.matrixWorld)

      const clickDirection = new THREE.Vector3()
      clickDirection.subVectors(clickRay, cameraWorldPos).normalize()

      const sphereCenter = new THREE.Vector3(0, 0, 0)
      const cameraToCenter = new THREE.Vector3()
      cameraToCenter.subVectors(sphereCenter, cameraWorldPos)
      const sphereDistance = cameraToCenter.length()

      const clickWorldPos = new THREE.Vector3()
      clickWorldPos.copy(cameraWorldPos)
      clickWorldPos.addScaledVector(clickDirection, sphereDistance)

      for (let i = 0; i < baseParticlePositionsRef.current.length; i++) {
        const basePos = baseParticlePositionsRef.current[i]
        const displacement = particleDisplacementsRef.current[i]
        const scatterVelocity = particleScatterVelocitiesRef.current[i]

        const currentLocalPos = new THREE.Vector3()
        currentLocalPos.copy(basePos)
        currentLocalPos.add(displacement)

        const worldPos = new THREE.Vector3()
        worldPos.copy(currentLocalPos)
        worldPos.applyMatrix4(particlesGroup.matrixWorld)

        const projected = worldPos.clone().project(currentCamera)
        const screenX = (projected.x * 0.5 + 0.5) * clickCanvasWidth
        const screenY = (-projected.y * 0.5 + 0.5) * clickCanvasHeight

        const dx = clickX - screenX
        const dy = clickY - screenY
        const distanceSquared = dx * dx + dy * dy

        if (distanceSquared < cursorRadiusSquared && distanceSquared > 0) {
          const screenDistance = Math.sqrt(distanceSquared)
          const force = ((cursorRadius - screenDistance) / cursorRadius) * clickForce

          const radialDirection = new THREE.Vector3()
          radialDirection.subVectors(worldPos, clickWorldPos)
          const radialDistance = radialDirection.length()

          if (radialDistance > 0.001) {
            radialDirection.normalize()

            const scatterMagnitude = force * 0.5
            const worldScatter = new THREE.Vector3()
            worldScatter.copy(radialDirection)
            worldScatter.multiplyScalar(scatterMagnitude)

            const localScatter = new THREE.Vector3()
            localScatter.copy(worldScatter)
            const inverseGroupMatrix = new THREE.Matrix4()
            inverseGroupMatrix.copy(particlesGroup.matrixWorld).invert()
            localScatter.applyMatrix4(inverseGroupMatrix)

            scatterVelocity.add(localScatter)
          }
        }
      }

      mouseRef.current = null
    }

    canvas.addEventListener("mousemove", handleMouseMoveCursor)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("click", handleClick)

    const handleTouchMove = (event: TouchEvent) => {
      const containerRect = container.getBoundingClientRect()
      const touch = event.touches[0]
      if (touch) {
        const touchXInContainer = touch.clientX - containerRect.left
        const touchYInContainer = touch.clientY - containerRect.top

        if (
          touchXInContainer >= 0 &&
          touchXInContainer <= containerRect.width &&
          touchYInContainer >= 0 &&
          touchYInContainer <= containerRect.height
        ) {
          mouseRef.current = {
            x: touchXInContainer + offsetX,
            y: touchYInContainer + offsetY,
          }
        } else {
          mouseRef.current = null
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = null
    }

    const handleTouchStart = (event: TouchEvent) => {
      const containerRect = container.getBoundingClientRect()
      const touch = event.touches[0]
      if (touch) {
        const touchXInContainer = touch.clientX - containerRect.left
        const touchYInContainer = touch.clientY - containerRect.top
        mouseRef.current = {
          x: touchXInContainer + offsetX,
          y: touchYInContainer + offsetY,
        }
      }
    }

    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("touchcancel", handleTouchEnd)

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
    }

    window.addEventListener("resize", handleResize)

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        gyroEnabledRef.current = true
        
        // Calculate delta from last gyro reading
        const deltaGamma = event.gamma - lastGyroRef.current.gamma
        const deltaBeta = event.beta - lastGyroRef.current.beta
        
        // Apply gyro movement as temporary influence
        const sensitivity = 0.002
        const threshold = 0.3
        
        if (Math.abs(deltaGamma) > threshold || Math.abs(deltaBeta) > threshold) {
          gyroInfluenceRef.current.x += deltaGamma * sensitivity
          gyroInfluenceRef.current.y += deltaBeta * sensitivity * 0.5
        }
        
        // Clamp y influence
        const maxYInfluence = Math.PI / 4
        gyroInfluenceRef.current.y = Math.max(
          -maxYInfluence,
          Math.min(maxYInfluence, gyroInfluenceRef.current.y)
        )
        
        lastGyroRef.current = { gamma: event.gamma, beta: event.beta }
      }
    }

    const requestGyroPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation)
          }
        } catch {
          // Permission denied
        }
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation)
      }
    }

    requestGyroPermission()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMoveCursor)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("touchcancel", handleTouchEnd)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("deviceorientation", handleDeviceOrientation)

      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (container && canvas.parentNode) {
          container.removeChild(canvas)
        }
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose()
        ;(particlesRef.current.material as THREE.Material).dispose()
      }
    }
  }, [particleCount, particleSize, speed, color])

return (
    <div
      className={`w-[400px] h-[400px] relative ${className}`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}
    >
      <div
        ref={containerRef}
        style={{
          width: 400,
          height: 400,
          position: "relative",
          overflow: "visible",
        }}
      />
    </div>
  )
}