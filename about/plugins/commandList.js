const commandList = {
  about: {
    description: 'About author',
    messages: [
      { message: 'My name is Zhong Ning. I\'m a programmer, You can visit my personal website at https://zhongning.github.io to learn more about me.' }
    ]
  },
  contact: {
    description: 'How to contact me',
    messages: [
    { message: 'Website: https://zhongning.github.io' },
    { message: 'Email: zhongning1989@gmail.com' },
    { message: 'Github: https://github.com/zhongning' },
    ] },
  skill: {
    description: 'Return a list of my skills',
    messages: [
      { type: 'success', label: 'Expert', message: 'Java'},
      { type: 'success', label: 'Expert', message: 'Linux' },
      { type: 'success', label: 'Expert', message: 'MySQL/Oracle' },
      { type: 'success', label: 'Expert', message: 'HTML/CSS' },
      { type: 'info', label: 'Advanced', message: 'Docker/Openshift' },
      { type: 'info', label: 'Advanced', message: 'SpringBoot/SpringMVC' },
      { type: 'info', label: 'Advanced', message: 'Storm' },
      { type: 'info', label: 'Advanced', message: 'Zookeeper' },
      { type: 'info', label: 'Advanced', message: 'Elasticsearch/Logstash/Kibana' },
      { type: 'info', label: 'Advanced', message: 'AngularJS' }
    ] },
  experience: {
    description: 'Work experience',
    messages: [
          { type: 'error', label: 'Citi', message: '2019- Work as Assistant Vice President' },
          { type: 'error', label: 'Citi', message: '2017-2018 Work as Manager' },
          { type: 'error', label: 'Citi', message: '2015-2016 Work as Assistant Manager' },
          { type: 'warning', label: 'HP', message: '2014-2015 Work as Senior Java Developer' },
          { type: 'warning', label: 'Primeton', message: '2011-2013 Work as Junior Java Developer' }
    ]
  },
  education: {
    description: 'Education Background',
    messages: [
      { type: 'error', label: 'Fudan University', message: '2017- Major in Software Engineering, Master Degree (in process)' },
      { type: 'warning', label: 'Wuhan University of Technology', message: '2007-2011 Major in Automation, Bachelor Degree' }
    ]
  }
}
