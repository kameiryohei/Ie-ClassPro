"use client";
import { Sling as Hamburger } from "hamburger-react";

import ProfileDrawer from "../ProfileDrawer";
import { useState } from "react";

const HamburgerMenu = ({ sessionId }: { sessionId: string | undefined }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={30}
        label="メニューを開く"
      />
      <ProfileDrawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        sessionId={sessionId}
      />
    </div>
  );
};

export default HamburgerMenu;
