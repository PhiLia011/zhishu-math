import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Download,
  Home,
  RotateCcw,
  WifiOff
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { allCards } from '../data'

const navItems = [
  { to: '/', label: '学习首页', icon: Home },
  { to: '/tests', label: '测试中心', icon: ClipboardCheck },
  { to: '/mistakes', label: '错题本', icon: RotateCcw },
  { to: '/progress', label: '学习报告', icon: BarChart3 }
]

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function Layout() {
  const { progress } = useProgress()
  const location = useLocation()
  const [online, setOnline] = useState(navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    function handleOnline() {
      setOnline(navigator.onLine)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOnline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOnline)
    }
  }, [])

  useEffect(() => {
    function capturePrompt(event: Event) {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', capturePrompt)
    return () => window.removeEventListener('beforeinstallprompt', capturePrompt)
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    main?.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const completed = Object.keys(progress.completedCards).length
  const percent = Math.round((completed / allCards.length) * 100)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand" aria-label="知数首页">
          <span className="brand-mark">∑</span>
          <span>
            <strong>知数</strong>
            <small>高中数学互动学习</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-progress">
          <div className="sidebar-progress-head">
            <span>知识卡进度</span>
            <strong>{percent}%</strong>
          </div>
          <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
          <p>{completed} / {allCards.length} 个知识卡已完成</p>
        </div>

        {installPrompt && (
          <button
            className="install-button"
            onClick={async () => {
              await installPrompt.prompt()
              setInstallPrompt(null)
            }}
          >
            <Download size={17} />
            安装到桌面
          </button>
        )}

        <div className="sidebar-foot">
          <BookOpen size={16} />
          <span>按人教A版核心章节编写</span>
        </div>
      </aside>

      {!online && (
        <div className="offline-badge" role="status">
          <WifiOff size={16} />
          离线模式 · 进度仍会保存
        </div>
      )}

      <main className="app-main">
        <Outlet />
      </main>

      <nav className="mobile-nav" aria-label="移动端主导航">
        <NavLink to="/" end><Home size={20} /><span>首页</span></NavLink>
        <NavLink to="/tests"><ClipboardCheck size={20} /><span>测试</span></NavLink>
        <NavLink to="/mistakes"><RotateCcw size={20} /><span>错题</span></NavLink>
        <NavLink to="/progress"><BarChart3 size={20} /><span>报告</span></NavLink>
      </nav>
    </div>
  )
}
