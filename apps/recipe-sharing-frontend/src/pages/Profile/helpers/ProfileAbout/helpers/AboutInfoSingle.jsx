import { PropTypes } from "prop-types";

const AboutInfoSingle = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={icon} />
      <span className="text-[#9D9DAF] text-sm">{label}</span>
    </div>
  );
};

AboutInfoSingle.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

export default AboutInfoSingle;
