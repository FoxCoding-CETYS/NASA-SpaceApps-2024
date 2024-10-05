import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import LogoL from '../../app/assets/logo-letters.png'
import LogoT from '../../app/assets/tractor.png'
import Image from 'next/image'
import React from "react";

export default function NavbarTop() {
  return (
        <Navbar className="bg-orange-50">
            <NavbarBrand className="flex items-center">
                <Image src={LogoT} alt="Logo" className="size-16" />
                <Image src={LogoL} alt="Logo" className="size-32" />
            </NavbarBrand>
            <NavbarContent className="ml-auto flex justify-end items-center">
                <NavbarItem>
                    <h1 className="text-green-800">asdfghjkl</h1>
                    <p>hodslfjkdbfjdskbfjdsb</p>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
  );
}