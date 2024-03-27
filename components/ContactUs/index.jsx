import 'bootstrap/dist/css/bootstrap.min.css'

const ContactUs = ({ target, type, to, label }) => {
    return (
        <div className='mb-3'>
            <a href={to} target={target}>
                {label}
            </a>
        </div>
    )
}

export default ContactUs