import 'bootstrap/dist/css/bootstrap.min.css'

const ContactUs = ({ target, text }) => {
    return (
        <div className='mb-3'>
            <a href={target} target={target}>
                {text}
            </a>
        </div>
    )
}

export default ContactUs