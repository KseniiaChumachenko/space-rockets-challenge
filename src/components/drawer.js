import React from "react";
import * as C from "@chakra-ui/react";

export function Drawer({ title, children, ...p }) {
  return (
    <C.Drawer {...p} autoFocus={false}>
      <C.DrawerOverlay>
        <C.DrawerContent>
          <C.DrawerCloseButton />
          <C.DrawerHeader>{title}</C.DrawerHeader>
          <C.DrawerBody>{children}</C.DrawerBody>
        </C.DrawerContent>
      </C.DrawerOverlay>
    </C.Drawer>
  );
}
