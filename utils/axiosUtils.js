import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
export async function getInputs(path) {
  try {
    const res = await axios.get(`http://localhost:3000/configuration/${path}`)
    return res.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function getAllInputs() {
  try {
    const res = await axios.get(`http://localhost:3000/configuration`)
    return res.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function sendUser(path, data) {
  try {
    const response = await axios.post(`http://localhost:3000/${path}`, data, {
      headers,
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error making POST request', error.response.data)
    throw error
  }
}
