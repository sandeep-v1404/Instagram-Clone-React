import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import "./footer.css";


library.add(fab);
function Footer() {
    const date = new Date().getFullYear();

    return <div className="footer">
        <div className="footer__top">

            <h3>Made with React and Firebase by Sandeep , {date} Coding Journey <span><FontAwesomeIcon icon={faCoffee} /></span></h3><br></br>
            <h5>No Copyright .. Just for Learning.</h5><br></br>
            <h4>Contact Me :</h4>

        </div>
        <div className="footer__content">
            <a href="https://github.com/sandeep-v1404" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="icon github" icon={['fab', 'github']} size="2x" /></a>
            <a href="https://www.linkedin.com/in/sandeep-v-4b01551a4/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="icon linkedin" icon={['fab', 'linkedin']} size="2x" /></a>
            <a href="https://www.instagram.com/sandy._.the_ace/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="icon instagram" icon={['fab', 'instagram']} size="2x" /></a>
        </div>

    </div>
}
export default Footer;