import axios from 'axios'

const apiUser = axios.create({
  baseURL: `http://localhost:3000`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export default {
  async sendUser(path, data) {
    try {
      const response = await apiUser.post(`/${path}`, data)
      console.log('asd', response)
      return response.data
    } catch (error) {
      console.error('Error making POST request', error.response.data)
      throw error
    }
  },
}
