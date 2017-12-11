import Mock from 'mockjs'
const Users = []


for (let i = 0; i < 55; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

const Aritcle = [];

for (let j = 0 ; j < 55 ; j++){
	Aritcle.push(Mock.mock({
		id:Mock.Random.guid(),
		bookname:Mock.mock('@csentence(5, 12)'),
		author:Mock.mock('@cname()'),
		date:Mock.mock('@date("yyyy-MM-dd")'),
		details:Mock.mock('@cparagraph()')
	}))
}

export default {Users,Aritcle}