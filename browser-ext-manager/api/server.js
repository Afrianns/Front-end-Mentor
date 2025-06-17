import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'

const app = express()

const port = 4100
app.use(bodyParser.json())
app.use(cors())

app.post('/update_extensions', (req, res) => {
  let index = req.body.index
  try {
    const data = fs.readFileSync('api/data.json', 'utf8')
    let parseJSONObject = JSON.parse(data)
    parseJSONObject[index].isActive = !parseJSONObject[index].isActive
    if (parseJSONObject) {
      fs.writeFileSync('api/data.json', JSON.stringify(parseJSONObject))
      res.send('Data successfully updated')
    }
  } catch (err) {
    console.error(err)
    res.send('Data failed to updated')
  }
})

app.post('/delete_extension', (req, res) => {
  const index = req.body.index
  try {
    const data = fs.readFileSync('api/data.json', 'utf8')
    let result = JSON.parse(data).filter((_, idx) => idx != index)
    fs.writeFileSync('api/data.json', JSON.stringify(result))
    res.send('extension successfully deleted')
  } catch (err) {
    console.error(err)
    res.send('extension failed to deleted')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
