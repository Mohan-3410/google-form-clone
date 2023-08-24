import "./Template.css";
import React from "react";
import MorevertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import blank from "../../images/forms-blank-googlecolors.png";
import party from "../../images/partyInvite.png";
import contact from "../../images/contactInformation.png";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const Template = () => {
  const navigate = useNavigate();
  function createForm() {
    const id = uuid();
    navigate("/form/" + id);
  }
  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontSize: "15px", color: "#202124" }}>
            Start a new form
          </span>
        </div>
        <div className="template_right">
          <div className="gallery_button">
            Template gallery
            <UnfoldMoreIcon fontSize="small" />
          </div>
          <IconButton>
            <MorevertIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createForm}>
          <img src={blank} alt="blank" className="card_image" />
          <p className="card_title">Blank</p>
        </div>
        <div className="card">
          <img src={party} alt="party" className="card_image" />
          <p className="card_title">Party Invite</p>
        </div>
        <div className="card">
          <img src={contact} alt="contact" className="card_image" />
          <p className="card_title">Contact Information</p>
        </div>
      </div>
    </div>
  );
};

export default Template;
