import * as React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, Switch } from "wouter";
import { RootProvider, RootStore } from "../../stores/rootstore";
import Layout from "./layout";

export default function App() {
    const [root] = React.useState(() => new RootStore());

    return (
        <HelmetProvider>
            <RootProvider value={root}>
                <Layout>
                    <Switch>
                        <Route path="/">Hello World !</Route>
                        <Route>Nothing</Route>
                    </Switch>
                </Layout>
            </RootProvider>
        </HelmetProvider>
    );
}
