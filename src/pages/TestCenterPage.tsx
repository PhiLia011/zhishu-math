import { ArrowRight, Award, Clock3, Layers3, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { chapters } from '../data'
import { chapterAccuracy } from '../lib/quiz'

export function TestCenterPage() {
  const { progress } = useProgress()
  const activeWrong = Object.values(progress.wrongQuestions).filter((item) => !item.mastered).length

  return (
    <div className="page">
      <PageHeader
        eyebrow="Test center"
        title="测试中心"
        description="用小测定位薄弱点，用综合卷检查知识之间的联系。"
        action={progress.activeQuiz ? <Link className="button secondary" to="/quiz/resume"><Clock3 size={17} />继续未完成测试</Link> : undefined}
      />

      <section className="test-feature-grid">
        <article className="test-feature comprehensive">
          <span className="feature-icon"><Layers3 size={25} /></span>
          <span className="eyebrow">跨章节检测</span>
          <h2>综合能力卷</h2>
          <p>从九章中均衡抽取 20 题，覆盖不同题型，完成后查看章节与知识点表现。</p>
          <div className="feature-meta">
            <span>20 道题</span><span>约 30 分钟</span><span>即时解析</span>
          </div>
          <Link className="button light" to="/quiz/comprehensive">开始综合卷 <ArrowRight size={18} /></Link>
        </article>
        <article className="test-feature mistakes">
          <span className="feature-icon"><RotateCcw size={25} /></span>
          <span className="eyebrow">针对性复习</span>
          <h2>错题重练</h2>
          <p>{activeWrong > 0 ? `还有 ${activeWrong} 道题等待重新掌握。连续答对两次即可标记为已掌握。` : '错题本目前没有待复习题目，完成一次小测后这里会自动积累。'}</p>
          <Link className="button secondary" to="/mistakes">查看错题本 <ArrowRight size={18} /></Link>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">章节小测</span>
            <h2>逐章检查基础</h2>
          </div>
          <p>每章 10 题，建议先完成知识卡再开始。</p>
        </div>
        <div className="quiz-list">
          {chapters.map((chapter) => {
            const accuracy = chapterAccuracy(progress, chapter.id)
            const completed = chapter.cards.filter((card) => progress.completedCards[card.id]).length
            return (
              <article className="quiz-row" key={chapter.id}>
                <div className="quiz-row-number" style={{ background: chapter.color }}>{String(chapter.order).padStart(2, '0')}</div>
                <div className="quiz-row-main">
                  <strong>{chapter.shortTitle}</strong>
                  <span>{completed}/{chapter.cards.length} 知识卡 · 10 道题</span>
                </div>
                <div className="quiz-row-score">
                  {accuracy === null ? <span className="muted">未测试</span> : <><Award size={16} /><strong>{accuracy}%</strong></>}
                </div>
                <Link className="button small" to={`/quiz/chapter/${chapter.id}`}>开始</Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="recent-attempts">
        <div className="section-heading">
          <div><span className="eyebrow">近期记录</span><h2>你的测试足迹</h2></div>
          <Link to="/progress">完整学习报告 <ArrowRight size={16} /></Link>
        </div>
        {progress.attempts.length === 0 ? (
          <div className="empty-state compact">
            <Award size={32} />
            <h3>还没有测试记录</h3>
            <p>选择上方任意章节，完成第一份小测。</p>
          </div>
        ) : (
          <div className="attempt-list">
            {progress.attempts.slice(0, 5).map((attempt) => {
              const chapter = chapters.find((item) => item.id === attempt.chapterId)
              return (
                <Link to={`/results/${attempt.id}`} className="attempt-row" key={attempt.id}>
                  <span>{attempt.mode === 'comprehensive' ? '综合能力卷' : chapter?.shortTitle ?? '章节小测'}</span>
                  <span>{new Date(attempt.completedAt).toLocaleDateString('zh-CN')}</span>
                  <strong>{attempt.score}/{attempt.total}</strong>
                  <ArrowRight size={16} />
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
