"use client";
import { Sling as Hamburger } from "hamburger-react";

import ProfileDrawer from "../ProfileDrawer";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
      <ProfileDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
};

export default HamburgerMenu;
