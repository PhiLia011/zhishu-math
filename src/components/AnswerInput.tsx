import type { Question } from '../types'
import { MathText } from './MathText'

interface AnswerInputProps {
  question: Question
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function AnswerInput({ question, value, onChange, disabled = false }: AnswerInputProps) {
  if (question.type === 'numeric') {
    return (
      <label className="numeric-answer">
        <span>输入答案</span>
        <input
          type="text"
          inputMode="decimal"
          value={value[0] ?? ''}
          onChange={(event) => onChange([event.target.value])}
          placeholder="可输入整数、小数或分数"
          disabled={disabled}
          aria-label="数值答案"
        />
      </label>
    )
  }

  const isMultiple = question.type === 'multiple'
  return (
    <div className="answer-options" role={isMultiple ? 'group' : 'radiogroup'}>
      {question.options?.map((option) => {
        const checked = value.includes(option.id)
        return (
          <label className={`answer-option ${checked ? 'is-selected' : ''}`} key={option.id}>
            <input
              type={isMultiple ? 'checkbox' : 'radio'}
              name={question.id}
              value={option.id}
              checked={checked}
              disabled={disabled}
              onChange={() => {
                if (isMultiple) {
                  onChange(checked ? value.filter((item) => item !== option.id) : [...value, option.id])
                } else {
                  onChange([option.id])
                }
              }}
            />
            <span className="option-letter">{option.id}</span>
            <span className="option-copy">
              <MathText>{option.text}</MathText>
            </span>
          </label>
        )
      })}
    </div>
  )
}
