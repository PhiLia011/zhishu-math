import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter2: Chapter = {
  id: 'quadratic-inequality',
  order: 2,
  title: '一元二次函数、方程和不等式',
  shortTitle: '方程与不等式',
  description: '从因式分解到判别式，建立二次函数、二次方程与不等式之间的联系。',
  color: '#d89c3d',
  icon: '方程',
  cards: [
    {
      id: 'quad-1',
      title: '二次函数的三种形式',
      summary: '在一般式、顶点式与交点式之间转换。',
      blocks: [
        formula('y=ax^2+bx+c\\quad(a\\ne0)', '一般式'),
        formula('y=a(x-h)^2+k', '顶点式，顶点为 $(h,k)$'),
        formula('y=a(x-x_1)(x-x_2)', '交点式，零点为 $x_1,x_2$'),
        text('三种形式描述的是同一个函数。选哪一种，取决于题目更关心顶点、零点还是一般系数。')
      ],
      interaction: 'function'
    },
    {
      id: 'quad-2',
      title: '顶点与对称轴',
      summary: '由系数直接定位抛物线的关键几何特征。',
      blocks: [
        formula('x=-\\frac{b}{2a},\\qquad y_{\\min/\\max}=\\frac{4ac-b^2}{4a}'),
        text('当 $a>0$ 时，抛物线开口向上，顶点给出最小值；当 $a<0$ 时开口向下，顶点给出最大值。'),
        tip('先看开口方向', '判断最值之前先看 $a$ 的符号，可以避免把最大值与最小值对调。')
      ]
    },
    {
      id: 'quad-3',
      title: '因式分解与零积',
      summary: '把求根问题化为一次因式的判断。',
      blocks: [
        text('若 $ax^2+bx+c=a(x-x_1)(x-x_2)$，则方程的根就是 $x_1,x_2$。'),
        formula('AB=0\\iff A=0\\text{ 或 }B=0'),
        text('十字相乘、提公因式和平方差公式是常见分解工具。分解后应检查两个因式的乘积是否还原原式。')
      ]
    },
    {
      id: 'quad-4',
      title: '判别式',
      summary: '用判别式判断实根个数。',
      blocks: [
        formula('\\Delta=b^2-4ac'),
        text('$\\Delta>0$ 有两个不同实根；$\\Delta=0$ 有两个相等实根；$\\Delta<0$ 没有实根。'),
        warn('判别式只判断实根', '没有实根不代表方程无解，在复数范围内它仍有两个共轭复根。')
      ]
    },
    {
      id: 'quad-5',
      title: '求根公式与韦达定理',
      summary: '不分解也能求根，并建立根与系数的关系。',
      blocks: [
        formula('x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}'),
        formula('x_1+x_2=-\\frac ba,\\qquad x_1x_2=\\frac ca'),
        text('韦达定理适用于有实根或复根的一元二次方程，常用于求两根之和、两根之积。'),
        tip('先化标准式', '使用韦达定理前，把方程整理成 $ax^2+bx+c=0$，并确认二次项系数不为零。')
      ]
    },
    {
      id: 'quad-6',
      title: '二次不等式的解集',
      summary: '借助抛物线图象确定满足不等式的范围。',
      blocks: [
        text('解 $ax^2+bx+c>0$ 时，先求对应方程的两个根，再根据抛物线开口方向选出图象在 $x$ 轴上方的区间。'),
        text('“两根之间”还是“两根之外”由开口方向和不等号决定。也可以整理成 $(x-x_1)(x-x_2)$ 后画符号表。'),
        formula('a>0,\\ ax^2+bx+c<0 \\iff x_1<x<x_2', '（当有两根 $x_1<x_2$ 时）')
      ]
    },
    {
      id: 'quad-7',
      title: '恒成立与判别式',
      summary: '把“总成立”转化为最大值、最小值或判别式条件。',
      blocks: [
        text('二次函数 $f(x)=ax^2+bx+c$ 对任意实数恒正，需要 $a>0$ 且 $\\Delta<0$。'),
        text('若定义域不是全体实数，应先求区间端点与顶点处的函数值，不能机械套用判别式。'),
        tip('区间问题看顶点', '当对称轴落在给定区间内时，最值通常在顶点取得；否则在区间端点取得。')
      ]
    },
    {
      id: 'quad-8',
      title: '分式与绝对值不等式',
      summary: '通过移项、通分和分段讨论保持等价性。',
      blocks: [
        text('解分式不等式通常先移项通分，使一侧为 $0$，再用符号表判断。不能直接乘含未知数的分母。'),
        formula('|x|<a\\iff -a<x<a\\quad(a>0)'),
        formula('|x|>a\\iff x<-a\\text{ 或 }x>a\\quad(a>0)'),
        warn('分母不能为零', '分式不等式写成解集时，要排除使分母为零的值。')
      ]
    }
  ],
  examples: [
    {
      id: 'quad-example-1',
      title: '例题 1 · 求二次函数最值',
      prompt: '求函数 $f(x)=x^2-4x+1$ 的最小值。',
      hint: '配方或直接使用顶点横坐标公式。',
      steps: [
        { title: '定位顶点横坐标', content: '$x=-\\dfrac{b}{2a}=-\\dfrac{-4}{2}=2$。' },
        { title: '求函数值', content: '$f(2)=2^2-4\\times2+1=-3$。' },
        { title: '判断极值', content: '因为 $a=1>0$，所以顶点给出最小值。' }
      ],
      answer: '最小值为 $-3$'
    },
    {
      id: 'quad-example-2',
      title: '例题 2 · 解二次不等式',
      prompt: '解不等式 $x^2-x-6<0$。',
      hint: '先分解因式，再画开口向上的抛物线。',
      steps: [
        { title: '分解', content: '$x^2-x-6=(x-3)(x+2)$。' },
        { title: '找零点', content: '对应方程的根为 $-2$ 和 $3$。' },
        { title: '读图象区间', content: '开口向上的抛物线在两根之间位于 $x$ 轴下方。' }
      ],
      answer: '$-2<x<3$'
    }
  ],
  questions: questionsFor('quadratic-inequality', [
    {
      id: 'quad-q1',
      topic: '因式分解',
      type: 'single',
      difficulty: 1,
      prompt: '多项式 $x^2-5x+6$ 分解因式的结果是：',
      options: [
        { id: 'A', text: '$(x-1)(x-6)$' },
        { id: 'B', text: '$(x-2)(x-3)$' },
        { id: 'C', text: '$(x+2)(x+3)$' },
        { id: 'D', text: '$(x-2)(x+3)$' }
      ],
      answer: ['B'],
      hint: '寻找和为 $-5$、积为 $6$ 的两个数。',
      steps: ['$-2$ 与 $-3$ 的和为 $-5$，积为 $6$。', '所以原式为 $(x-2)(x-3)$。']
    },
    {
      id: 'quad-q2',
      topic: '判别式',
      type: 'single',
      difficulty: 1,
      prompt: '方程 $x^2-2x+1=0$ 的实根个数是：',
      options: [
        { id: 'A', text: '0 个' },
        { id: 'B', text: '1 个' },
        { id: 'C', text: '2 个' },
        { id: 'D', text: '无法确定' }
      ],
      answer: ['B'],
      hint: '计算 $\\Delta=b^2-4ac$。',
      steps: ['$\\Delta=(-2)^2-4\\times1\\times1=0$。', '方程有两个相等实根，作为不同实根个数为 $1$ 个。']
    },
    {
      id: 'quad-q3',
      topic: '顶点',
      type: 'single',
      difficulty: 1,
      prompt: '二次函数 $y=(x-2)^2+3$ 的顶点坐标是：',
      options: [
        { id: 'A', text: '$(-2,3)$' },
        { id: 'B', text: '$(2,-3)$' },
        { id: 'C', text: '$(2,3)$' },
        { id: 'D', text: '$(3,2)$' }
      ],
      answer: ['C'],
      hint: '顶点式中 $y=a(x-h)^2+k$ 的顶点是 $(h,k)$。',
      steps: ['题中 $h=2$，$k=3$。', '所以顶点为 $(2,3)$。']
    },
    {
      id: 'quad-q4',
      topic: '韦达定理',
      type: 'single',
      difficulty: 2,
      prompt: '若 $x_1,x_2$ 是方程 $2x^2-3x-5=0$ 的两根，则 $x_1+x_2$ 等于：',
      options: [
        { id: 'A', text: '$-\\frac32$' },
        { id: 'B', text: '$\\frac32$' },
        { id: 'C', text: '$\\frac52$' },
        { id: 'D', text: '$-\\frac52$' }
      ],
      answer: ['B'],
      hint: '两根之和等于 $-b/a$。',
      steps: ['这里 $a=2$，$b=-3$。', '$x_1+x_2=-\\dfrac{-3}{2}=\\dfrac32$。']
    },
    {
      id: 'quad-q5',
      topic: '二次不等式',
      type: 'single',
      difficulty: 2,
      prompt: '不等式 $(x-1)(x+3)>0$ 的解集是：',
      options: [
        { id: 'A', text: '$(-3,1)$' },
        { id: 'B', text: '$(-\\infty,-3)\\cup(1,+\\infty)$' },
        { id: 'C', text: '$(-\\infty,-3]$' },
        { id: 'D', text: '$[1,+\\infty)$' }
      ],
      answer: ['B'],
      hint: '开口向上的抛物线在两根之外位于 $x$ 轴上方。',
      steps: ['两个零点是 $-3$ 和 $1$。', '乘积大于 $0$ 的区间在两根之外。', '所以解集为 $(-\\infty,-3)\\cup(1,+\\infty)$。']
    },
    {
      id: 'quad-q6',
      topic: '恒成立',
      type: 'single',
      difficulty: 3,
      prompt: '若函数 $f(x)=kx^2+2x+1$ 对任意实数 $x$ 都为正数，则 $k$ 的取值范围是：',
      options: [
        { id: 'A', text: '$k>1$' },
        { id: 'B', text: '$k\\ge1$' },
        { id: 'C', text: '$0<k<1$' },
        { id: 'D', text: '$k<1$' }
      ],
      answer: ['A'],
      hint: '恒正的二次函数需要开口向上且与 $x$ 轴无交点。',
      steps: ['需要 $k>0$ 且 $\\Delta=4-4k<0$。', '$4-4k<0$ 得 $k>1$。', '该范围也满足 $k>0$。']
    },
    {
      id: 'quad-q7',
      topic: '绝对值',
      type: 'single',
      difficulty: 1,
      prompt: '不等式 $|x-2|<3$ 的解集是：',
      options: [
        { id: 'A', text: '$-1<x<5$' },
        { id: 'B', text: '$x<5$' },
        { id: 'C', text: '$-5<x<1$' },
        { id: 'D', text: '$x>-1$' }
      ],
      answer: ['A'],
      hint: '$|X|<a$ 等价于 $-a<X<a$。',
      steps: ['$-3<x-2<3$。', '三边同时加 $2$，得 $-1<x<5$。']
    },
    {
      id: 'quad-q8',
      topic: '二次函数性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于函数 $f(x)=x^2-2x$，下列说法正确的是：',
      options: [
        { id: 'A', text: '对称轴为 $x=1$' },
        { id: 'B', text: '顶点为 $(1,-1)$' },
        { id: 'C', text: '在 $(-\\infty,1)$ 上单调递减' },
        { id: 'D', text: '最小值为 $0$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '配方为 $f(x)=(x-1)^2-1$。',
      steps: ['配方得 $f(x)=(x-1)^2-1$。', '对称轴 $x=1$，顶点 $(1,-1)$，最小值为 $-1$。', '开口向上的抛物线在对称轴左侧递减。']
    },
    {
      id: 'quad-q9',
      topic: '不等式性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '若 $a>b$，则下列不等式一定成立的是：',
      options: [
        { id: 'A', text: '$a+1>b+1$' },
        { id: 'B', text: '$3a>3b$' },
        { id: 'C', text: '$a-b>0$' },
        { id: 'D', text: '$a^2>b^2$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '前三个可以按不等式性质判断，最后一个考虑负数。',
      steps: ['两边同加、同乘正数都不改变不等号，所以 A、B 正确。', '移项可得 $a-b>0$，C 正确。', '取 $a=-1,b=-2$，则 $a>b$ 但 $a^2<b^2$，D 不成立。']
    },
    {
      id: 'quad-q10',
      topic: '最值',
      type: 'numeric',
      difficulty: 2,
      prompt: '函数 $f(x)=x^2+6x+5$ 的最小值为多少？',
      answer: ['-4'],
      tolerance: 1e-6,
      hint: '先求顶点横坐标 $x=-b/(2a)$。',
      steps: ['顶点横坐标为 $x=-6/2=-3$。', '$f(-3)=9-18+5=-4$。']
    }
  ])
}
