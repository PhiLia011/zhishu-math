import type { Chapter } from '../types'
import { formula, note, questionsFor, text, tip, warn } from './helpers'

export const chapter4: Chapter = {
  id: 'exp-log',
  order: 4,
  title: '指数函数与对数函数',
  shortTitle: '指数与对数',
  description: '理解快速增长与缓慢增长，掌握指数和对数之间的互逆关系。',
  color: '#3977a6',
  icon: '指数',
  cards: [
    {
      id: 'exp-1',
      title: '指数幂的扩展',
      summary: '从整数指数扩展到分数指数。',
      blocks: [
        text('负指数表示倒数，分数指数与根式相互联系。'),
        formula('a^{-n}=\\frac1{a^n},\\qquad a^{m/n}=\\sqrt[n]{a^m}\\quad(a>0)'),
        warn('底数限制', '当指数为任意实数时，通常要求底数 $a>0$，这样幂才有完整意义。')
      ]
    },
    {
      id: 'exp-2',
      title: '指数运算律',
      summary: '同底数幂相乘、相除与乘方。',
      blocks: [
        formula('a^m a^n=a^{m+n},\\qquad \\frac{a^m}{a^n}=a^{m-n}'),
        formula('(a^m)^n=a^{mn},\\qquad (ab)^n=a^n b^n'),
        tip('指数相加对应底数相乘', '运算律的适用前提是底数相同，幂的乘法也不要与指数相加混淆。')
      ]
    },
    {
      id: 'exp-3',
      title: '指数函数的图象',
      summary: '底数大小决定增长方向和变化速度。',
      blocks: [
        formula('y=a^x\\quad(a>0,\\ a\\ne1)'),
        text('当 $a>1$ 时，函数在 $\\mathbf{R}$ 上递增；当 $0<a<1$ 时递减。所有指数函数图象都经过点 $(0,1)$，值域为 $(0,+\\infty)$。'),
        note('关于 $y$ 轴对称', '$y=a^x$ 与 $y=(1/a)^x$ 的图象关于 $y$ 轴对称。')
      ],
      interaction: 'function'
    },
    {
      id: 'exp-4',
      title: '对数的定义',
      summary: '把指数式转换为对数式。',
      blocks: [
        text('若 $a^b=N$，且 $a>0,a\\ne1,N>0$，则称 $b$ 是以 $a$ 为底 $N$ 的对数，记作 $b=\\log_a N$。'),
        formula('a^b=N\\iff b=\\log_a N'),
        tip('读方向', '$\\\\log_2 8=3$ 的含义是“$2$ 的多少次方等于 $8$”。')
      ]
    },
    {
      id: 'exp-5',
      title: '对数的运算',
      summary: '把积、商、幂转化为和、差、倍数。',
      blocks: [
        formula('\\log_a(MN)=\\log_aM+\\log_aN'),
        formula('\\log_a\\frac MN=\\log_aM-\\log_aN'),
        formula('\\log_a(M^r)=r\\log_aM'),
        warn('没有乘积律的反向误用', '$\\\\log_a(M+N)\\\\ne\\\\log_aM+\\\\log_aN$。')
      ]
    },
    {
      id: 'exp-6',
      title: '换底公式',
      summary: '把不同底数的对数统一到同一底数。',
      blocks: [
        formula('\\log_a b=\\frac{\\log_c b}{\\log_c a}'),
        text('常用结论：$\\log_a b\\cdot\\log_b a=1$，$\\log_{a^n}(b^m)=\\frac mn\\log_a b$。'),
        tip('选择方便的底数', '数值计算中常换成 $10$ 或 $e$ 为底，理论推导中可换成题目里已经出现的底。')
      ]
    },
    {
      id: 'exp-7',
      title: '对数函数的图象',
      summary: '由指数函数图象交换坐标得到。',
      blocks: [
        formula('y=\\log_a x\\quad(a>0,\\ a\\ne1,\\ x>0)'),
        text('对数函数的定义域是 $(0,+\\infty)$，值域是 $\\mathbf{R}$，图象恒过 $(1,0)$。当 $a>1$ 时递增，当 $0<a<1$ 时递减。'),
        note('互为反函数', '$y=a^x$ 与 $y=\\log_a x$ 的图象关于直线 $y=x$ 对称。')
      ]
    },
    {
      id: 'exp-8',
      title: '指数与对数模型',
      summary: '识别增长、衰减、复利和规模换算问题。',
      blocks: [
        text('按固定比例增长或衰减时，可建立 $y=A\\cdot b^t$ 模型；已知指数结果求时间，通常需要取对数。'),
        formula('A(1+r)^t=B\\Rightarrow t=\\frac{\\log(B/A)}{\\log(1+r)}'),
        tip('单位保持一致', '利率、时间和指数增长模型中的单位要统一，例如月利率对应月数。')
      ]
    }
  ],
  examples: [
    {
      id: 'exp-example-1',
      title: '例题 1 · 指数运算',
      prompt: '计算 $2^{-2}\\times2^5$。',
      hint: '同底数幂相乘，指数相加。',
      steps: [
        { title: '使用指数运算律', content: '$2^{-2}\\times2^5=2^{-2+5}$。' },
        { title: '化简', content: '$=2^3=8$。' }
      ],
      answer: '$8$'
    },
    {
      id: 'exp-example-2',
      title: '例题 2 · 对数运算',
      prompt: '求 $\\log_2 8+\\log_2 4$。',
      hint: '先分别把两个对数化为指数形式。',
      steps: [
        { title: '分别求值', content: '$\\log_2 8=3$，$\\log_2 4=2$。' },
        { title: '相加', content: '$3+2=5$。' }
      ],
      answer: '$5$'
    }
  ],
  questions: questionsFor('exp-log', [
    {
      id: 'exp-q1',
      topic: '指数运算',
      type: 'single',
      difficulty: 1,
      prompt: '$2^{-2}$ 等于：',
      options: [
        { id: 'A', text: '$-4$' },
        { id: 'B', text: '$-\\frac14$' },
        { id: 'C', text: '$\\frac14$' },
        { id: 'D', text: '$4$' }
      ],
      answer: ['C'],
      hint: '负指数表示倒数。',
      steps: ['$2^{-2}=\\dfrac1{2^2}$。', '$=\\dfrac14$。']
    },
    {
      id: 'exp-q2',
      topic: '对数定义',
      type: 'single',
      difficulty: 1,
      prompt: '$\\log_2 8$ 的值是：',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '3' },
        { id: 'C', text: '4' },
        { id: 'D', text: '8' }
      ],
      answer: ['B'],
      hint: '$2$ 的多少次方等于 $8$？',
      steps: ['$2^3=8$。', '所以 $\\log_2 8=3$。']
    },
    {
      id: 'exp-q3',
      topic: '定义域',
      type: 'single',
      difficulty: 1,
      prompt: '函数 $f(x)=\\log_2(x-1)$ 的定义域是：',
      options: [
        { id: 'A', text: '$x>0$' },
        { id: 'B', text: '$x>1$' },
        { id: 'C', text: '$x\\ge1$' },
        { id: 'D', text: '$x\\ne1$' }
      ],
      answer: ['B'],
      hint: '对数的真数必须大于零。',
      steps: ['需要 $x-1>0$。', '所以 $x>1$。']
    },
    {
      id: 'exp-q4',
      topic: '对数性质',
      type: 'single',
      difficulty: 1,
      prompt: '$\\log_5 1$ 的值是：',
      options: [
        { id: 'A', text: '0' },
        { id: 'B', text: '1' },
        { id: 'C', text: '5' },
        { id: 'D', text: '不存在' }
      ],
      answer: ['A'],
      hint: '$5$ 的零次方等于多少？',
      steps: ['任意正数且不等于 $1$ 的底数，其零次方为 $1$。', '所以 $\\log_5 1=0$。']
    },
    {
      id: 'exp-q5',
      topic: '指数方程',
      type: 'single',
      difficulty: 2,
      prompt: '方程 $2^x=8$ 的解是：',
      options: [
        { id: 'A', text: '$x=2$' },
        { id: 'B', text: '$x=3$' },
        { id: 'C', text: '$x=4$' },
        { id: 'D', text: '$x=8$' }
      ],
      answer: ['B'],
      hint: '把 $8$ 写成以 $2$ 为底的幂。',
      steps: ['$8=2^3$。', '同底指数相等，所以 $x=3$。']
    },
    {
      id: 'exp-q6',
      topic: '对数运算',
      type: 'single',
      difficulty: 2,
      prompt: '$\\log_3 9+\\log_3 27$ 等于：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '6' }
      ],
      answer: ['C'],
      hint: '分别把 $9$、$27$ 写成 $3$ 的幂。',
      steps: ['$\\log_3 9=2$，$\\log_3 27=3$。', '相加得 $5$。']
    },
    {
      id: 'exp-q7',
      topic: '函数图象',
      type: 'single',
      difficulty: 2,
      prompt: '当 $a>1$ 时，函数 $y=\\log_a x$ 在 $(0,+\\infty)$ 上：',
      options: [
        { id: 'A', text: '单调递增' },
        { id: 'B', text: '单调递减' },
        { id: 'C', text: '先增后减' },
        { id: 'D', text: '没有单调性' }
      ],
      answer: ['A'],
      hint: '回顾对数函数底数大于 $1$ 时的图象。',
      steps: ['对数函数 $y=\\log_a x$ 在 $a>1$ 时随 $x$ 增大而增大。', '因此它在定义域上单调递增。']
    },
    {
      id: 'exp-q8',
      topic: '对数运算',
      type: 'multiple',
      difficulty: 2,
      prompt: '下列等式在真数都为正数时一定成立的是：',
      options: [
        { id: 'A', text: '$\\log_a(MN)=\\log_aM+\\log_aN$' },
        { id: 'B', text: '$\\log_a(M/N)=\\log_aM-\\log_aN$' },
        { id: 'C', text: '$\\log_a(M+N)=\\log_aM+\\log_aN$' },
        { id: 'D', text: '$\\log_a(M^2)=2\\log_aM$' }
      ],
      answer: ['A', 'B', 'D'],
      hint: '只有积、商、幂有对应的运算法则。',
      steps: ['积、商、幂的对数公式分别对应 A、B、D。', '对数不能拆分和式，C 错误。']
    },
    {
      id: 'exp-q9',
      topic: '指数函数',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于函数 $f(x)=2^x$，下列说法正确的是：',
      options: [
        { id: 'A', text: '图象经过点 $(0,1)$' },
        { id: 'B', text: '在 $\\mathbf{R}$ 上单调递增' },
        { id: 'C', text: '值域为 $(0,+\\infty)$' },
        { id: 'D', text: '图象关于 $y$ 轴对称' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '$2^x$ 始终为正，且底数大于 $1$。',
      steps: ['$2^0=1$，A 正确。', '底数 $2>1$，函数递增，B 正确。', '指数函数输出恒正，值域为 $(0,+\\infty)$，C 正确。', '它没有 $y$ 轴对称性，D 错误。']
    },
    {
      id: 'exp-q10',
      topic: '指数运算',
      type: 'numeric',
      difficulty: 1,
      prompt: '计算 $3^2+3^0$ 的值。',
      answer: ['10'],
      tolerance: 0,
      hint: '任何非零数的零次幂都等于 $1$。',
      steps: ['$3^2=9$，$3^0=1$。', '$9+1=10$。']
    }
  ])
}
