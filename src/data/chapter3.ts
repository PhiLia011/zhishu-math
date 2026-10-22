import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter3: Chapter = {
  id: 'functions',
  order: 3,
  title: '函数的概念与性质',
  shortTitle: '函数',
  description: '理解函数作为对应关系，并从定义域、单调性、奇偶性和图象认识函数。',
  color: '#477f76',
  icon: '函数',
  cards: [
    {
      id: 'func-1',
      title: '函数的概念',
      summary: '理解定义域、对应关系和函数值。',
      blocks: [
        text('设两个非空实数集 $A,B$，若按照某种对应关系，对 $A$ 中每一个 $x$，都有唯一的 $y\\in B$ 与之对应，则这个对应关系叫做函数。'),
        formula('f:A\\to B,\\qquad y=f(x)'),
        text('判断两个函数是否相同，要看定义域和对应关系是否都相同，与自变量使用的字母无关。')
      ]
    },
    {
      id: 'func-2',
      title: '定义域',
      summary: '从表达式中的限制条件求出有效输入范围。',
      blocks: [
        text('分式的分母不能为零；偶次根式的被开方数必须非负；对数的真数必须为正。'),
        formula('f(x)=\\frac1{\\sqrt{x-1}}\\Rightarrow x>1'),
        warn('先看表达式，再化简', '有些表达式化简后看似限制消失，例如 $\\\\dfrac{x^2-1}{x-1}=x+1$，原函数的定义域仍不含 $x=1$。')
      ]
    },
    {
      id: 'func-3',
      title: '值域',
      summary: '研究所有可能的函数输出组成的集合。',
      blocks: [
        text('值域是所有函数值的集合。求值域可从定义域出发，结合单调性、顶点或换元来分析。'),
        formula('\\operatorname{Range}(f)=\\{f(x)\\mid x\\in D\\}'),
        tip('先定义域后值域', '换元后别忘了新变量的取值范围，否则可能得到多余的输出值。')
      ]
    },
    {
      id: 'func-4',
      title: '函数的表示与图象',
      summary: '解析式、表格和图象从不同角度描述同一函数。',
      blocks: [
        text('解析式便于计算，表格便于观察离散数据，图象直观呈现变化趋势。判断点 $(a,b)$ 是否在图象上，只需检查 $f(a)=b$。'),
        text('画函数图象时，先确定定义域，再选取关键点、零点、极值点及端点，最后连线。')
      ],
      interaction: 'function'
    },
    {
      id: 'func-5',
      title: '单调性',
      summary: '用自变量大小比较函数值大小。',
      blocks: [
        text('在区间 $I$ 上，若对任意 $x_1<x_2$ 都有 $f(x_1)<f(x_2)$，则函数在 $I$ 上单调递增；若都有 $f(x_1)>f(x_2)$，则单调递减。'),
        formula('x_1<x_2\\Rightarrow f(x_1)<f(x_2)', '单调递增的定义'),
        tip('单调性是区间性质', '一个函数可以在一个区间递增、另一个区间递减，不能脱离区间直接说“函数单调递增”。')
      ]
    },
    {
      id: 'func-6',
      title: '奇偶性',
      summary: '利用对称性识别函数性质。',
      blocks: [
        text('函数定义域必须关于原点对称，才可能讨论奇偶性。若 $f(-x)=f(x)$，则为偶函数；若 $f(-x)=-f(x)$，则为奇函数。'),
        formula('f(-x)=f(x)\\quad\\text{或}\\quad f(-x)=-f(x)'),
        text('偶函数图象关于 $y$ 轴对称，奇函数图象关于原点中心对称。')
      ]
    },
    {
      id: 'func-7',
      title: '图象变换',
      summary: '平移、伸缩与对称之间的关系。',
      blocks: [
        text('$y=f(x-h)$ 把图象向右平移 $h$ 个单位，$y=f(x)+k$ 把图象向上平移 $k$ 个单位；$k<0$ 时方向相反。'),
        formula('y=-f(x)', '图象关于 $x$ 轴翻折'),
        formula('y=f(-x)', '图象关于 $y$ 轴翻折'),
        tip('左加右减', '横向变换作用于自变量本身，因此 $f(2x)$ 的横向压缩倍数是 $1/2$。')
      ]
    },
    {
      id: 'func-8',
      title: '分段函数',
      summary: '在不同区间使用不同解析式时按输入值分类计算。',
      blocks: [
        text('分段函数仍是一个函数。求值时先判断自变量落在哪个区间，再代入相应表达式。'),
        formula('f(x)=\\begin{cases}x+1,&x<0\\\\x^2,&x\\ge0\\end{cases}'),
        warn('边界只归入一个分支', '写分段函数时要检查分界点被哪个分支包含，避免重复或遗漏。')
      ]
    }
  ],
  examples: [
    {
      id: 'func-example-1',
      title: '例题 1 · 由解析式求值',
      prompt: '已知 $f(x)=2x^2-3$，求 $f(2)$ 与 $f(-1)$。',
      hint: '把括号内的数整体代入 $x$。',
      steps: [
        { title: '计算 $f(2)$', content: '$f(2)=2\\times2^2-3=8-3=5$。' },
        { title: '计算 $f(-1)$', content: '$f(-1)=2\\times(-1)^2-3=2-3=-1$。' }
      ],
      answer: '$f(2)=5$，$f(-1)=-1$'
    },
    {
      id: 'func-example-2',
      title: '例题 2 · 判断奇偶性',
      prompt: '判断 $f(x)=x^3+x$ 的奇偶性。',
      hint: '先检查定义域，再比较 $f(-x)$ 与 $f(x)$。',
      steps: [
        { title: '检查定义域', content: '定义域为 $\\mathbf{R}$，关于原点对称。' },
        { title: '计算 $f(-x)$', content: '$f(-x)=(-x)^3+(-x)=-x^3-x$。' },
        { title: '比较', content: '$f(-x)=-f(x)$，所以它是奇函数。' }
      ],
      answer: '奇函数'
    }
  ],
  questions: questionsFor('functions', [
    {
      id: 'func-q1',
      topic: '函数值',
      type: 'single',
      difficulty: 1,
      prompt: '若 $f(x)=x^2+1$，则 $f(-2)$ 等于：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '5' },
        { id: 'C', text: '-3' },
        { id: 'D', text: '-5' }
      ],
      answer: ['B'],
      hint: '偶次方会消去负号。',
      steps: ['$f(-2)=(-2)^2+1$。', '$=4+1=5$。']
    },
    {
      id: 'func-q2',
      topic: '定义域',
      type: 'single',
      difficulty: 1,
      prompt: '函数 $f(x)=\\frac{1}{x-3}$ 的定义域是：',
      options: [
        { id: 'A', text: '$\\mathbf{R}$' },
        { id: 'B', text: '$\\{x\\mid x\\ne3\\}$' },
        { id: 'C', text: '$\\{x\\mid x>3\\}$' },
        { id: 'D', text: '$\\{x\\mid x<3\\}$' }
      ],
      answer: ['B'],
      hint: '分母不能为零。',
      steps: ['分母 $x-3\\ne0$。', '所以 $x\\ne3$。']
    },
    {
      id: 'func-q3',
      topic: '单调性',
      type: 'single',
      difficulty: 1,
      prompt: '函数 $f(x)=-2x+1$ 在整个实数集上是：',
      options: [
        { id: 'A', text: '增函数' },
        { id: 'B', text: '减函数' },
        { id: 'C', text: '先增后减' },
        { id: 'D', text: '不具单调性' }
      ],
      answer: ['B'],
      hint: '一次函数 $y=kx+b$ 的单调性由 $k$ 的符号决定。',
      steps: ['斜率 $k=-2<0$。', '当 $x_1<x_2$ 时，$-2x_1>-2x_2$，所以函数值随 $x$ 增大而减小。']
    },
    {
      id: 'func-q4',
      topic: '奇偶性',
      type: 'single',
      difficulty: 2,
      prompt: '下列函数中是偶函数的是：',
      options: [
        { id: 'A', text: '$y=x^3$' },
        { id: 'B', text: '$y=x^2+1$' },
        { id: 'C', text: '$y=x+1$' },
        { id: 'D', text: '$y=2x$' }
      ],
      answer: ['B'],
      hint: '偶函数满足 $f(-x)=f(x)$。',
      steps: ['对 $f(x)=x^2+1$，有 $f(-x)=(-x)^2+1=x^2+1=f(x)$。', '因此选择 B。']
    },
    {
      id: 'func-q5',
      topic: '分段函数',
      type: 'single',
      difficulty: 2,
      prompt: '若 $f(x)=\\begin{cases}x+1,&x<0\\\\x^2,&x\\ge0\\end{cases}$，则 $f(-2)+f(2)$ 等于：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '6' }
      ],
      answer: ['A'],
      hint: '分别选择自变量所在的分支。',
      steps: ['$-2<0$，所以 $f(-2)=-2+1=-1$。', '$2\\ge0$，所以 $f(2)=2^2=4$。', '两者之和为 $3$。']
    },
    {
      id: 'func-q6',
      topic: '值域',
      type: 'single',
      difficulty: 2,
      prompt: '函数 $f(x)=x^2+2$ 的值域是：',
      options: [
        { id: 'A', text: '$[2,+\\infty)$' },
        { id: 'B', text: '$(2,+\\infty)$' },
        { id: 'C', text: '$[0,+\\infty)$' },
        { id: 'D', text: '$\\mathbf{R}$' }
      ],
      answer: ['A'],
      hint: '$x^2\\ge0$。',
      steps: ['对任意实数 $x$，$x^2\\ge0$。', '所以 $x^2+2\\ge2$，且 $x=0$ 时等号成立。']
    },
    {
      id: 'func-q7',
      topic: '图象变换',
      type: 'single',
      difficulty: 2,
      prompt: '把 $y=f(x)$ 的图象向右平移 $2$ 个单位，所得图象对应的函数是：',
      options: [
        { id: 'A', text: '$y=f(x)+2$' },
        { id: 'B', text: '$y=f(x)-2$' },
        { id: 'C', text: '$y=f(x-2)$' },
        { id: 'D', text: '$y=f(x+2)$' }
      ],
      answer: ['C'],
      hint: '横向平移口诀：左加右减。',
      steps: ['向右平移 $2$ 个单位，把 $x$ 替换为 $x-2$。', '所以新函数为 $y=f(x-2)$。']
    },
    {
      id: 'func-q8',
      topic: '函数概念',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于函数与图象，下列说法正确的是：',
      options: [
        { id: 'A', text: '函数的定义域是自变量所有允许取值的集合' },
        { id: 'B', text: '若 $f(2)=3$，则点 $(2,3)$ 在函数图象上' },
        { id: 'C', text: '两个函数只要解析式化简后相同，就一定表示同一个函数' },
        { id: 'D', text: '函数图象中，一个 $x$ 值最多对应一个 $y$ 值' }
      ],
      answer: ['A', 'B', 'D'],
      hint: '判断函数相同还要检查定义域。',
      steps: ['A、B、D 都是函数定义与图象的基本结论。', '解析式化简后相同不一定定义域相同，所以 C 错误。']
    },
    {
      id: 'func-q9',
      topic: '单调性',
      type: 'multiple',
      difficulty: 3,
      prompt: '函数 $f(x)=x^2-4x+3$ 的下列说法正确的是：',
      options: [
        { id: 'A', text: '图象开口向上' },
        { id: 'B', text: '在 $(2,+\\infty)$ 上单调递增' },
        { id: 'C', text: '最小值为 $-1$' },
        { id: 'D', text: '对称轴为 $x=-2$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '配方为 $(x-2)^2-1$。',
      steps: ['配方得 $f(x)=(x-2)^2-1$，开口向上，对称轴 $x=2$，最小值 $-1$。', '对称轴右侧函数递增。', '因此 A、B、C 正确，D 错误。']
    },
    {
      id: 'func-q10',
      topic: '函数值',
      type: 'numeric',
      difficulty: 1,
      prompt: '若 $f(x)=3x-2$，则 $f(4)$ 等于多少？',
      answer: ['10'],
      tolerance: 0,
      hint: '用 $4$ 替换解析中的 $x$。',
      steps: ['$f(4)=3\\times4-2$。', '$=12-2=10$。']
    }
  ])
}
