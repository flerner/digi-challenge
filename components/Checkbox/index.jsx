import 'bootstrap/dist/css/bootstrap.min.css'
import { Input } from 'reactstrap'
const Checkbox = ({ type, name, checked, handleCheckbox, label }) => {
    return (
        <div className='mb-3'>
            <Input
                type={type}
                name={name}
                checked={checked || false}
                onChange={(e) => handleCheckbox(e)}

            />
            <label>{label}</label>
        </div>
    )
}
export default Checkbox