import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button as ReactstrapButton,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap'
import { Button, Checkbox, ContactUs, InputText, Select } from '../components'
import userService from '../utils/services/UserService.js'
import configService from '../utils/services/ConfigService.js'
export default function Page({ data, path }) {
  const [formData, setFormData] = useState({})
  const [hasError, setHasError] = useState({})
  const [notificationData, setNotificationData] = useState(null)
  const handleChange = (e, config) => {
    const newState = formData
    const { name, value } = e.target
    newState[name] = value

    hasError[name] = !isValid(value, config)

    setFormData({ ...newState })
  }
  const isValid = (value, { regex, conditions }) => {
    const isRegexValid = !regex || new RegExp(regex).test(value)
    const areConditionsValid =
      !conditions?.validations ||
      conditions.validations.every((config) => {
        return validationParser[config.comparision](config)
      })
    return isRegexValid && areConditionsValid
  }
  const handleCheckbox = (e) => {
    const newState = formData
    const { name, checked } = e.target
    newState[name] = checked
    setFormData({ ...newState })
  }
  useEffect(() => {
    const initialFormData = {}

    data.inputs.forEach((element) => {
      if (element.name) {
        const isConfirmField = element?.conditions?.validations?.some(
          (validation) => {
            validation?.comparison === 'same'
          }
        )
        if (element.type === 'checkbox') {
          initialFormData[element.name] = false
          hasError[element.name] = false
        } else if (element.name === 'custom_country') {
          initialFormData[element.name] = ''
          hasError[element.name] = false
        } else {
          if (isConfirmField) {
            initialFormData[element.name + '_confirm'] = ''
            hasError[element.name + '_confirm'] = true
          } else {
            initialFormData[element.name] = ''
            hasError[element.name] = true
          }
        }
      }
    })
    setFormData(initialFormData)
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid()) {
      try {
        const responseData = await userService.sendUser(path, formData)
        setNotificationData({ message: `${path} ok`, color: 'success' })
      } catch (error) {
        setNotificationData({ message: error.response.data, color: 'danger' })
      }
    } else {
      setNotificationData({ message: 'Check your fields', color: 'danger' })
    }
  }

  const isFormValid = () => {
    return !data.inputs.some((config) => {
      if (config.name === 'custom_country') {
        return formData[config.name] === '' && formData['country'] === 'other'
      }
      return !isValid(formData[config.name], config)
    })
  }
  const inputs = {
    email: ({ type, name, label, regex, conditions }) => {
      return (
        <InputText
          type={type}
          name={name}
          label={label}
          handleChange={(e) => handleChange(e, { regex, conditions })}
          value={formData[name] ?? ''}
          regex={regex}
          error={hasError[name]}
        />
      )
    },
    text: ({ type, name, label, regex, required, conditions, render }) => {
      return (
        <InputText
          type={type}
          name={name}
          label={label}
          required={required}
          conditions={conditions}
          render={render}
          value={formData[name] ?? ''}
          handleChange={(e) => handleChange(e, { regex, conditions })}
          regex={regex}
          error={hasError[name]}
        />
      )
    },
    password: ({ type, name, label, regex, conditions }) => {
      return (
        <InputText
          type={type}
          name={conditions ? name + '_confirm' : name}
          label={label}
          conditions={conditions}
          value={
            conditions
              ? formData[name + '_confirm'] ?? ''
              : formData[name] ?? ''
          }
          handleChange={(e) => handleChange(e, { regex, conditions })}
          regex={regex}
          error={conditions ? hasError[name + '_confirm'] : hasError[name]}
        />
      )
    },
    select: ({ type, name, label, options, regex, conditions }) => {
      return (
        <Select
          type={type}
          name={name}
          label={label}
          options={options}
          value={formData[name]}
          handleChange={(e) => handleChange(e, { regex, conditions })}
        />
      )
    },
    button: ({ type, label, method }) => {
      return <Button type={type} label={label} method={method} />
    },
    link: ({ type, to, target, label }) => {
      return <ContactUs type={type} to={to} target={target} label={label} />
    },
    checkbox: ({ type, name, label }) => {
      return (
        <Checkbox
          type={type}
          name={name}
          label={label}
          checked={formData[name]}
          handleCheckbox={(e) => handleCheckbox(e)}
        />
      )
    },
  }
  const validationParser = {
    includes: ({ input, values }) => {
      return values.some((val) => val === formData[input])
    },
    not_includes: ({ input, values }) => {
      return !values.some((val) => val === formData[input])
    },
    same: ({ input }) => {
      return formData[input] === formData[input + '_confirm']
    },
  }
  const checkRenderConditions = (renderConditions) => {
    return (
      !renderConditions ||
      (renderConditions &&
        renderConditions.every((conditions) => {
          return conditions.every((config) => {
            return validationParser[config?.comparision](config)
          })
        }))
    )
  }
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={6} className='border border-dark rounded'>
          <form onSubmit={handleSubmit}>
            {data.title && <h1>{data.title}</h1>}
            {data.inputs.map((config, index) => {
              const shouldRender = checkRenderConditions(
                config?.conditions?.render
              )

              return (
                shouldRender && (
                  <div key={index}>{inputs[config.type](config)}</div>
                )
              )
            })}
            {notificationData && (
              <Alert color={notificationData.color}>
                {notificationData.message}
              </Alert>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps({ params }) {
  const { path } = params
  try {
    const data = await configService.getInputs(path)

    return {
      props: {
        data,
        path,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}
