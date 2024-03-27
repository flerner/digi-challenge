import 'bootstrap/dist/css/bootstrap.min.css'
import { Input } from 'reactstrap'


const InputText = ({ type, name, value, handleChange, required, label }) => {
    return (
        <div className='mb-3'>
            <label>{label}</label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
                required={required}
            />
        </div>
    )
}

export default InputText