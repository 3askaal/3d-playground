import { Color, Float32BufferAttribute, PlaneGeometry, SRGBColorSpace, Vector3 } from 'three'
import TinyColor from 'tinycolor2'
import { random } from 'lodash'

const vertex = new Vector3()
const vertexColor = new Color()

const getRandomTone = (color: any): [number, number, number] => {
  const modifier = random(-50, 50)
  const r = (color.r + modifier) / 255
  const g = (color.g + modifier) / 255
  const b = (color.b + modifier) / 255

  return [r, g, b]
}

export const getTerrainGeometry = ({ size, color, depth }: any) => {
  let terrainGeometry = new PlaneGeometry(size, size, size / 20, size / 20)
  terrainGeometry.rotateX(-Math.PI / 2)

  let position = terrainGeometry.attributes.position

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i)

    vertex.x += (Math.random() * (size / 100)) - (size / 200)
    vertex.y += (Math.random() * depth)
    vertex.z += (Math.random() * (size / 100)) - (size / 200)

    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }

  terrainGeometry = terrainGeometry.toNonIndexed() as any

  position = terrainGeometry.attributes.position

  const colorsFloor = []

  for (let i = 0; i < position.count; i++) {
    const rgb = new TinyColor(color).toRgb()
    vertexColor.setRGB(...getRandomTone(rgb), SRGBColorSpace)
    colorsFloor.push(vertexColor.r, vertexColor.g, vertexColor.b)
  }

  terrainGeometry.setAttribute('color', new Float32BufferAttribute(colorsFloor, 3))

  return terrainGeometry
}
