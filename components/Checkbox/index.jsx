import 'bootstrap/dist/css/bootstrap.min.css'
import { Input } from 'reactstrap'
const Checkbox = ({ type, name, checked, handleChange, label }) => {
    return (
        <div className='mb-3'>
            <Input
                type={type}
                name={name}
                checked={checked || false}
                onChange={handleChange}

            />
            <label>{label}</label>
        </div>
    )
}
export default Checkbox