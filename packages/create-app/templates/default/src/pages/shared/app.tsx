import * as React from "react";
import { HelmetProvider } from "react-helmet-async";
import { RootProvider, RootStore } from "../../stores/rootstore";
import Layout from "./layout";

export default function App() {
    const [root] = React.useState(() => new RootStore());

    return (
        <HelmetProvider>
            <RootProvider value={root}>
                <Layout></Layout>
            </RootProvider>
        </HelmetProvider>
    );
}
