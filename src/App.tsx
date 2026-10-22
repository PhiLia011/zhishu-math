import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProgressProvider } from './context/ProgressContext'
import { ChapterPage } from './pages/ChapterPage'
import { HomePage } from './pages/HomePage'
import { MistakesPage } from './pages/MistakesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProgressPage } from './pages/ProgressPage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { ResumeRedirect } from './pages/ResumeRedirect'
import { TestCenterPage } from './pages/TestCenterPage'

export function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="chapter/:chapterId" element={<ChapterPage />} />
            <Route path="chapter/:chapterId/:cardId" element={<ChapterPage />} />
            <Route path="tests" element={<TestCenterPage />} />
            <Route path="quiz/resume" element={<ResumeRedirect />} />
            <Route path="quiz/comprehensive" element={<QuizPage />} />
            <Route path="quiz/chapter/:chapterId" element={<QuizPage />} />
            <Route path="quiz/:mode" element={<QuizPage />} />
            <Route path="results/:attemptId" element={<ResultsPage />} />
            <Route path="mistakes" element={<MistakesPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
