import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Page() {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/configuration/${router.query.path}`
        )
        setData(res)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchConfig()
  }, [])

  return (
    <div>
      {data && data.data.inputs.map((a) => <li key={a.name}>{a.type}</li>)}
    </div>
  )
}
