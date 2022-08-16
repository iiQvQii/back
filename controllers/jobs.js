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

// 已顯示的工作
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

// 某一工作
export const getJob = async (req, res) => {
  try {
    const result = await jobs.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 某host刊登的工作
export const getMyJobs = async (req, res) => {
  try {
    const result = await jobs.find({ host: req.user._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
