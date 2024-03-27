import 'bootstrap/dist/css/bootstrap.min.css'
import { Input } from 'reactstrap'
const Checkbox = ({ type, name, checked, handleChange, label }) => {
    return (
        <div className='mb-3'>
            <Input
                type={type}
                name={name}
                checked={checked || false}
                onChange={(e) => handleChange(e)}

            />
            <label>{label}</label>
        </div>
    )
}
export default Checkbox