import Link from 'next/link'
import { getAllInputs } from '../utils/axiosUtils.js'
export default function Index({ data }) {
  console.log(data)
  return (
    <ul>
      {Object.keys(data).map((config, index) => {
        return (
          <li key={index}>
            <Link href={`/${config}`} as={`/${config}`}>
              {config}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export async function getServerSideProps() {
  try {
    const data = await getAllInputs()
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        data: [],
      },
    }
  }
}
