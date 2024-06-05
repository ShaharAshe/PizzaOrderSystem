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