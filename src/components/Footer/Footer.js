import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Footer.scss";
import {MdFoodBank} from "react-icons/md";
import {IoMdMenu} from "react-icons/io";

const Footer = () => {
  const {openSidebar} = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);

  }


  return (
    <footer className={`footer bg-orange flex align-center ${scrolled ? 'scrolled': ""}`}>
      <div className='container w-100'>
        <div className='footer-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to = "/" className='footer-brand fw-3 fs-22 flex align-center'>
              <MdFoodBank />
              <span className='footer-text fw-7'>Footer</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer