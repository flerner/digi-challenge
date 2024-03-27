import 'bootstrap/dist/css/bootstrap.min.css'
import { Input } from 'reactstrap'

const Select = ({ label, type, name, value, handleChange, options }) => {
    return (
        <div className='mb-3'>
            <label>{label}</label>
            <Input
                type={type}
                name={name}
                value={value || ''}
                onChange={handleChange}
            >
                <option value="">Choose One</option>
                {options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Input>
        </div>
    )
}

export default Select