import jobs from '../models/jobs.js'
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
      for (let i = 0; i < req.files.length; i++) {
        data.photos.push(req.files[i].path)
        console.log(data.photos)
      }
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
      photos: [],
      welfare: req.body.welfare,
      week_hours: req.body.week_hours,
      question: req.body.question,
      is_shown: req.body.is_shown
    }
    if (req.files.length !== 0) {
      for (let i = 0; i < req.files.length; i++) {
        data.photos.push(req.files[i].path)
        console.log(data.photos)
      }
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

// 找包含[關鍵字]的title工作 (前台搜尋)
export const getSearchJobs = async (req, res) => {
  try {
    const result = await jobs.find({ title: { $regex: req.params.id, $options: 'i' } })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 找特定期間的工作 (前台搜尋)
// User.find({age: {$gte: 21, $lte: 65}})
// User.where('age').gte(21).lte(65);

// 找某縣市的工作 (前台搜尋)

// 找某地區的工作 (前台搜尋)
