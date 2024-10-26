'use client'

import { Canvas } from '@react-three/fiber'
import { Box } from '3oilerplate'
import { Scene } from './Scene'
import { useConfig, makeSeparator, makeButton, makeFolder } from '@/app/hooks/useConfig'

const Page = () => {
  const { config, reset } = useConfig({
    ...makeFolder('config', {
      color: { value: '#ff0000' },
      bgColor: { value: '#1c1c1c' },
      size: { value: 300, min: 100, max: 1000, step: 10 },
      depth: { value: 20, min: 0, max: 100, step: 1 },
      posY: { value: -25, min: -50, max: 50, step: 1 },
      ...makeSeparator(),
      sceneRotation: { label: 'scene ⟳', value: 5, min: -20, max: 20, step: 1 },
      zoom: { value: 120, min: 1, max: 500, step: 10 },
      ...makeSeparator(),
      lights: { value: true },
      wireframe: { value: false },
      ...makeSeparator(),
      ...makeButton('reset', () => reset())
    })
  })

  return (
    <Box s={{ width: '100%', div: { mih: '100vh' }, backgroundColor: config?.bgColor }}>
      <Canvas>
        <Scene config={config} />
      </Canvas>
    </Box>
  )
}

export default Page
