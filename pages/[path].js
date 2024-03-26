import axios from 'axios'

export default function Page({ data }) {
  console.log(data.inputs)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {data &&
          data.inputs.map((config, index) => {
            switch (config.type) {
              case 'text':
              case 'password':
              case 'email':
                return (
                  <div key={index}>
                    <label>{config.label}</label>
                    <input type={config.type} name={config.name} />
                  </div>
                )
              case 'checkbox':
                return (
                  <div key={index}>
                    <input type='checkbox' name={config.name} />
                    <label>{config.label}</label>
                  </div>
                )
              case 'select':
                return (
                  <div key={index}>
                    <label>{config.label}</label>
                    <select name={config.name}>
                      {config.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              case 'button':
                return (
                  <div key={index}>
                    <button>{config.label}</button>
                  </div>
                )
              case 'link':
                return (
                  <div key={index}>
                    <a href={config.to} target={config.target}>
                      {config.label}
                    </a>
                  </div>
                )
              default:
                return null
            }
          })}
      </form>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { path } = params

  try {
    const res = await axios.get(`http://localhost:3000/configuration/${path}`)
    const data = res.data

    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        data: null,
      },
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: 'login' } }, //this I understand goes hardcoded because index.js has the paths hardcoded as well
      { params: { path: 'register' } },
    ],
    fallback: false,
  }
}
