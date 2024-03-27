import axios from 'axios'

export async function getInputs(path) {
  try {
    const res = await axios.get(`http://localhost:3000/configuration/${path}`)
    return res.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
export async function sendUser(path, data) {
  try {
    const response = await axios.post(`http://localhost:3000/${path}`, data)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error making POST request', error)
    throw error
  }
}
