import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return <div>{router.query.path}</div>
}
