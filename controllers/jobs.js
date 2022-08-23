import jobs from '../models/jobs.js'
import orders from '../models/orders.js'
// import hosts from '../models/hosts.js'

export const createJob = async (req, res) => {
  try {
    const data = {
      host: req.user._id,
      title: req.body.title,
      city: req.body.city,
      district: req.body.district,
      address: req.body.address,
      zipcode: req.body.zipcode,
      date_from: req.body.date_from,
      date_to: req.body.date_to,
      description: req.body.description,
      photos: [],
      welfare: req.body.welfare,
      week_hours: req.body.week_hours,
      question: req.body.question,
      is_shown: req.body.is_shown
    }
    if (req.files.length !== 0) {
      for (const i of req.files) {
        data.photos.push(i.path)
        console.log(data.photos)
      }
      // for (let i = 0; i < req.files.length; i++) {
      //   data.photos.push(req.files[i].path)
      //   console.log(data.photos)
      // }
    }
    const result = await jobs.create(data)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 這裡還沒好
export const editJob = async (req, res) => {
  try {
    const data = {
      host: req.user._id,
      title: req.body.title,
      city: req.body.city,
      district: req.body.district,
      address: req.body.address,
      zipcode: req.body.zipcode,
      date_from: req.body.date_from,
      date_to: req.body.date_to,
      description: req.body.description,
      welfare: req.body.welfare,
      week_hours: req.body.week_hours,
      question: req.body.question,
      is_shown: req.body.is_shown
    }
    if (req.files.length !== 0) {
      for (let i = 0; i < req.files.length; i++) {
        data.photos = []
        data.photos.push(req.files[i].path)
      }
    }
    // 如果職缺is not shown ， order 的 review 狀態改為 5職缺已關閉
    if (!data.is_shown) {
      const theOrders = await orders.find({ job: req.params.id })
      console.log(theOrders)
      if (theOrders.length > 0) {
        for (let i = 0; i < theOrders.length; i++) {
          theOrders[i].review = 5
        }
      }
      await theOrders.save()
    }
    const result = await jobs.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      return res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除工作
export const deleteJob = async (req, res) => {
  try {
    await jobs.findByIdAndDelete(req.params.id)
  } catch (error) {
    console.log(error)
  }
}

// 已顯示的工作 (前台換宿機會)
export const getShownJobs = async (req, res) => {
  try {
    const result = await jobs.find({ is_shown: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 所有工作

// 某一特定工作 (前台工作詳細頁)
export const getJob = async (req, res) => {
  try {
    const result = await jobs.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 某host刊登的工作 (後台)
export const getMyJobs = async (req, res) => {
  try {
    const result = await jobs.find({ host: req.user._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 找包含[搜尋條件]的工作 (前台搜尋) (前端還沒好)
// title/city/district/weldare
// 包含所提供的
export const getSearchJobs = async (req, res) => {
  try {
    // const result = await jobs.find({ title: { $regex: req.params.keyword, $options: 'i' } })
    const title = req.query.title
    const city = req.query.city
    const district = req.query.district
    const welfare = req.query.welfare
    console.log(req.query.welfare)
    const result = await jobs.find({
      $and: [
        { title: RegExp(`.*${title}.*`, 'gi') },
        { city: RegExp(`.*${city}.*`, 'gi') },
        { district: RegExp(`.*${district}.*`, 'gi') },
        { welfare: { $in: RegExp(`.*${welfare}.*`, 'gi') } }
        // 大於from 小於to
      ]
    })
    console.log(result)
    // const keyword = new RegExp(`.*${req.params.keyword}.*`, 'gi')
    // const result = await jobs.find({ $or: { title: keyword } })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 找特定期間的工作 (前台搜尋) (還沒寫完)
// User.find({age: {$gte: 21, $lte: 65}})
// User.where('age').gte(21).lte(65);
export const getDateJob = async (req, res) => {
  try {
    const result = await jobs.find().where('age').gte(req.params.from).lte(65)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
// 找某縣市的工作 (前台搜尋)

// 找某地區的工作 (前台搜尋)
