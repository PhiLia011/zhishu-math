import type { Chapter } from '../types'
import { formula, note, questionsFor, text, tip, warn } from './helpers'

export const chapter5: Chapter = {
  id: 'trigonometry',
  order: 5,
  title: '三角函数',
  shortTitle: '三角函数',
  description: '从单位圆出发，把角、坐标、比值与周期变化联系起来。',
  color: '#b6557a',
  icon: '三角',
  cards: [
    {
      id: 'trig-1',
      title: '弧度制',
      summary: '用弧长与半径的比表示角的大小。',
      blocks: [
        text('长度等于半径的弧所对的圆心角为 $1$ 弧度。'),
        formula('180^\\circ=\\pi\\ \\text{rad},\\qquad 1^\\circ=\\frac{\\pi}{180}\\ \\text{rad}'),
        formula('l=|\\alpha|r,\\qquad S=\\frac12lr=\\frac12|\\alpha|r^2'),
        tip('换算方向', '角度化弧度乘 $\\\\pi/180$，弧度化角度乘 $180/\\\\pi$。')
      ]
    },
    {
      id: 'trig-2',
      title: '单位圆与三角函数',
      summary: '用终边与单位圆交点的坐标定义正弦、余弦。',
      blocks: [
        text('设角 $\\alpha$ 的终边与单位圆交于 $P(x,y)$，则 $\\cos\\alpha=x$，$\\sin\\alpha=y$，$\\tan\\alpha=y/x$。'),
        formula('x^2+y^2=1\\Rightarrow \\sin^2\\alpha+\\cos^2\\alpha=1'),
        text('角的终边旋转整圈后位置相同，因此三角函数具有周期性。')
      ],
      interaction: 'unitCircle'
    },
    {
      id: 'trig-3',
      title: '同角关系与符号',
      summary: '根据象限判断函数值符号。',
      blocks: [
        formula('\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha},\\qquad \\sin^2\\alpha+\\cos^2\\alpha=1'),
        text('正弦在第一、二象限为正；余弦在第一、四象限为正；正切在第一、三象限为正。'),
        warn('先定位象限', '已知一个三角函数值求其他值时，象限决定正负号，不能只做代数运算。')
      ]
    },
    {
      id: 'trig-4',
      title: '诱导公式',
      summary: '利用单位圆把任意角的三角函数化为锐角。',
      blocks: [
        text('诱导公式来自终边关于坐标轴或原点的对称。不要孤立背诵，可先画终边位置。'),
        formula('\\sin(-\\alpha)=-\\sin\\alpha,\\qquad \\cos(-\\alpha)=\\cos\\alpha'),
        formula('\\sin(\\pi-\\alpha)=\\sin\\alpha,\\qquad \\cos(\\pi-\\alpha)=-\\cos\\alpha'),
        tip('奇变偶不变', '处理 $k\\\\pi/2\\\\pm\\\\alpha$ 时，横纵函数名称是否改变由 $k$ 的奇偶决定，正负号由象限决定。')
      ]
    },
    {
      id: 'trig-5',
      title: '正弦函数的图象',
      summary: '认识正弦曲线的周期、振幅与关键点。',
      blocks: [
        formula('y=\\sin x'),
        text('定义域为 $\\mathbf{R}$，值域为 $[-1,1]$，周期为 $2\\pi$。图象关于原点对称，是奇函数。'),
        note('五点作图', '一个周期内可取 $0,\\pi/2,\\pi,3\\pi/2,2\\pi$ 五个关键点。')
      ],
      interaction: 'function'
    },
    {
      id: 'trig-6',
      title: '余弦与正切函数',
      summary: '比较三种函数的图象和定义域。',
      blocks: [
        text('$y=\\cos x$ 的值域为 $[-1,1]$，周期为 $2\\pi$；$y=\\tan x$ 的值域为 $\\mathbf{R}$，周期为 $\\pi$。'),
        formula('\\tan x\\text{ 的定义域}: x\\ne\\frac\\pi2+k\\pi\\ (k\\in\\mathbf{Z})'),
        tip('余弦与正弦平移', '$\\\\cos x=\\\\sin(x+\\\\pi/2)$，余弦图象可由正弦图象向左平移得到。')
      ]
    },
    {
      id: 'trig-7',
      title: '函数图象变换',
      summary: '由参数识别振幅、周期和相位。',
      blocks: [
        formula('y=A\\sin(\\omega x+\\varphi)+b\\quad(A>0,\\omega>0)'),
        text('振幅为 $A$，周期为 $2\\pi/\\omega$，初相为 $\\varphi$，纵向平移为 $b$。'),
        warn('横向平移量', '$y=\\\\sin(\\\\omega x+\\\\varphi)$ 向右平移的量为 $|\\\\varphi|/\\\\omega$，不是只由 $\\\\varphi$ 决定。')
      ]
    },
    {
      id: 'trig-8',
      title: '三角方程与模型',
      summary: '利用一个周期内的解和周期性写完整解集。',
      blocks: [
        text('由已知三角函数值求角时，先找基础解，再利用周期补充其他解。'),
        formula('\\sin x=\\sin\\alpha\\Rightarrow x=k\\pi+(-1)^k\\alpha'),
        text('简谐运动、交流电和周期变化问题，通常可写成正弦或余弦函数模型。')
      ]
    }
  ],
  examples: [
    {
      id: 'trig-example-1',
      title: '例题 1 · 单位圆求值',
      prompt: '求 $\\sin\\frac\\pi6$ 与 $\\cos\\frac\\pi6$。',
      hint: '联想 $30^\\circ$ 直角三角形的边长比。',
      steps: [
        { title: '识别特殊角', content: '$\\dfrac\\pi6=30^\\circ$。' },
        { title: '读取坐标', content: '单位圆上对应点为 $(\\sqrt3/2,1/2)$。' },
        { title: '得到函数值', content: '$\\sin(\\pi/6)=1/2$，$\\cos(\\pi/6)=\\sqrt3/2$。' }
      ],
      answer: '$\\sin\\frac\\pi6=\\frac12$，$\\cos\\frac\\pi6=\\frac{\\sqrt3}{2}$'
    },
    {
      id: 'trig-example-2',
      title: '例题 2 · 利用同角关系',
      prompt: '已知 $\\sin\\alpha=\\frac35$，且 $\\alpha$ 为第一象限角，求 $\\cos\\alpha$。',
      hint: '使用 $\\sin^2\\alpha+\\cos^2\\alpha=1$，并根据象限确定符号。',
      steps: [
        { title: '代入平方关系', content: '$\\cos^2\\alpha=1-\\left(\\frac35\\right)^2=\\frac{16}{25}$。' },
        { title: '开平方', content: '$\\cos\\alpha=\\pm\\frac45$。' },
        { title: '判断符号', content: '第一象限角余弦为正，所以 $\\cos\\alpha=\\frac45$。' }
      ],
      answer: '$\\cos\\alpha=\\frac45$'
    }
  ],
  questions: questionsFor('trigonometry', [
    {
      id: 'trig-q1',
      topic: '角度与弧度',
      type: 'single',
      difficulty: 1,
      prompt: '$30^\\circ$ 化为弧度是：',
      options: [
        { id: 'A', text: '$\\frac\\pi6$' },
        { id: 'B', text: '$\\frac\\pi4$' },
        { id: 'C', text: '$\\frac\\pi3$' },
        { id: 'D', text: '$\\frac\\pi2$' }
      ],
      answer: ['A'],
      hint: '$180^\\circ=\\pi$。',
      steps: ['$30^\\circ=30\\times\\frac{\\pi}{180}$。', '化简得 $\\frac\\pi6$。']
    },
    {
      id: 'trig-q2',
      topic: '特殊角',
      type: 'single',
      difficulty: 1,
      prompt: '$\\sin 30^\\circ$ 等于：',
      options: [
        { id: 'A', text: '$\\frac12$' },
        { id: 'B', text: '$\\frac{\\sqrt2}{2}$' },
        { id: 'C', text: '$\\frac{\\sqrt3}{2}$' },
        { id: 'D', text: '$1$' }
      ],
      answer: ['A'],
      hint: '常见特殊角的三角函数值。',
      steps: ['$\\sin30^\\circ$ 是 $30^\\circ$ 角所对直角边与斜边之比。', '所以等于 $\\frac12$。']
    },
    {
      id: 'trig-q3',
      topic: '同角关系',
      type: 'single',
      difficulty: 1,
      prompt: '若 $\\sin\\alpha=\\frac{4}{5}$，且 $\\alpha$ 为第一象限角，则 $\\cos\\alpha$ 等于：',
      options: [
        { id: 'A', text: '$\\frac35$' },
        { id: 'B', text: '$-\\frac35$' },
        { id: 'C', text: '$\\frac45$' },
        { id: 'D', text: '$-\\frac45$' }
      ],
      answer: ['A'],
      hint: '利用 $\\sin^2\\alpha+\\cos^2\\alpha=1$。',
      steps: ['$\\cos^2\\alpha=1-\\frac{16}{25}=\\frac{9}{25}$。', '第一象限中余弦为正，所以 $\\cos\\alpha=\\frac35$。']
    },
    {
      id: 'trig-q4',
      topic: '诱导公式',
      type: 'single',
      difficulty: 2,
      prompt: '$\\sin(\\pi-\\alpha)$ 等于：',
      options: [
        { id: 'A', text: '$-\\sin\\alpha$' },
        { id: 'B', text: '$\\sin\\alpha$' },
        { id: 'C', text: '$\\cos\\alpha$' },
        { id: 'D', text: '$-\\cos\\alpha$' }
      ],
      answer: ['B'],
      hint: '两个角的终边关于 $y$ 轴对称，纵坐标相同。',
      steps: ['$\\pi-\\alpha$ 与 $\\alpha$ 的终边关于 $y$ 轴对称。', '纵坐标相同，所以正弦值相同。']
    },
    {
      id: 'trig-q5',
      topic: '函数性质',
      type: 'single',
      difficulty: 1,
      prompt: '函数 $y=\\sin x$ 的最小正周期是：',
      options: [
        { id: 'A', text: '$\\pi$' },
        { id: 'B', text: '$2\\pi$' },
        { id: 'C', text: '$\\frac\\pi2$' },
        { id: 'D', text: '$3\\pi$' }
      ],
      answer: ['B'],
      hint: '正弦曲线每转一整圈重复一次。',
      steps: ['$\\sin(x+2\\pi)=\\sin x$。', '$2\\pi$ 是使等式恒成立的最小正数。']
    },
    {
      id: 'trig-q6',
      topic: '函数图象',
      type: 'single',
      difficulty: 2,
      prompt: '函数 $y=3\\sin x$ 的值域是：',
      options: [
        { id: 'A', text: '$[-1,1]$' },
        { id: 'B', text: '$[-3,3]$' },
        { id: 'C', text: '$[0,3]$' },
        { id: 'D', text: '$[3,+\\infty)$' }
      ],
      answer: ['B'],
      hint: '$\\sin x$ 在 $-1$ 与 $1$ 之间变化。',
      steps: ['$-1\\le\\sin x\\le1$。', '三边乘以 $3$，得到 $-3\\le3\\sin x\\le3$。']
    },
    {
      id: 'trig-q7',
      topic: '正切函数',
      type: 'single',
      difficulty: 2,
      prompt: '$\\tan\\frac\\pi4$ 的值是：',
      options: [
        { id: 'A', text: '0' },
        { id: 'B', text: '$\\frac12$' },
        { id: 'C', text: '1' },
        { id: 'D', text: '不存在' }
      ],
      answer: ['C'],
      hint: '$45^\\circ$ 的直角三角形两条直角边相等。',
      steps: ['$\\tan\\frac\\pi4=\\frac{\\sin(\\pi/4)}{\\cos(\\pi/4)}$。', '分子分母都等于 $\\frac{\\sqrt2}{2}$，所以比值为 $1$。']
    },
    {
      id: 'trig-q8',
      topic: '函数参数',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于函数 $y=2\\sin x$，下列说法正确的是：',
      options: [
        { id: 'A', text: '最大值为 2' },
        { id: 'B', text: '最小值为 -2' },
        { id: 'C', text: '周期为 $2\\pi$' },
        { id: 'D', text: '值域为 $[0,2]$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '$\\sin x$ 可以取遍 $[-1,1]$ 中的值。',
      steps: ['$-1\\le\\sin x\\le1$，所以 $-2\\le2\\sin x\\le2$。', '最大值、最小值分别为 $2,-2$。', '乘以常数不改变周期，仍为 $2\\pi$。']
    },
    {
      id: 'trig-q9',
      topic: '三角函数性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '正弦函数 $y=\\sin x$ 具有以下哪些性质？',
      options: [
        { id: 'A', text: '是奇函数' },
        { id: 'B', text: '值域为 $[-1,1]$' },
        { id: 'C', text: '在 $\\mathbf{R}$ 上单调递增' },
        { id: 'D', text: '图象关于原点中心对称' }
      ],
      answer: ['A', 'B', 'D'],
      hint: '正弦曲线会上下重复。',
      steps: ['$\\sin(-x)=-\\sin x$，所以是奇函数且图象关于原点对称。', '正弦值域为 $[-1,1]$。', '它不是全实数集上的单调函数。']
    },
    {
      id: 'trig-q10',
      topic: '特殊角',
      type: 'numeric',
      difficulty: 1,
      prompt: '计算 $\\sin\\frac\\pi2+\\cos0$ 的值。',
      answer: ['2'],
      tolerance: 0,
      hint: '$\\sin(\\pi/2)=1$，$\\cos0=1$。',
      steps: ['$\\sin\\frac\\pi2=1$，$\\cos0=1$。', '$1+1=2$。']
    }
  ])
}
