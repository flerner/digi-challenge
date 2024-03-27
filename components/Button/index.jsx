import 'bootstrap/dist/css/bootstrap.min.css'
import { Button as ReactButton } from 'reactstrap'

const Button = ({ type, label, disabled }) => {
    return (
        <div className='mb-3'>
            <ReactButton type="submit" disabled={disabled}>{label}</ReactButton>
        </div>
    )
}
export default Button