import axios from 'axios'

const apiConfig = axios.create({
  baseURL: `http://localhost:3000/configuration`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export default {
  async getInputs(path) {
    try {
      const res = await apiConfig.get(`/${path}`)
      return res.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },
  async getAllInputs() {
    try {
      const res = await apiConfig.get(`/`)
      return res.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },
}
