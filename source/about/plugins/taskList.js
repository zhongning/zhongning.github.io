// const USER_ID = parseInt(Math.random() * 1000)
function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [
  { type: 'system',
    label: 'System',
    message: 'Thanks for your visiting, let me introduce myself first.' },
    { time: generateTime(), type: 'info', label: 'Name:', message: 'Zhong Ning' },
    { time: generateTime(), type: 'info', label: 'Age:', message: '30' },
    { time: generateTime(), type: 'info', label: 'Gender:', message: 'Male' },
    { time: generateTime(), type: 'info', label: 'Profession:', message: 'Java Programmer' },
    { time: generateTime(), type: 'info', label: 'School:', message: 'Fudan University' },
    { time: generateTime(), type: 'info', label: 'Address:', message: 'Shanghai, China' },
    { time: generateTime(), type: 'info', label: 'Email:', message: 'zhongning1989@gmail.com' },
    { time: generateTime(), type: 'info', label: 'Website:', message: 'https://zhongning.github.io' },
    { time: generateTime(), type: 'info', label: 'Experience:', message: {
        text: "Here is my work experence:",
        list: [
          { type: 'error', label: 'Citi', message: '2019- Work as Assistant Vice President' },
          { type: 'error', label: 'Citi', message: '2017-2018 Work as Manager' },
          { type: 'error', label: 'Citi', message: '2015-2016 Work as Assistant Manager' },
          { type: 'warning', label: 'HP', message: '2014-2015 Work as Senior Java Developer' },
          { type: 'warning', label: 'Primeton', message: '2011-2013 Work as Junior Java Developer' }
        ]}
    }
]

const taskList = {
  echo: {
    description: 'Echoes input',
    echo(pushToList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
        resolve({ type: 'success', label: '', message: '' })
      })
      return p
    }
  },
  defaultTask: {
    description: 'Print resume',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          //mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success', label: 'Done', message: 'My self introduction is over!' })
          }
        }, 1000);
      })
      return p
    }
  },
  open: {
    description: 'Open a specified url in a new tab.',
    open(pushToList, input) {
      const p = new Promise((resolve, reject) => {
        let url = input.split(' ')[1]
        if (!url) {
          reject({ type: 'error', label: 'Error', message: 'a url is required!' })
          return
        }
        pushToList({ type: 'success', label: 'Success', message: 'Opening' })

        if (input.split(' ')[1].indexOf('http') === -1) {
          url = 'http://' + input.split(' ')[1]
        }
        window.open(url, '_blank')
        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
      })
      return p;
    }
  }

}
