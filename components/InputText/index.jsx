import 'bootstrap/dist/css/bootstrap.min.css'
import { Input, FormFeedback } from 'reactstrap'


const InputText = ({ type, name, value, handleChange, required, label, regex, error, }) => {
    return (
        <div className='mb-3'>
            <label>{label}</label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={(e) => handleChange(e, regex)}
                required={required}
                invalid={value !== "" && error}
            />
            <FormFeedback>Incorrect field</FormFeedback>
        </div>
    )
}

export default InputText