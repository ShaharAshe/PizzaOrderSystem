/**
 * Component for rendering an alert form.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isAlert - Flag indicating whether to show the alert.
 * @param {JSX.Element} props.msg - Message to be displayed in the alert.
 * @returns {JSX.Element} - Rendered AlertForm component.
 */
function AlertForm({isAlert, msg}){
    return(
        <>
        {
            isAlert?
                (
                    <div className="bad-val-fu alert alert-danger">
                        {msg}
                    </div>
                )
                :
                ""
        }
        </>
    );
}

export default AlertForm;