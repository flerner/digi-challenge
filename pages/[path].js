import axios from 'axios'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button as ReactstrapButton, Container, Row, Col } from 'reactstrap'
import { Button, Checkbox, ContactUs, InputText, Select } from '../components'

export default function Page({ data }) {
  const [formData, setFormData] = useState({})
  const [inputText, setInputText] = useState('text eaea')
  const [checked, setChecked] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
  }
  const inputs = {
    email: ({ type, name, label, regex }) => {
      return <InputText type={type} name={name} label={label} />
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
        />
      )
    },
    password: ({ type, name, label, regex, conditions }) => {
      return (
        <InputText
          type={type}
          name={name}
          label={label}
          conditions={conditions}
        />
      )
    },
    select: ({ type, name, label, options }) => {
      return <Select type={type} name={name} label={label} options={options} />
    },
    button: ({ type, label, method }) => {
      return <Button type={type} label={label} method={method} />
    },
    link: ({ type, to, target, label }) => {
      return <ContactUs type={type} to={to} target={target} label={label} />
    },
    checkbox: ({ type, name, label }) => {
      return <Checkbox type={type} name={name} label={label} />
    },
  }
  return (
    // <div>
    //   <Button type='button' label='Send' />
    //   <Checkbox
    //     type='checkbox'
    //     name='checkbox'
    //     checked={checked}
    //     handleChange={(e) => {
    //       console.log(checked)
    //       setChecked(e.target.checked)
    //     }}
    //     label='Checkbox'
    //   />
    //   <ContactUs
    //     target='https://digiventures.la/'
    //     text='¿Any problem? Contact us'
    //   />
    //   <InputText
    //     name='Asd'
    //     type='text'
    //     value={inputText}
    //     handleChange={(e) => {
    //       console.log(inputText)
    //       setInputText(e.target.value)
    //     }}
    //     required={true}
    //     label='Nombre'
    //   />
    //   <Select
    //     label='select'
    //     type='select'
    //     name='select'
    //     value={selectValue}
    //     handleChange={(e) => {
    //       console.log(selectValue)
    //       setSelectValue(e.target.value)
    //     }}
    //     options={[
    //       { value: 'hola', label: 'chau' },
    //       { value: 'asd', label: 'dsa' },
    //     ]}
    //   />
    // </div>
    <Container>
      <Row className='justify-content-center'>
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            {data &&
              data.inputs.map((config, index) => {
                return inputs[config.type](config)
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
  console.log(path)
  try {
    const res = await axios.get(`http://localhost:3000/configuration/${path}`)
    const data = res.data
    console.log(data)
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
