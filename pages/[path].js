import axios from 'axios'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button as ReactstrapButton, Container, Row, Col } from 'reactstrap'
import { Button, Checkbox, ContactUs, InputText, Select } from '../components'

export default function Page({ data }) {
  const [formData, setFormData] = useState({})
  const [hasError, setHasError] = useState({})
  const handleChange = (e, config) => {
    console.log(hasError)
    console.log(formData)
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
    console.log(
      'isRegexValid',
      isRegexValid,
      'areConditionsValid',
      areConditionsValid
    )
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

    //initialize all data in empty or false
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
            initialFormData[element.name + '-confirm'] = ''
            hasError[element.name + '-confirm'] = true
          } else {
            initialFormData[element.name] = ''
            hasError[element.name] = true
          }
        }
      }
    })
    setFormData(initialFormData)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      console.log('Form submitted with data:', formData)
      //post
    } else {
      console.log('Form not valid')
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
          value={formData[name]}
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
          value={formData[name]}
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
          name={conditions ? name + '-confirm' : name}
          label={label}
          conditions={conditions}
          value={conditions ? formData[name + '-confirm'] : formData[name]}
          handleChange={(e) => handleChange(e, { regex, conditions })}
          regex={regex}
          error={conditions ? hasError[name + '-confirm'] : hasError[name]}
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
      return formData[input] === formData[input + '-confirm']
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
          </form>
        </Col>
      </Row>
    </Container>
    // <Container>
    //   <Row className='justify-content-center'>
    //     <Col md={6}>
    //       <form onSubmit={handleSubmit}>
    //         {data &&
    //           data.inputs.map((config, index) => {
    //             switch (config.type) {
    //               case 'text':
    //               case 'password':
    //               case 'email':
    //                 return (
    //                   <div key={index} className='mb-3'>
    //                     <label>{config.label}</label>
    //                     <Input
    //                       type={config.type}
    //                       name={config.name}
    //                       value={formData[config.name] || ''}
    //                       onChange={handleChange}
    //                       required={config.required}
    //                     />
    //                   </div>
    //                 )
    //               case 'checkbox':
    //                 return (
    //                   <div key={index} className='mb-3'>
    //                     <Input
    //                       type='checkbox'
    //                       name={config.name}
    //                       checked={formData[config.name] || false}
    //                       onChange={(e) => {
    //                         setFormData({
    //                           ...formData,
    //                           [config.name]: e.target.checked,
    //                         })
    //                       }}
    //                     />
    //                     <label>{config.label}</label>
    //                   </div>
    //                 )
    //               case 'select':
    //                 return (
    //                   <div key={index} className='mb-3'>
    //                     <label>{config.label}</label>
    //                     <Input
    //                       type='select'
    //                       name={config.name}
    //                       value={formData[config.name] || ''}
    //                       onChange={handleChange}
    //                     >
    //                       {config.options.map((option, optionIndex) => (
    //                         <option key={optionIndex} value={option.value}>
    //                           {option.label}
    //                         </option>
    //                       ))}
    //                     </Input>
    //                   </div>
    //                 )
    //               case 'button':
    //                 return (
    //                   <div key={index} className='mb-3'>
    //                     <Button type='submit'>{config.label}</Button>
    //                   </div>
    //                 )
    //               case 'link':
    //                 return (
    //                   <div key={index} className='mb-3'>
    //                     <a href={config.to} target={config.target}>
    //                       {config.label}
    //                     </a>
    //                   </div>
    //                 )
    //               default:
    //                 return null
    //             }
    //           })}
    //       </form>
    //     </Col>
    //   </Row>
    // </Container>
  )
}

export async function getServerSideProps({ params }) {
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
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}
