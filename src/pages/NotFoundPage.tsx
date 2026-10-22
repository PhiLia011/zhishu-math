import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page not-found">
      <span>404</span>
      <h1>这个数学空间不存在</h1>
      <p>地址可能写错了，回到学习地图继续探索吧。</p>
      <Link className="button primary" to="/">返回首页</Link>
    </div>
  )
}
