export const commonMockData = [
  {
    label: '城市名',
    value: '@city',
  },
  {
    label: 'utc时间',
    value: '@datetime(`yyyy-MM-dd`)T@datetime(`HH:mm:sss`)Z'
  },
  {
    label: 'boolean值',
    value: '@boolean',
  },
  {
    label: '手机号',
    value: "/1\\d{10}/",
  }
]
