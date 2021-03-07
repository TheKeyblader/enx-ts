import * as React from "react";
import { AnchorButton, Navbar } from "@blueprintjs/core";
import { Link } from "wouter";
import { AppName } from "../../core/consts";
import { DarkButton } from "../../components/darkMode";

export default function Nav() {
    return (
        <Navbar>
            <Navbar.Group align="left">
                <Link href="/">
                    <AnchorButton minimal>
                        <Navbar.Heading>{AppName}</Navbar.Heading>
                    </AnchorButton>
                </Link>
            </Navbar.Group>
            <Navbar.Group align="right">
                <DarkButton />
            </Navbar.Group>
        </Navbar>
    );
}
