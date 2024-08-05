import React from "react";
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    return(
        <>
        <div className="blog-header-web">
            <div className="center-wr">
                <div className="header-parent-wr">
            <div className="header-logo-wr" style={{cursor:"pointer"}} onClick={()=>navigate("/")}>
                <span>FormCraft</span>
            </div>
            

                </div>

            </div>
        </div>
        </>
    )
}
export default Header;