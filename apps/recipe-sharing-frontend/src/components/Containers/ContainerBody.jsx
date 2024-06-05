import { PropTypes } from "prop-types";


const ContainerBody = ({ children }) => {
  return (
    <div className="max-w-[994px] mx-auto">{children}</div>
  )
}

ContainerBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
  }

export default ContainerBody