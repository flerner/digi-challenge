import 'bootstrap/dist/css/bootstrap.min.css'
import { Button as ReactButton } from 'reactstrap'

const Button = ({ type, label }) => {
    return (
        <div className='mb-3'>
            <ReactButton type={type}>{label}</ReactButton>
        </div>
    )
}
export default Button