import "./spinner.css"

const Spinner = () => {
    return (
        <>
        <div className="d-flex justify-content-center align-items-center">
            <img className="h-50 w-50 border-radius-special" src={require("../../assets/img/spinner.gif")} />
        </div>
        </>
    )
}

export default Spinner;
