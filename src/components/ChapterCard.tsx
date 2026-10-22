import { ArrowUpRight, BookOpen, CheckCircle2 } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Chapter } from '../types'

export function ChapterCard({
  chapter,
  completed,
  accuracy
}: {
  chapter: Chapter
  completed: number
  accuracy: number | null
}) {
  const percent = Math.round((completed / chapter.cards.length) * 100)
  const style = {
    '--chapter-color': chapter.color
  } as CSSProperties

  return (
    <Link to={`/chapter/${chapter.id}`} className="chapter-card" style={style}>
      <div className="chapter-card-top">
        <span className="chapter-icon">{chapter.icon}</span>
        {percent === 100 ? (
          <span className="chapter-done"><CheckCircle2 size={16} />完成</span>
        ) : (
          <span className="chapter-index">Chapter {chapter.order.toString().padStart(2, '0')}</span>
        )}
      </div>
      <h3>{chapter.shortTitle}</h3>
      <p>{chapter.description}</p>
      <div className="chapter-meta">
        <span><BookOpen size={15} />{completed}/{chapter.cards.length} 节</span>
        <span>{accuracy === null ? '尚未测试' : `正确率 ${accuracy}%`}</span>
      </div>
      <div className="chapter-progress"><span style={{ width: `${percent}%` }} /></div>
      <span className="chapter-arrow"><ArrowUpRight size={18} /></span>
    </Link>
  )
}
