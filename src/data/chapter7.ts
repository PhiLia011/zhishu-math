import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter7: Chapter = {
  id: 'complex-numbers',
  order: 7,
  title: '复数',
  shortTitle: '复数',
  description: '引入虚数单位，认识复数的代数形式、几何意义与基本运算。',
  color: '#9a6e3f',
  icon: '复数',
  cards: [
    {
      id: 'complex-1',
      title: '虚数单位',
      summary: '从负数开平方引入新的数系。',
      blocks: [
        text('规定 $\\mathrm i^2=-1$，称 $\\mathrm i$ 为虚数单位。由此负数也可以开平方。'),
        formula('\\sqrt{-a}=\\sqrt a\\,\\mathrm i\\quad(a>0)'),
        tip('幂的周期', '$\\\\mathrm i^{4k}=1$，$\\\\mathrm i^{4k+1}=\\\\mathrm i$，$\\\\mathrm i^{4k+2}=-1$，$\\\\mathrm i^{4k+3}=-\\\\mathrm i$。')
      ]
    },
    {
      id: 'complex-2',
      title: '复数的代数形式',
      summary: '认识实部、虚部与复数的分类。',
      blocks: [
        formula('z=a+b\\mathrm i\\quad(a,b\\in\\mathbf R)'),
        text('其中 $a$ 是实部，$b$ 是虚部。$b=0$ 时 $z$ 是实数；$b\\ne0$ 时是虚数；若还满足 $a=0$，则是纯虚数。'),
        warn('虚部不含 i', '复数 $3-2\\\\mathrm i$ 的虚部是 $-2$，不是 $-2\\\\mathrm i$。')
      ]
    },
    {
      id: 'complex-3',
      title: '复数相等',
      summary: '用实部和虚部分别相等建立方程。',
      blocks: [
        text('两个复数相等，当且仅当它们的实部相等且虚部相等。'),
        formula('a+b\\mathrm i=c+d\\mathrm i\\iff a=c\\text{ 且 }b=d'),
        tip('不能比较大小', '除非两个复数都是实数，否则一般不规定大小顺序。')
      ]
    },
    {
      id: 'complex-4',
      title: '复数的几何意义',
      summary: '把复数与复平面上的点一一对应。',
      blocks: [
        text('复数 $a+b\\mathrm i$ 对应复平面中的点 $(a,b)$，也对应从原点出发的向量 $(a,b)$。'),
        formula('z=a+b\\mathrm i\\quad\\leftrightarrow\\quad(a,b)'),
        text('实轴上的点表示实数，虚轴上的非原点表示纯虚数。')
      ]
    },
    {
      id: 'complex-5',
      title: '复数的加减法',
      summary: '实部与虚部分别运算。',
      blocks: [
        formula('(a+b\\mathrm i)\\pm(c+d\\mathrm i)=(a\\pm c)+(b\\pm d)\\mathrm i'),
        text('复数的加法满足交换律和结合律。几何上，复数加法与向量加法类似。'),
        tip('合并同类项', '把实部和虚部看作两类不同的项，运算后分别合并。')
      ]
    },
    {
      id: 'complex-6',
      title: '复数的乘法',
      summary: '按多项式展开，再利用 $\\mathrm i^2=-1$。',
      blocks: [
        formula('(a+b\\mathrm i)(c+d\\mathrm i)=(ac-bd)+(ad+bc)\\mathrm i'),
        text('展开时与多项式乘法相同，最后把所有 $\\mathrm i^2$ 替换成 $-1$。'),
        formula('(a+b\\mathrm i)(a-b\\mathrm i)=a^2+b^2')
      ]
    },
    {
      id: 'complex-7',
      title: '共轭复数与除法',
      summary: '用共轭复数把分母化为实数。',
      blocks: [
        text('复数 $z=a+b\\mathrm i$ 的共轭复数为 $\\bar z=a-b\\mathrm i$。两者实部相同，虚部相反。'),
        formula('\\frac{a+b\\mathrm i}{c+d\\mathrm i}=\\frac{(a+b\\mathrm i)(c-d\\mathrm i)}{c^2+d^2}'),
        tip('分母有理化', '复数除法的核心是把分母 $c+d\\\\mathrm i$ 乘上它的共轭。')
      ]
    },
    {
      id: 'complex-8',
      title: '复数的模',
      summary: '用点到原点的距离表示复数大小。',
      blocks: [
        formula('|z|=\\sqrt{a^2+b^2}'),
        text('复数 $z$ 的模就是对应点 $(a,b)$ 到原点的距离。'),
        formula('z\\bar z=|z|^2'),
        text('模是非负实数，因此复数的模可以比较大小。')
      ]
    }
  ],
  examples: [
    {
      id: 'complex-example-1',
      title: '例题 1 · 复数加法',
      prompt: '计算 $(2+3\\mathrm i)+(1-\\mathrm i)$。',
      hint: '实部加实部，虚部加虚部。',
      steps: [
        { title: '分组', content: '$(2+1)+(3\\mathrm i-\\mathrm i)$。' },
        { title: '合并', content: '$3+2\\mathrm i$。' }
      ],
      answer: '$3+2\\mathrm i$'
    },
    {
      id: 'complex-example-2',
      title: '例题 2 · 复数乘法',
      prompt: '计算 $(2+\\mathrm i)(3-2\\mathrm i)$。',
      hint: '像多项式一样展开，再用 $\\mathrm i^2=-1$。',
      steps: [
        { title: '展开', content: '$6-4\\mathrm i+3\\mathrm i-2\\mathrm i^2$。' },
        { title: '代入 $\\mathrm i^2=-1$', content: '$6-\\mathrm i+2$。' },
        { title: '合并', content: '$8-\\mathrm i$。' }
      ],
      answer: '$8-\\mathrm i$'
    }
  ],
  questions: questionsFor('complex-numbers', [
    {
      id: 'complex-q1',
      topic: '虚数单位',
      type: 'single',
      difficulty: 1,
      prompt: '$\\mathrm i^2$ 等于：',
      options: [
        { id: 'A', text: '1' },
        { id: 'B', text: '-1' },
        { id: 'C', text: '$\\mathrm i$' },
        { id: 'D', text: '$-\\mathrm i$' }
      ],
      answer: ['B'],
      hint: '这是虚数单位的定义。',
      steps: ['虚数单位满足 $\\mathrm i^2=-1$。']
    },
    {
      id: 'complex-q2',
      topic: '复数加法',
      type: 'single',
      difficulty: 1,
      prompt: '$(2+3\\mathrm i)+(1-\\mathrm i)$ 等于：',
      options: [
        { id: 'A', text: '$3+2\\mathrm i$' },
        { id: 'B', text: '$3+4\\mathrm i$' },
        { id: 'C', text: '$1+2\\mathrm i$' },
        { id: 'D', text: '$3-2\\mathrm i$' }
      ],
      answer: ['A'],
      hint: '实部、虚部分别相加。',
      steps: ['实部：$2+1=3$。', '虚部：$3+(-1)=2$。']
    },
    {
      id: 'complex-q3',
      topic: '复数乘法',
      type: 'single',
      difficulty: 1,
      prompt: '$(1+\\mathrm i)(1-\\mathrm i)$ 等于：',
      options: [
        { id: 'A', text: '0' },
        { id: 'B', text: '1' },
        { id: 'C', text: '2' },
        { id: 'D', text: '$2\\mathrm i$' }
      ],
      answer: ['C'],
      hint: '这是 $(a+b)(a-b)$ 的形式。',
      steps: ['$(1+\\mathrm i)(1-\\mathrm i)=1^2-\\mathrm i^2$。', '$=1-(-1)=2$。']
    },
    {
      id: 'complex-q4',
      topic: '共轭复数',
      type: 'single',
      difficulty: 1,
      prompt: '复数 $2-3\\mathrm i$ 的共轭复数是：',
      options: [
        { id: 'A', text: '$2+3\\mathrm i$' },
        { id: 'B', text: '$-2+3\\mathrm i$' },
        { id: 'C', text: '$-2-3\\mathrm i$' },
        { id: 'D', text: '$3-2\\mathrm i$' }
      ],
      answer: ['A'],
      hint: '共轭复数只改变虚部符号。',
      steps: ['实部保持 $2$，虚部由 $-3$ 变为 $3$。', '所以共轭复数为 $2+3\\mathrm i$。']
    },
    {
      id: 'complex-q5',
      topic: '复数模',
      type: 'single',
      difficulty: 1,
      prompt: '复数 $3+4\\mathrm i$ 的模是：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '7' }
      ],
      answer: ['C'],
      hint: '模等于实部与虚部平方和的算术平方根。',
      steps: ['$|3+4\\mathrm i|=\\sqrt{3^2+4^2}$。', '$=\\sqrt{25}=5$。']
    },
    {
      id: 'complex-q6',
      topic: '复数概念',
      type: 'single',
      difficulty: 2,
      prompt: '复数 $z=4-2\\mathrm i$ 的虚部是：',
      options: [
        { id: 'A', text: '$-2$' },
        { id: 'B', text: '$2$' },
        { id: 'C', text: '$-2\\mathrm i$' },
        { id: 'D', text: '$4$' }
      ],
      answer: ['A'],
      hint: '虚部是虚数单位前面的实数。',
      steps: ['$z$ 已写成 $a+b\\mathrm i$ 的形式。', '$a=4,b=-2$，所以虚部为 $-2$。']
    },
    {
      id: 'complex-q7',
      topic: '复平面',
      type: 'single',
      difficulty: 1,
      prompt: '复数 $-1+2\\mathrm i$ 在复平面内对应的点位于：',
      options: [
        { id: 'A', text: '第一象限' },
        { id: 'B', text: '第二象限' },
        { id: 'C', text: '第三象限' },
        { id: 'D', text: '第四象限' }
      ],
      answer: ['B'],
      hint: '对应点坐标为 $(-1,2)$。',
      steps: ['横坐标为负，纵坐标为正。', '点 $(-1,2)$ 位于第二象限。']
    },
    {
      id: 'complex-q8',
      topic: '复数运算',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于复数 $z=a+b\\mathrm i$，下列说法正确的是：',
      options: [
        { id: 'A', text: '当 $b=0$ 时，$z$ 是实数' },
        { id: 'B', text: '当 $a=0,b\\ne0$ 时，$z$ 是纯虚数' },
        { id: 'C', text: '$z+\\bar z=2a$' },
        { id: 'D', text: '任意两个复数都可以直接比较大小' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '复数大小的比较只对实数有意义。',
      steps: ['实部、虚部定义直接得到 A、B。', '$z+\\bar z=(a+b\\mathrm i)+(a-b\\mathrm i)=2a$。', '一般复数不能比较大小，D 错误。']
    },
    {
      id: 'complex-q9',
      topic: '复数几何意义',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于复数与复平面，下列说法正确的是：',
      options: [
        { id: 'A', text: '复数 $a+b\\mathrm i$ 对应点 $(a,b)$' },
        { id: 'B', text: '实轴上的点都表示实数' },
        { id: 'C', text: '复数的模等于对应点到原点的距离' },
        { id: 'D', text: '虚轴上的所有点都表示纯虚数' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '虚轴原点也表示实数 $0$。',
      steps: ['A、B、C 由复平面定义直接得到。', '虚轴原点对应 $0$，不是纯虚数，所以 D 错误。']
    },
    {
      id: 'complex-q10',
      topic: '虚数单位',
      type: 'numeric',
      difficulty: 1,
      prompt: '$\\mathrm i^4$ 的值是多少？',
      answer: ['1'],
      tolerance: 0,
      hint: '$\\mathrm i^4=(\\mathrm i^2)^2$。',
      steps: ['$\\mathrm i^2=-1$。', '$(-1)^2=1$。']
    }
  ])
}
