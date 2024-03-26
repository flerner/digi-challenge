import axios from 'axios'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, Input } from 'reactstrap'

export default function Page({ data }) {
  console.log(data.inputs)
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            {data &&
              data.inputs.map((config, index) => {
                switch (config.type) {
                  case 'text':
                  case 'password':
                  case 'email':
                    return (
                      <div key={index} className='mb-3'>
                        <label>{config.label}</label>
                        <Input
                          type={config.type}
                          name={config.name}
                          value={formData[config.name] || ''}
                          onChange={handleChange}
                          required={config.required}
                        />
                      </div>
                    )
                  case 'checkbox':
                    return (
                      <div key={index} className='mb-3'>
                        <Input
                          type='checkbox'
                          name={config.name}
                          checked={formData[config.name] || false}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [config.name]: e.target.checked,
                            })
                          }}
                        />
                        <label>{config.label}</label>
                      </div>
                    )
                  case 'select':
                    return (
                      <div key={index} className='mb-3'>
                        <label>{config.label}</label>
                        <Input
                          type='select'
                          name={config.name}
                          value={formData[config.name] || ''}
                          onChange={handleChange}
                        >
                          {config.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Input>
                      </div>
                    )
                  case 'button':
                    return (
                      <div key={index} className='mb-3'>
                        <Button type='submit'>{config.label}</Button>
                      </div>
                    )
                  case 'link':
                    return (
                      <div key={index} className='mb-3'>
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
        </Col>
      </Row>
    </Container>
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
    paths: [{ params: { path: 'login' } }, { params: { path: 'register' } }],
    fallback: false,
  }
}
