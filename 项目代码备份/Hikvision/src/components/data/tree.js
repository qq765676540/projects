var treeData = [{
  label: '各省份',
  id: '省份:湖南',
  children: [{
    label: '长沙',
    id: '地市:长沙',
    children: [{
      label: '城区1',
      id: '区县:城区1',
      children: [{
        label: '街道1',
        id: '街道:街道1'
      },
      {
        label: '街道2',
        id: '街道:街道2'
      },
      {
        label: '街道3',
        id: '街道:街道3'
      },
      {
        label: '街道4',
        id: '街道:街道4',
        children: [{
          label: '居委1',
          id: '居委:居委1'
        },
        {
          label: '居委2',
          id: '居委:居委2'
        },
        {
          label: '居委3',
          id: '居委:居委3'
        }
        ]
      }
      ]
    },
    {
      label: '城区2',
      id: '区县:城区2',
    }
    ]
  },
  ]
},
{
  label: '各行业',
  id: '行业',
  children: [{
    label: '电信',
    id: '行业:电信'
  },
  {
    label: '零售',
    id: '行业:零售',
    children: [{
      label: '大型超市',
      id: '零售:大型超市'
    },
    {
      label: '网上商城',
      id: '零售:网上商城'
    }
    ]
  }
  ]
}
]

export default treeData;