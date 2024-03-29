import Link from 'next/link'
import configService from '../utils/services/ConfigService.js'
export default function Index({ data }) {
  return (
    <ul>
      {Object.keys(data)
        .filter((config) => config !== '_id')
        .map((config, index) => {
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
    const data = await configService.getAllInputs()
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: [],
      },
    }
  }
}
