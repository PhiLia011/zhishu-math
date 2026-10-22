import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter9: Chapter = {
  id: 'statistics-probability',
  order: 9,
  title: '统计与概率',
  shortTitle: '统计概率',
  description: '用样本理解总体，用频率估计概率，并从数据中提取稳定而有用的信息。',
  color: '#4c8998',
  icon: '统计',
  cards: [
    {
      id: 'stat-1',
      title: '抽样方法',
      summary: '理解总体、样本和代表性。',
      blocks: [
        text('从总体中抽取一部分个体作为样本，用样本信息估计总体。样本应尽量具有代表性。'),
        text('简单随机抽样要求每个个体被抽到的机会相同；系统抽样和分层抽样适合具有明显顺序或层级差异的总体。'),
        tip('先定义总体', '调查目标不同，同一个群体的总体定义可能不同。')
      ]
    },
    {
      id: 'stat-2',
      title: '频率分布',
      summary: '用分组和频率描述数据分布。',
      blocks: [
        formula('\\text{频率}=\\frac{\\text{频数}}{\\text{样本容量}}'),
        text('制作频率分布表需要确定组距、分组和频数。各组频率之和为 $1$。'),
        text('频率分布直方图中，小矩形面积表示频率，且所有小矩形面积之和近似为 $1$。')
      ]
    },
    {
      id: 'stat-3',
      title: '平均数',
      summary: '用集中趋势概括一组数据的中心位置。',
      blocks: [
        formula('\\bar x=\\frac{x_1+x_2+\\cdots+x_n}{n}'),
        text('平均数利用了全部数据，但对极端值较敏感。'),
        text('在频率分布表中，可用组中值近似每组数据，再按频率加权计算平均数。')
      ]
    },
    {
      id: 'stat-4',
      title: '中位数与众数',
      summary: '用位置和出现次数描述典型水平。',
      blocks: [
        text('把数据从小到大排列，处在中间位置的数是中位数；偶数个数据时取中间两个数的平均数。'),
        text('出现次数最多的数据叫做众数。一组数据可能没有众数，也可能有多个众数。'),
        warn('先排序再找中位数', '未排序的数据不能直接取中间位置的数。')
      ]
    },
    {
      id: 'stat-5',
      title: '方差与标准差',
      summary: '衡量数据相对平均数的离散程度。',
      blocks: [
        formula('s^2=\\frac1n\\sum_{i=1}^n(x_i-\\bar x)^2'),
        formula('s=\\sqrt{s^2}'),
        text('方差和标准差越大，数据波动越明显。平均数相同的两组数据，离散程度可能不同。'),
        tip('单位', '方差的单位是原数据单位的平方，标准差的单位与原数据相同。')
      ]
    },
    {
      id: 'stat-6',
      title: '随机事件与样本空间',
      summary: '把一次试验的所有可能结果列成集合。',
      blocks: [
        text('随机试验所有可能结果组成的集合叫做样本空间。样本空间的元素叫做样本点。'),
        text('事件是样本空间的子集。必然事件对应整个样本空间，不可能事件对应空集。'),
        tip('列出所有结果', '硬币连续抛两次时，$(正,反)$ 与 $(反,正)$ 是两个不同结果。')
      ]
    },
    {
      id: 'stat-7',
      title: '古典概型',
      summary: '用等可能的基本事件计算概率。',
      blocks: [
        text('若样本空间有限，且每个基本事件发生的可能性相等，则可以用有利结果数除以全部结果数。'),
        formula('P(A)=\\frac{\\text{事件 }A\\text{ 包含的基本事件数}}{\\text{基本事件总数}}'),
        text('使用公式前必须确认“等可能”，不能直接把事件数量当成概率。')
      ]
    },
    {
      id: 'stat-8',
      title: '概率的基本性质',
      summary: '用互斥与对立关系简化计算。',
      blocks: [
        text('互斥事件不能同时发生；对立事件不仅互斥，而且必有一个发生。'),
        formula('P(\\bar A)=1-P(A)'),
        formula('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)'),
        tip('正面想不通时用补集', '“至少一个”的问题常可先算一个也没有的概率，再用 $1$ 减去。')
      ]
    }
  ],
  examples: [
    {
      id: 'stat-example-1',
      title: '例题 1 · 平均数与中位数',
      prompt: '求数据 $2,4,6,8$ 的平均数和中位数。',
      hint: '平均数先求和再除以个数；中位数取中间两个数的平均值。',
      steps: [
        { title: '求平均数', content: '$(2+4+6+8)/4=20/4=5$。' },
        { title: '找中位数', content: '中间两个数是 $4,6$，平均数为 $(4+6)/2=5$。' }
      ],
      answer: '平均数与中位数都为 $5$'
    },
    {
      id: 'stat-example-2',
      title: '例题 2 · 古典概型',
      prompt: '掷一枚公平骰子，求掷出偶数的概率。',
      hint: '样本空间有 6 个等可能结果，偶数结果有几个？',
      steps: [
        { title: '列样本空间', content: '$\\{1,2,3,4,5,6\\}$，共 $6$ 个基本事件。' },
        { title: '数有利结果', content: '偶数有 $2,4,6$，共 $3$ 个。' },
        { title: '计算概率', content: '$P=3/6=1/2$。' }
      ],
      answer: '$\\frac12$'
    }
  ],
  questions: questionsFor('statistics-probability', [
    {
      id: 'stat-q1',
      topic: '平均数',
      type: 'single',
      difficulty: 1,
      prompt: '数据 $2,4,6,8$ 的平均数是：',
      options: [
        { id: 'A', text: '4' },
        { id: 'B', text: '5' },
        { id: 'C', text: '6' },
        { id: 'D', text: '8' }
      ],
      answer: ['B'],
      hint: '先求总和，再除以数据个数。',
      steps: ['总和为 $2+4+6+8=20$。', '平均数为 $20/4=5$。']
    },
    {
      id: 'stat-q2',
      topic: '众数',
      type: 'single',
      difficulty: 1,
      prompt: '数据 $2,3,3,4,5$ 的众数是：',
      options: [
        { id: 'A', text: '2' },
        { id: 'B', text: '3' },
        { id: 'C', text: '4' },
        { id: 'D', text: '5' }
      ],
      answer: ['B'],
      hint: '数一数每个数出现了几次。',
      steps: ['数字 $3$ 出现了两次，其余数字都只出现一次。', '所以众数是 $3$。']
    },
    {
      id: 'stat-q3',
      topic: '中位数',
      type: 'single',
      difficulty: 1,
      prompt: '数据 $1,3,5,7$ 的中位数是：',
      options: [
        { id: 'A', text: '3' },
        { id: 'B', text: '4' },
        { id: 'C', text: '5' },
        { id: 'D', text: '6' }
      ],
      answer: ['B'],
      hint: '偶数个数据取中间两个数的平均数。',
      steps: ['中间两个数是 $3,5$。', '中位数为 $(3+5)/2=4$。']
    },
    {
      id: 'stat-q4',
      topic: '概率',
      type: 'single',
      difficulty: 1,
      prompt: '掷一枚公平骰子，出现偶数的概率是：',
      options: [
        { id: 'A', text: '$\\frac16$' },
        { id: 'B', text: '$\\frac13$' },
        { id: 'C', text: '$\\frac12$' },
        { id: 'D', text: '$\\frac23$' }
      ],
      answer: ['C'],
      hint: '偶数结果有 $2,4,6$ 三个。',
      steps: ['基本事件总数为 $6$。', '有利结果数为 $3$，所以概率为 $3/6=1/2$。']
    },
    {
      id: 'stat-q5',
      topic: '样本空间',
      type: 'single',
      difficulty: 1,
      prompt: '连续抛掷两次硬币，样本空间中的基本事件共有多少个？',
      options: [
        { id: 'A', text: '2 个' },
        { id: 'B', text: '3 个' },
        { id: 'C', text: '4 个' },
        { id: 'D', text: '8 个' }
      ],
      answer: ['C'],
      hint: '第一次有两种结果，第二次也有两种结果。',
      steps: ['基本事件为 $(正,正),(正,反),(反,正),(反,反)$。', '共有 $2\\times2=4$ 个。']
    },
    {
      id: 'stat-q6',
      topic: '抽样',
      type: 'single',
      difficulty: 2,
      prompt: '为了了解全校学生的睡眠时间，从每个年级按人数比例抽取学生，最合适的抽样方法是：',
      options: [
        { id: 'A', text: '只抽取高三学生' },
        { id: 'B', text: '分层抽样' },
        { id: 'C', text: '只抽取男生' },
        { id: 'D', text: '只抽取住校生' }
      ],
      answer: ['B'],
      hint: '不同年级学生的作息可能差异明显。',
      steps: ['年级是总体中明显的层级，并且不同年级比例不同。', '按年级分层并按比例抽样，可使样本更有代表性。']
    },
    {
      id: 'stat-q7',
      topic: '方差',
      type: 'single',
      difficulty: 2,
      prompt: '数据 $1,3,5$ 的方差是：',
      options: [
        { id: 'A', text: '$\\frac83$' },
        { id: 'B', text: '2' },
        { id: 'C', text: '4' },
        { id: 'D', text: '8' }
      ],
      answer: ['A'],
      hint: '先求平均数 $3$，再求各偏差平方的平均值。',
      steps: ['平均数为 $3$。', '偏差平方为 $4,0,4$。', '方差为 $(4+0+4)/3=8/3$。']
    },
    {
      id: 'stat-q8',
      topic: '统计量',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于统计量，下列说法正确的是：',
      options: [
        { id: 'A', text: '平均数会利用全部数据' },
        { id: 'B', text: '中位数受极端值影响通常较小' },
        { id: 'C', text: '方差越大，数据波动越大' },
        { id: 'D', text: '一组数据一定只有一个众数' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '众数是否可能不唯一？',
      steps: ['平均数综合全部数值，A 正确。', '中位数主要由位置决定，对极端值较稳健，B 正确。', '方差衡量离散程度，C 正确。', '众数可能有多个，也可能没有，D 错误。']
    },
    {
      id: 'stat-q9',
      topic: '概率性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于事件与概率，下列说法正确的是：',
      options: [
        { id: 'A', text: '必然事件的概率为 1' },
        { id: 'B', text: '不可能事件的概率为 0' },
        { id: 'C', text: '若 $A$ 与 $B$ 互斥，则 $P(A\\cup B)=P(A)+P(B)$' },
        { id: 'D', text: '任意事件的概率都可以大于 1' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '概率总在 $0$ 与 $1$ 之间。',
      steps: ['A、B 是基本性质。', '互斥事件没有交集，因此并事件概率可直接相加。', '概率不可能大于 $1$，D 错误。']
    },
    {
      id: 'stat-q10',
      topic: '古典概型',
      type: 'numeric',
      difficulty: 1,
      prompt: '袋中有 $3$ 个红球和 $2$ 个蓝球，随机摸出一个球，摸到红球的概率是多少？请填小数。',
      answer: ['0.6'],
      tolerance: 0.000001,
      hint: '用红球数除以球的总数。',
      steps: ['球的总数为 $3+2=5$。', '红球概率为 $3/5=0.6$。']
    }
  ])
}
