import * as React from "react";
import { DarkContainer } from "../../components/darkMode";
import Header from "./header";
import Nav from "./nav";

export default function Layout(props: React.PropsWithChildren<{}>) {
    return (
        <DarkContainer>
            <Header />
            <Nav />
            <div className="container mx-auto py-5">{props.children}</div>
        </DarkContainer>
    );
}
