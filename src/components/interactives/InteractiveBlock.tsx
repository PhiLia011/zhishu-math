import type { InteractionKind } from '../../types'
import { FunctionLab } from './FunctionLab'
import { UnitCircleLab } from './UnitCircleLab'
import { VectorLab } from './VectorLab'
import { VennLab } from './VennLab'

export function InteractiveBlock({ kind }: { kind: InteractionKind }) {
  if (kind === 'venn') return <VennLab />
  if (kind === 'function') return <FunctionLab />
  if (kind === 'unitCircle') return <UnitCircleLab />
  return <VectorLab />
}
