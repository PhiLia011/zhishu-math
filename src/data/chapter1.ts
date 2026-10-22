import type { Chapter } from '../types'
import { formula, questionsFor, text, tip, warn } from './helpers'

export const chapter1: Chapter = {
  id: 'sets-logic',
  order: 1,
  title: '集合与常用逻辑用语',
  shortTitle: '集合与逻辑',
  description: '用精确的语言描述对象，理解集合关系、集合运算与条件之间的逻辑联系。',
  color: '#d7654b',
  icon: '集合',
  cards: [
    {
      id: 'sets-1',
      title: '集合与元素',
      summary: '认识集合、元素以及常见的数集符号。',
      blocks: [
        text('把一些确定的、彼此不同的对象看成一个整体，就形成了一个集合。集合中的每个对象叫做元素。'),
        formula('a\\in A \\quad\\text{或}\\quad a\\notin A', '元素与集合的关系'),
        text('常用数集：自然数集 $\\mathbf{N}$、正整数集 $\\mathbf{N}^*$、整数集 $\\mathbf{Z}$、有理数集 $\\mathbf{Q}$、实数集 $\\mathbf{R}$。'),
        tip('判断集合的两个要点', '研究对象必须“确定”，且同一元素在集合中只出现一次。元素的排列顺序不影响集合。')
      ]
    },
    {
      id: 'sets-2',
      title: '集合的表示方法',
      summary: '会用列举法和描述法表达一个集合。',
      blocks: [
        text('列举法把元素逐一写出，如 $\\{1,2,3\\}$；描述法说明元素满足的共同特征，如 $\\{x\\mid x>2\\}$。'),
        formula('A=\\{x\\in\\mathbf{Z}\\mid -1<x<3\\}=\\{0,1,2\\}'),
        text('使用描述法时，要先写清代表元素，再写条件。只写条件而不写代表元素，会使集合含义不明确。'),
        warn('不要省略代表元素', '$\\\\{x\\mid x>2\\\\}$ 表示满足条件的实数，而 $\\\\{y\\mid y>2\\\\}$ 中字母只是变量名。')
      ]
    },
    {
      id: 'sets-3',
      title: '子集与真子集',
      summary: '判断两个集合之间是否存在包含关系。',
      blocks: [
        text('如果集合 $A$ 的每一个元素都属于集合 $B$，就说 $A$ 是 $B$ 的子集，记作 $A\\subseteq B$。'),
        formula('A\\subseteq B \\iff (x\\in A\\Rightarrow x\\in B)'),
        text('若 $A\\subseteq B$ 且 $B$ 中存在不属于 $A$ 的元素，则 $A$ 是 $B$ 的真子集，记作 $A\\subsetneq B$。'),
        tip('空集', '空集是任何集合的子集，也是任何非空集合的真子集。')
      ]
    },
    {
      id: 'sets-4',
      title: '子集个数',
      summary: '由元素个数快速计算子集与真子集数量。',
      blocks: [
        text('含有 $n$ 个元素的集合，每个元素都有“选”与“不选”两种可能，因此共有 $2^n$ 个子集。'),
        formula('\\text{非空子集数}=2^n-1,\\qquad \\text{非空真子集数}=2^n-2'),
        text('当题目只问“真子集”时，要去掉集合自身；若同时要求非空，还要再去掉空集。'),
        tip('先数元素再套公式', '重复元素在集合中只算一次，例如 $\\\\{1,1,2\\\\}$ 只有两个不同元素。')
      ]
    },
    {
      id: 'sets-5',
      title: '交集与并集',
      summary: '用公共元素和全部元素描述两个集合的组合。',
      blocks: [
        formula('A\\cap B=\\{x\\mid x\\in A\\text{ 且 }x\\in B\\}'),
        formula('A\\cup B=\\{x\\mid x\\in A\\text{ 或 }x\\in B\\}'),
        text('交集强调“同时属于”，并集强调“至少属于其中一个”。求含连续范围的集合时，可借助数轴检查公共部分。')
      ],
      interaction: 'venn'
    },
    {
      id: 'sets-6',
      title: '全集与补集',
      summary: '在给定研究范围内考虑“不属于某集合”的元素。',
      blocks: [
        text('若 $U$ 是全集，$A\\subseteq U$，则 $A$ 在 $U$ 中的补集由所有属于 $U$ 但不属于 $A$ 的元素组成。'),
        formula('\\complement_U A=\\{x\\mid x\\in U,\\ x\\notin A\\}'),
        text('补集必须依赖全集。脱离全集讨论补集，答案可能不唯一。'),
        tip('双重补集', '$\\\\complement_U(\\\\complement_U A)=A$。')
      ]
    },
    {
      id: 'sets-7',
      title: '充分条件与必要条件',
      summary: '从推出关系判断条件的角色。',
      blocks: [
        text('若“$p$ 成立”一定能推出“$q$ 成立”，记作 $p\\Rightarrow q$，则 $p$ 是 $q$ 的充分条件，$q$ 是 $p$ 的必要条件。'),
        formula('p\\Rightarrow q: \\quad p\\text{ 充分，}q\\text{ 必要}'),
        text('若同时有 $p\\Rightarrow q$ 和 $q\\Rightarrow p$，则 $p,q$ 互为充要条件，记作 $p\\iff q$。'),
        warn('方向不要反', '“下雨”能推出“地面可能湿”，所以下雨是地面湿的充分条件；但湿的地面不一定刚下过雨。')
      ]
    },
    {
      id: 'sets-8',
      title: '集合语言与数形结合',
      summary: '把自然语言转化为集合关系并借助数轴求解。',
      blocks: [
        text('“同时满足”通常对应交集，“至少满足一个”通常对应并集，“不满足”通常对应补集。'),
        text('处理实数范围时，先把每个集合画在数轴上，再确定端点是否包含；最后用集合或区间表示结果。'),
        tip('端点检查', '求交集和补集后，逐个检查被标记为端点的数是否真的属于结果。')
      ]
    }
  ],
  examples: [
    {
      id: 'sets-example-1',
      title: '例题 1 · 集合运算',
      prompt: '已知 $A=\\{1,2,3\\}$，$B=\\{2,3,4\\}$，求 $A\\cap B$ 与 $A\\cup B$。',
      hint: '先圈出两个集合都有的元素，再合并全部不同元素。',
      steps: [
        { title: '找公共元素', content: '$A$ 与 $B$ 都含有 $2,3$。' },
        { title: '写交集', content: '$A\\cap B=\\{2,3\\}$。' },
        { title: '合并全部元素', content: '两个集合共出现 $1,2,3,4$，所以 $A\\cup B=\\{1,2,3,4\\}$。' }
      ],
      answer: '$A\\cap B=\\{2,3\\}$，$A\\cup B=\\{1,2,3,4\\}$'
    },
    {
      id: 'sets-example-2',
      title: '例题 2 · 条件方向',
      prompt: '设 $p:x>2$，$q:x>1$。判断 $p$ 是 $q$ 的什么条件。',
      hint: '先判断“$p$ 成立时，$q$ 是否一定成立”，再反过来检查。',
      steps: [
        { title: '判断正向', content: '若 $x>2$，则一定有 $x>1$，所以 $p\\Rightarrow q$。' },
        { title: '寻找反例', content: '$x=1.5$ 满足 $q$ 但不满足 $p$，所以 $q\\nRightarrow p$。' },
        { title: '确定角色', content: '$p$ 是 $q$ 的充分不必要条件，$q$ 是 $p$ 的必要不充分条件。' }
      ],
      answer: '$p$ 是 $q$ 的充分不必要条件'
    }
  ],
  questions: questionsFor('sets-logic', [
    {
      id: 'sets-q1',
      topic: '集合表示',
      type: 'single',
      difficulty: 1,
      prompt: '集合 $\\{x\\in\\mathbf{N}\\mid 1\\le x\\le 4\\}$ 含有多少个元素？',
      options: [
        { id: 'A', text: '3 个' },
        { id: 'B', text: '4 个' },
        { id: 'C', text: '5 个' },
        { id: 'D', text: '无数个' }
      ],
      answer: ['B'],
      hint: '$\\mathbf{N}$ 表示自然数集。',
      steps: ['满足条件的自然数是 $1,2,3,4$。', '共有 $4$ 个元素。']
    },
    {
      id: 'sets-q2',
      topic: '子集',
      type: 'single',
      difficulty: 1,
      prompt: '集合 $A=\\{a,b\\}$ 的非空真子集有几个？',
      options: [
        { id: 'A', text: '1 个' },
        { id: 'B', text: '2 个' },
        { id: 'C', text: '3 个' },
        { id: 'D', text: '4 个' }
      ],
      answer: ['B'],
      hint: '$2^2$ 个真子集去掉空集。',
      steps: ['$A$ 有 $2$ 个元素，所以真子集有 $2^2-1=3$ 个。', '其中去掉空集，非空真子集有 $2$ 个：$\\{a\\}$ 和 $\\{b\\}$。']
    },
    {
      id: 'sets-q3',
      topic: '交集',
      type: 'single',
      difficulty: 1,
      prompt: '若 $A=\\{1,2\\}$，$B=\\{2,3\\}$，则 $A\\cap B$ 为：',
      options: [
        { id: 'A', text: '$\\{1\\}$' },
        { id: 'B', text: '$\\{2\\}$' },
        { id: 'C', text: '$\\{1,2,3\\}$' },
        { id: 'D', text: '$\\varnothing$' }
      ],
      answer: ['B'],
      hint: '交集寻找同时属于两个集合的元素。',
      steps: ['两个集合的公共元素只有 $2$。', '因此 $A\\cap B=\\{2\\}$。']
    },
    {
      id: 'sets-q4',
      topic: '补集',
      type: 'single',
      difficulty: 1,
      prompt: '设全集 $U=\\{1,2,3,4,5\\}$，$A=\\{1,3,5\\}$，则 $\\complement_U A$ 为：',
      options: [
        { id: 'A', text: '$\\{1,3,5\\}$' },
        { id: 'B', text: '$\\{2,4\\}$' },
        { id: 'C', text: '$\\{3\\}$' },
        { id: 'D', text: '$\\varnothing$' }
      ],
      answer: ['B'],
      hint: '从全集中去掉 $A$ 的元素。',
      steps: ['全集中的 $1,3,5$ 属于 $A$。', '剩下的是 $2,4$，所以 $\\complement_U A=\\{2,4\\}$。']
    },
    {
      id: 'sets-q5',
      topic: '集合关系',
      type: 'single',
      difficulty: 2,
      prompt: '集合 $A=\\{x\\mid x^2=4\\}$ 与 $B=\\{-2,0,2\\}$ 的关系是：',
      options: [
        { id: 'A', text: '$B\\subseteq A$' },
        { id: 'B', text: '$A=B$' },
        { id: 'C', text: '$A\\subsetneq B$' },
        { id: 'D', text: '$A\\cap B=\\varnothing$' }
      ],
      answer: ['C'],
      hint: '先解方程 $x^2=4$。',
      steps: ['$A=\\{-2,2\\}$。', '$A$ 的元素都在 $B$ 中，但 $0\\in B$ 且 $0\\notin A$。', '所以 $A$ 是 $B$ 的真子集。']
    },
    {
      id: 'sets-q6',
      topic: '充分条件',
      type: 'single',
      difficulty: 2,
      prompt: '“$x=1$”是“$x^2=1$”的：',
      options: [
        { id: 'A', text: '充分不必要条件' },
        { id: 'B', text: '必要不充分条件' },
        { id: 'C', text: '充要条件' },
        { id: 'D', text: '既不充分也不必要条件' }
      ],
      answer: ['A'],
      hint: '注意 $x=-1$ 也满足 $x^2=1$。',
      steps: ['$x=1\\Rightarrow x^2=1$，所以它是充分条件。', '$x=-1$ 时 $x^2=1$ 但 $x\\ne1$，所以不是必要条件。']
    },
    {
      id: 'sets-q7',
      topic: '集合语言',
      type: 'single',
      difficulty: 1,
      prompt: '$\\{x\\mid x=2n+1,n\\in\\mathbf{Z}\\}$ 表示的集合是：',
      options: [
        { id: 'A', text: '全体偶数' },
        { id: 'B', text: '全体奇数' },
        { id: 'C', text: '全体正整数' },
        { id: 'D', text: '全体负整数' }
      ],
      answer: ['B'],
      hint: '整数乘 $2$ 后加 $1$ 得到什么数？',
      steps: ['任意整数 $n$ 都有 $2n$ 是偶数。', '偶数加 $1$ 是奇数，反过来每个奇数也能写成 $2n+1$。']
    },
    {
      id: 'sets-q8',
      topic: '集合表示',
      type: 'multiple',
      difficulty: 2,
      prompt: '下列集合中，与 $\\{2,4,6\\}$ 相等的是：',
      options: [
        { id: 'A', text: '$\\{x\\in\\mathbf{N}\\mid x\\le6,\\ 2\\mid x\\}$' },
        { id: 'B', text: '$\\{2n\\mid n=1,2,3\\}$' },
        { id: 'C', text: '$\\{x\\mid x\\text{ 是小于 }7\\text{ 的正偶数}\\}$' },
        { id: 'D', text: '$\\{2,4,6,8\\}$' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '逐项列出集合中的元素。',
      steps: ['A 中满足条件的是 $2,4,6$。', 'B 中分别得到 $2,4,6$。', 'C 中正偶数小于 $7$ 的也是 $2,4,6$。', 'D 多出元素 $8$，不相等。']
    },
    {
      id: 'sets-q9',
      topic: '集合性质',
      type: 'multiple',
      difficulty: 2,
      prompt: '若 $A\\subseteq B$，则下列结论一定成立的是：',
      options: [
        { id: 'A', text: '$A\\cap B=A$' },
        { id: 'B', text: '$A\\cup B=B$' },
        { id: 'C', text: '$B$ 在全集 $U$ 中的补集包含于 $A$ 的补集' },
        { id: 'D', text: '$A$ 中一定有两个以上元素' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '把 $A$ 想成完全装在 $B$ 里的集合。',
      steps: ['$A$ 与 $B$ 的公共部分正是 $A$，故 A 正确。', '合并后仍是 $B$，故 B 正确。', '$B$ 以外的元素也一定在 $A$ 以外，故 C 正确。', '空集也满足 $A\\subseteq B$，故 D 不一定成立。']
    },
    {
      id: 'sets-q10',
      topic: '集合运算',
      type: 'numeric',
      difficulty: 2,
      prompt: '设 $U=\\{1,2,3,4,5,6\\}$，$A=\\{2,4,6\\}$，$B=\\{1,2,3\\}$，则 $\\complement_U(A\\cup B)$ 中元素的个数为多少？',
      answer: ['1'],
      tolerance: 0,
      hint: '先求 $A\\cup B$，再从全集去掉。',
      steps: ['$A\\cup B=\\{1,2,3,4,6\\}$。', '其补集为 $\\{5\\}$，共有 $1$ 个元素。']
    }
  ])
}
