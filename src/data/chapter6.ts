import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter6: Chapter = {
  id: 'vectors',
  order: 6,
  title: '平面向量及其应用',
  shortTitle: '平面向量',
  description: '用有序数和方向处理位移、速度与几何关系，把向量运算转化为坐标运算。',
  color: '#5f6fb4',
  icon: '向量',
  cards: [
    {
      id: 'vector-1',
      title: '向量的概念',
      summary: '区分向量、模和实际背景中的有向线段。',
      blocks: [
        text('既有大小又有方向的量叫做向量。向量 $\\vec a$ 的大小叫做模，记作 $|\\vec a|$。'),
        formula('\\vec a=\\overrightarrow{AB}'),
        text('零向量的模为 $0$，方向任意；单位向量的模为 $1$。向量和起点位置无关，只由大小与方向决定。')
      ],
      interaction: 'vector'
    },
    {
      id: 'vector-2',
      title: '相等、相反与共线',
      summary: '从方向和模判断向量之间的关系。',
      blocks: [
        text('大小相等、方向相同的两个向量相等；大小相等、方向相反的向量互为相反向量。'),
        formula('\\vec b=\\lambda\\vec a\\ (\\lambda\\in\\mathbf{R},\\ \\vec a\\ne\\vec0)\\iff \\vec a\\parallel\\vec b'),
        warn('共线向量可平移', '平行向量不一定在同一条直线上，零向量与任意向量共线。')
      ]
    },
    {
      id: 'vector-3',
      title: '向量的加减法',
      summary: '用三角形法则和平行四边形法则组合向量。',
      blocks: [
        formula('\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}'),
        formula('\\vec a-\\vec b=\\vec a+(-\\vec b)'),
        text('两个向量首尾相接可用三角形法则相加；共起点时可用平行四边形法则。向量的差指向被减向量的终点。')
      ]
    },
    {
      id: 'vector-4',
      title: '坐标表示',
      summary: '把向量的线性运算转化为坐标运算。',
      blocks: [
        text('若 $\\vec a=(x_1,y_1)$，$\\vec b=(x_2,y_2)$，则向量运算可以逐坐标进行。'),
        formula('\\vec a\\pm\\vec b=(x_1\\pm x_2,\\ y_1\\pm y_2)'),
        formula('\\lambda\\vec a=(\\lambda x_1,\\lambda y_1)'),
        text('由点 $A(x_1,y_1)$ 指向 $B(x_2,y_2)$ 的向量为 $\\overrightarrow{AB}=(x_2-x_1,y_2-y_1)$。')
      ]
    },
    {
      id: 'vector-5',
      title: '数量积',
      summary: '用向量计算夹角与投影。',
      blocks: [
        formula('\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta'),
        formula('\\vec a\\cdot\\vec b=x_1x_2+y_1y_2'),
        text('数量积是一个实数。它同时包含两个向量的长度信息以及夹角的余弦信息。'),
        tip('夹角范围', '向量夹角通常取 $[0,\\\\pi]$。夹角为锐角时数量积为正，为钝角时为负。')
      ]
    },
    {
      id: 'vector-6',
      title: '模与夹角',
      summary: '由坐标求长度和夹角。',
      blocks: [
        formula('|\\vec a|=\\sqrt{x_1^2+y_1^2}'),
        formula('\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}'),
        text('计算夹角前，先确认两个向量都非零；否则余弦公式的分母为零。')
      ]
    },
    {
      id: 'vector-7',
      title: '平行与垂直',
      summary: '用坐标条件判断几何关系。',
      blocks: [
        formula('\\vec a\\parallel\\vec b\\iff x_1y_2-x_2y_1=0'),
        formula('\\vec a\\perp\\vec b\\iff \\vec a\\cdot\\vec b=0'),
        text('平行条件也常写成 $x_1y_2=x_2y_1$；垂直条件在坐标中就是点积为零。'),
        warn('区分平行与垂直', '平行看斜率同向或反向，垂直看点积为零，不要混用公式。')
      ]
    },
    {
      id: 'vector-8',
      title: '向量的几何应用',
      summary: '用向量证明共线、垂直和中点关系。',
      blocks: [
        text('证明三点共线，可证明由同一点出发的两个向量平行。证明线段垂直，可证明对应方向向量的点积为零。'),
        formula('\\overrightarrow{OM}=\\frac{\\overrightarrow{OA}+\\overrightarrow{OB}}2', '$M$ 为 $AB$ 的中点'),
        tip('建立坐标系', '几何关系复杂时，用坐标表示向量往往能减少辅助线。')
      ]
    }
  ],
  examples: [
    {
      id: 'vector-example-1',
      title: '例题 1 · 坐标运算',
      prompt: '已知 $\\vec a=(1,2)$，$\\vec b=(3,-1)$，求 $\\vec a+2\\vec b$。',
      hint: '先数乘，再逐坐标相加。',
      steps: [
        { title: '数乘', content: '$2\\vec b=(6,-2)$。' },
        { title: '相加', content: '$(1,2)+(6,-2)=(7,0)$。' }
      ],
      answer: '$(7,0)$'
    },
    {
      id: 'vector-example-2',
      title: '例题 2 · 数量积',
      prompt: '已知 $\\vec a=(1,2)$，$\\vec b=(2,-1)$，求 $\\vec a\\cdot\\vec b$ 并判断是否垂直。',
      hint: '数量积用对应坐标相乘再相加。',
      steps: [
        { title: '计算点积', content: '$\\vec a\\cdot\\vec b=1\\times2+2\\times(-1)=0$。' },
        { title: '解释结果', content: '非零向量点积为零，说明两向量垂直。' }
      ],
      answer: '$\\vec a\\cdot\\vec b=0$，两向量垂直'
    }
  ],
  questions: questionsFor('vectors', [
    {
      id: 'vector-q1',
      topic: '向量坐标',
      type: 'single',
      difficulty: 1,
      prompt: '已知 $\\vec a=(2,1)$，$\\vec b=(1,3)$，则 $\\vec a+\\vec b$ 等于：',
      options: [
        { id: 'A', text: '$(3,4)$' },
        { id: 'B', text: '$(1,2)$' },
        { id: 'C', text: '$(2,3)$' },
        { id: 'D', text: '$(3,2)$' }
      ],
      answer: ['A'],
      hint: '对应坐标分别相加。',
      steps: ['$\\vec a+\\vec b=(2+1,1+3)$。', '$=(3,4)$。']
    },
    {
      id: 'vector-q2',
      topic: '数量积',
      type: 'single',
      difficulty: 1,
      prompt: '若 $\\vec a=(1,2)$，$\\vec b=(3,4)$，则 $\\vec a\\cdot\\vec b$ 等于：',
      options: [
        { id: 'A', text: '6' },
        { id: 'B', text: '8' },
        { id: 'C', text: '11' },
        { id: 'D', text: '14' }
      ],
      answer: ['C'],
      hint: '点积等于 $x_1x_2+y_1y_2$。',
      steps: ['$\\vec a\\cdot\\vec b=1\\times3+2\\times4$。', '$=3+8=11$。']
    },
    {
      id: 'vector-q3',
      topic: '向量模',
      type: 'single',
      difficulty: 1,
      prompt: '向量 $(3,4)$ 的模是：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '7' }
      ],
      answer: ['C'],
      hint: '使用勾股定理。',
      steps: ['$|\\vec a|=\\sqrt{3^2+4^2}$。', '$=\\sqrt{25}=5$。']
    },
    {
      id: 'vector-q4',
      topic: '点向量',
      type: 'single',
      difficulty: 1,
      prompt: '已知 $A(1,2)$，$B(4,6)$，则 $\\overrightarrow{AB}$ 等于：',
      options: [
        { id: 'A', text: '$(3,4)$' },
        { id: 'B', text: '$(5,8)$' },
        { id: 'C', text: '$(4,3)$' },
        { id: 'D', text: '$(-3,-4)$' }
      ],
      answer: ['A'],
      hint: '终点坐标减去起点坐标。',
      steps: ['$\\overrightarrow{AB}=(4-1,6-2)$。', '$=(3,4)$。']
    },
    {
      id: 'vector-q5',
      topic: '垂直条件',
      type: 'single',
      difficulty: 2,
      prompt: '若 $\\vec a=(2,3)$ 与 $\\vec b=(m,4)$ 垂直，则 $m$ 等于：',
      options: [
        { id: 'A', text: '-6' },
        { id: 'B', text: '6' },
        { id: 'C', text: '-2' },
        { id: 'D', text: '2' }
      ],
      answer: ['A'],
      hint: '非零向量垂直等价于数量积为 $0$。',
      steps: ['点积为 $2m+12=0$。', '解得 $m=-6$。']
    },
    {
      id: 'vector-q6',
      topic: '平行条件',
      type: 'single',
      difficulty: 2,
      prompt: '若向量 $(1,2)$ 与 $(k,4)$ 平行，则 $k$ 等于：',
      options: [
        { id: 'A', text: '1' },
        { id: 'B', text: '2' },
        { id: 'C', text: '4' },
        { id: 'D', text: '8' }
      ],
      answer: ['B'],
      hint: '平行条件为 $x_1y_2-x_2y_1=0$。',
      steps: ['$1\\times4-2\\times k=0$。', '解得 $k=2$。']
    },
    {
      id: 'vector-q7',
      topic: '向量的加减',
      type: 'single',
      difficulty: 2,
      prompt: '若 $\\vec a=(3,1)$，$\\vec b=(1,2)$，则 $2\\vec a-\\vec b$ 等于：',
      options: [
        { id: 'A', text: '$(5,0)$' },
        { id: 'B', text: '$(5,4)$' },
        { id: 'C', text: '$(7,0)$' },
        { id: 'D', text: '$(4,-1)$' }
      ],
      answer: ['A'],
      hint: '先数乘 $2\\vec a$，再对应坐标相减。',
      steps: ['$2\\vec a=(6,2)$。', '$(6,2)-(1,2)=(5,0)$。']
    },
    {
      id: 'vector-q8',
      topic: '数量积性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于两个非零向量的数量积，下列说法正确的是：',
      options: [
        { id: 'A', text: '数量积的结果是实数' },
        { id: 'B', text: '两向量垂直时数量积为零' },
        { id: 'C', text: '两向量夹锐角时数量积为正' },
        { id: 'D', text: '数量积等于两向量模的乘积' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '数量积还包含夹角的余弦。',
      steps: ['数量积定义为 $|\\vec a||\\vec b|\\cos\\theta$，是实数。', '垂直时 $\\cos\\theta=0$，锐角时余弦为正。', '一般数量积还乘了 $\\cos\\theta$，不总等于模的乘积。']
    },
    {
      id: 'vector-q9',
      topic: '坐标几何',
      type: 'multiple',
      difficulty: 2,
      prompt: '已知 $\\vec a=(1,-1)$，$\\vec b=(2,1)$，下列结论正确的是：',
      options: [
        { id: 'A', text: '$\\vec a\\cdot\\vec b=1$' },
        { id: 'B', text: '$|\\vec a|=\\sqrt2$' },
        { id: 'C', text: '$2\\vec b=(4,2)$' },
        { id: 'D', text: '$\\vec a\\parallel\\vec b$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '分别计算点积、模、数乘和平行条件。',
      steps: ['$\\vec a\\cdot\\vec b=2-1=1$。', '$|\\vec a|=\\sqrt{1+1}=\\sqrt2$。', '$2\\vec b=(4,2)$。', '$1\\times1-2\\times(-1)=3\\ne0$，不平行。']
    },
    {
      id: 'vector-q10',
      topic: '数量积',
      type: 'numeric',
      difficulty: 1,
      prompt: '若 $\\vec a=(2,1)$，$\\vec b=(-1,3)$，则 $\\vec a\\cdot\\vec b$ 等于多少？',
      answer: ['1'],
      tolerance: 0,
      hint: '对应坐标相乘后相加。',
      steps: ['$2\\times(-1)+1\\times3$。', '$=-2+3=1$。']
    }
  ])
}
