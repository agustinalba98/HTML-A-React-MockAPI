import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Loader.css";

function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" className="loader-icon" />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
