import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'products.json')
    const fileContents = readFileSync(filePath, 'utf8')
    const products = JSON.parse(fileContents)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}
