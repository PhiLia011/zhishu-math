import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FunctionLab } from './FunctionLab'
import { UnitCircleLab } from './UnitCircleLab'
import { VectorLab } from './VectorLab'
import { VennLab } from './VennLab'

describe('interactive learning widgets', () => {
  it('updates the function expression from a slider', () => {
    render(<FunctionLab />)
    fireEvent.change(screen.getByLabelText('纵向伸缩 A'), { target: { value: '2' } })
    expect(screen.getByText('y = 2(x − 0)² + 0')).toBeInTheDocument()
  })

  it('changes set operation results', () => {
    render(<VennLab />)
    fireEvent.click(screen.getByRole('button', { name: '并集' }))
    expect(screen.getByText('A ∪ B')).toBeInTheDocument()
    expect(screen.getAllByText('4').length).toBeGreaterThan(0)
  })

  it('links angle controls to sine and cosine values', () => {
    render(<UnitCircleLab />)
    fireEvent.change(screen.getByLabelText('角度'), { target: { value: '180' } })
    expect(screen.getByText('180°')).toBeInTheDocument()
    expect(screen.getByText('-1.000')).toBeInTheDocument()
  })

  it('updates vector sum and dot product from controls', () => {
    render(<VectorLab />)
    fireEvent.change(screen.getByLabelText('aₓ'), { target: { value: '3' } })
    expect(screen.getByText('(4, 3)')).toBeInTheDocument()
  })
})
