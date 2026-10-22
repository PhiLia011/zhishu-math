import type { Chapter } from '../types'
import { formula, note, questionsFor, text, tip, warn } from './helpers'

export const chapter8: Chapter = {
  id: 'solid-geometry',
  order: 8,
  title: '立体几何初步',
  shortTitle: '立体几何',
  description: '从空间基本元素出发，认识平行、垂直关系，并计算常见几何体的表面积与体积。',
  color: '#6e8f55',
  icon: '空间',
  cards: [
    {
      id: 'solid-1',
      title: '空间点、线、面',
      summary: '理解空间基本元素及位置关系。',
      blocks: [
        text('空间中的点、直线、平面是基本图形。直线和平面都可以向两方无限延伸。'),
        text('两条直线可能相交、平行或异面；直线与平面可能相交、平行或直线在平面内。'),
        tip('异面直线', '异面直线没有公共点，但它们不平行，因此“没有公共点”不能直接说明平行。')
      ]
    },
    {
      id: 'solid-2',
      title: '基本几何体',
      summary: '认识柱、锥、台、球的结构特征。',
      blocks: [
        text('棱柱、圆柱有两个相互平行且全等的底面；棱锥、圆锥有一个顶点；球面上任意点到球心距离相等。'),
        text('画简单组合体时，可把复杂图形拆成柱、锥、球等基本几何体。'),
        note('正视、侧视与俯视', '三视图应满足长对正、高平齐、宽相等。')
      ]
    },
    {
      id: 'solid-3',
      title: '柱体与锥体体积',
      summary: '把底面积与高组合成体积公式。',
      blocks: [
        formula('V_{\\text{柱}}=Sh'),
        formula('V_{\\text{锥}}=\\frac13Sh'),
        text('体积公式中的高必须垂直于底面。斜棱柱的侧棱长不一定等于高。'),
        warn('不要用斜边当高', '计算体积时，应寻找底面之间的垂直距离。')
      ]
    },
    {
      id: 'solid-4',
      title: '球与旋转体',
      summary: '掌握球和常见旋转体的度量公式。',
      blocks: [
        formula('S_{\\text{球}}=4\\pi r^2,\\qquad V_{\\text{球}}=\\frac43\\pi r^3'),
        formula('V_{\\text{圆柱}}=\\pi r^2h,\\qquad V_{\\text{圆锥}}=\\frac13\\pi r^2h'),
        tip('先统一半径', '题目给出直径时要先除以 $2$ 求半径，再进行代入。')
      ]
    },
    {
      id: 'solid-5',
      title: '直线与平面平行',
      summary: '用线线平行证明线面平行。',
      blocks: [
        text('若平面外一条直线与平面内一条直线平行，则该直线与平面平行。'),
        formula('a\\parallel b,\\ b\\subset\\alpha,\\ a\\not\\subset\\alpha\\Rightarrow a\\parallel\\alpha'),
        text('三个条件缺一不可：直线在平面外、平面内有平行线、两直线方向相同。')
      ]
    },
    {
      id: 'solid-6',
      title: '平面与平面平行',
      summary: '通过两相交直线判断面面平行。',
      blocks: [
        text('若一个平面内有两条相交直线分别平行于另一个平面，则两个平面平行。'),
        text('两个平行平面与第三个平面相交所得交线互相平行。'),
        tip('必须相交', '同一平面内的两条平行直线不足以推出面面平行。')
      ]
    },
    {
      id: 'solid-7',
      title: '直线与平面垂直',
      summary: '用两条相交直线证明线面垂直。',
      blocks: [
        text('若一条直线垂直于平面内两条相交直线，则它垂直于这个平面。'),
        text('线面垂直意味着这条直线垂直于平面内所有经过交点的直线。'),
        formula('l\\perp\\alpha,\\ a\\subset\\alpha\\Rightarrow l\\perp a')
      ]
    },
    {
      id: 'solid-8',
      title: '空间距离与二面角',
      summary: '理解空间中的垂直距离和角。',
      blocks: [
        text('点到平面的距离是点到平面垂线段的长度。二面角用两个半平面内的射线所成的平面角度量。'),
        text('求空间角通常需要作垂线，把空间角转化为可计算的直角三角形。'),
        warn('先作垂线', '在复杂图形中直接观察容易误判，证明和计算前应明确哪一条是垂线。')
      ]
    }
  ],
  examples: [
    {
      id: 'solid-example-1',
      title: '例题 1 · 圆柱体积',
      prompt: '一个圆柱的底面半径为 $2$，高为 $5$，求它的体积。',
      hint: '柱体体积等于底面积乘高。',
      steps: [
        { title: '求底面积', content: '$S=\\pi r^2=4\\pi$。' },
        { title: '乘高', content: '$V=Sh=4\\pi\\times5=20\\pi$。' }
      ],
      answer: '$20\\pi$'
    },
    {
      id: 'solid-example-2',
      title: '例题 2 · 线面平行证明',
      prompt: '在空间中，直线 $l$ 在平面 $\\alpha$ 外，且 $l\\parallel m$，$m\\subset\\alpha$。判断 $l$ 与 $\\alpha$ 的位置关系。',
      hint: '回顾线面平行的判定定理。',
      steps: [
        { title: '检查条件', content: '$l$ 在平面外，且平面内存在 $m\\parallel l$。' },
        { title: '应用判定定理', content: '满足线面平行判定定理，因此 $l\\parallel\\alpha$。' }
      ],
      answer: '$l\\parallel\\alpha$'
    }
  ],
  questions: questionsFor('solid-geometry', [
    {
      id: 'solid-q1',
      topic: '几何体结构',
      type: 'single',
      difficulty: 1,
      prompt: '正方体有几个顶点？',
      options: [
        { id: 'A', text: '6 个' },
        { id: 'B', text: '8 个' },
        { id: 'C', text: '10 个' },
        { id: 'D', text: '12 个' }
      ],
      answer: ['B'],
      hint: '上、下两个底面各有 4 个顶点。',
      steps: ['正方体上下底面各有 $4$ 个顶点。', '共有 $4+4=8$ 个顶点。']
    },
    {
      id: 'solid-q2',
      topic: '空间位置关系',
      type: 'single',
      difficulty: 1,
      prompt: '空间中两条没有公共点的直线，可能的位置关系是：',
      options: [
        { id: 'A', text: '只能相交' },
        { id: 'B', text: '只能异面' },
        { id: 'C', text: '平行或异面' },
        { id: 'D', text: '一定重合' }
      ],
      answer: ['C'],
      hint: '平面内的平行线没有公共点，空间中的异面直线也没有公共点。',
      steps: ['没有公共点排除相交和重合。', '可能方向相同而平行，也可能不在同一平面内而成为异面直线。']
    },
    {
      id: 'solid-q3',
      topic: '体积',
      type: 'single',
      difficulty: 1,
      prompt: '底面半径为 $2$、高为 $4$ 的圆柱体积为：',
      options: [
        { id: 'A', text: '$8\\pi$' },
        { id: 'B', text: '$16\\pi$' },
        { id: 'C', text: '$32\\pi$' },
        { id: 'D', text: '$4\\pi$' }
      ],
      answer: ['B'],
      hint: '$V=\\pi r^2h$。',
      steps: ['$V=\\pi\\times2^2\\times4$。', '$=16\\pi$。']
    },
    {
      id: 'solid-q4',
      topic: '球',
      type: 'single',
      difficulty: 1,
      prompt: '半径为 $3$ 的球，其表面积为：',
      options: [
        { id: 'A', text: '$3\\pi$' },
        { id: 'B', text: '$9\\pi$' },
        { id: 'C', text: '$18\\pi$' },
        { id: 'D', text: '$36\\pi$' }
      ],
      answer: ['D'],
      hint: '球表面积公式为 $4\\pi r^2$。',
      steps: ['$S=4\\pi\\times3^2$。', '$=36\\pi$。']
    },
    {
      id: 'solid-q5',
      topic: '锥体体积',
      type: 'single',
      difficulty: 2,
      prompt: '底面积为 $6$、高为 $5$ 的锥体体积为：',
      options: [
        { id: 'A', text: '10' },
        { id: 'B', text: '15' },
        { id: 'C', text: '30' },
        { id: 'D', text: '45' }
      ],
      answer: ['A'],
      hint: '锥体体积要乘 $1/3$。',
      steps: ['$V=\\frac13\\times6\\times5$。', '$=10$。']
    },
    {
      id: 'solid-q6',
      topic: '线面平行',
      type: 'single',
      difficulty: 2,
      prompt: '要证明直线 $a$ 平行于平面 $\\alpha$，下列条件足够的是：',
      options: [
        { id: 'A', text: '$a$ 与平面内一条直线平行，且 $a$ 在平面外' },
        { id: 'B', text: '$a$ 与平面内一条直线垂直，且 $a$ 在平面外' },
        { id: 'C', text: '$a$ 与平面没有明确关系' },
        { id: 'D', text: '$a$ 与平面内一条直线相交' }
      ],
      answer: ['A'],
      hint: '线面平行判定需要平面外直线与平面内一条直线平行。',
      steps: ['根据线面平行判定定理，A 条件满足。', '仅垂直、相交或关系不明都不能推出线面平行。']
    },
    {
      id: 'solid-q7',
      topic: '线面垂直',
      type: 'single',
      difficulty: 2,
      prompt: '若直线 $l$ 垂直于平面 $\\alpha$ 内两条相交直线，则：',
      options: [
        { id: 'A', text: '$l\\parallel\\alpha$' },
        { id: 'B', text: '$l\\subset\\alpha$' },
        { id: 'C', text: '$l\\perp\\alpha$' },
        { id: 'D', text: '无法判断' }
      ],
      answer: ['C'],
      hint: '这是线面垂直的判定定理。',
      steps: ['平面内两条相交直线能确定该平面的方向。', '直线同时垂直于它们，因此垂直于整个平面。']
    },
    {
      id: 'solid-q8',
      topic: '空间关系',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于空间中的直线和平面，下列说法正确的是：',
      options: [
        { id: 'A', text: '两条平行直线可能确定一个平面' },
        { id: 'B', text: '直线与平面可能只有一个公共点' },
        { id: 'C', text: '两条异面直线一定没有公共点' },
        { id: 'D', text: '任意两条空间直线都一定相交' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '回顾空间直线的三种位置关系。',
      steps: ['两条平行直线可以确定一个平面。', '直线与平面相交时只有一个公共点。', '异面直线定义为不共面，因此无公共点。', '空间直线可以平行或异面，不一定相交。']
    },
    {
      id: 'solid-q9',
      topic: '面面关系',
      type: 'multiple',
      difficulty: 2,
      prompt: '关于平面与平面平行，下列说法正确的是：',
      options: [
        { id: 'A', text: '两个平行平面没有公共点' },
        { id: 'B', text: '一个平面内有两条相交直线分别平行于另一个平面，可判定面面平行' },
        { id: 'C', text: '两个平行平面与第三个平面相交，所得交线平行' },
        { id: 'D', text: '任意两个平面都一定平行' }
      ],
      answer: ['A', 'B', 'C'],
      hint: '平行平面不相交；第三个平面的交线由同一组平行方向决定。',
      steps: ['A、B、C 都是平行平面的基本性质或判定。', '两个平面还可以相交，D 错误。']
    },
    {
      id: 'solid-q10',
      topic: '体积',
      type: 'numeric',
      difficulty: 1,
      prompt: '棱长为 $3$ 的正方体体积是多少？',
      answer: ['27'],
      tolerance: 0,
      hint: '正方体体积等于棱长的立方。',
      steps: ['$V=3^3$。', '$=27$。']
    }
  ])
}
