import { FieldProperty, GroupProperty, Tree } from "../models";
import { DrawerBase } from "./base";
import { registry } from "./registry";

export interface DrawChain {
    property: FieldProperty | GroupProperty;
    drawers: DrawerBase<FieldProperty | GroupProperty>[];
}

export interface DeepDrawChain extends DrawChain {
    child: DeepDrawChain[];
}

export function createDeepDrawChain(tree: Tree) {
    function walk(property: FieldProperty | GroupProperty): DeepDrawChain {
        const drawers: DrawerBase[] = [];
        for (let [, entry] of registry) {
            if (entry.uninitializedDrawer.canDrawProperty(property)) {
                var drawer = new entry.drawerType();
                //@ts-ignore
                drawer.priority = entry.priority;
                drawer.init(property);
                drawers.push(drawer);
            }
        }
        drawers.sort((a, b) => a.priority - b.priority);
        const child = property.children.map(walk);
        return { property, drawers, child };
    }
    return walk(tree.rootProperty);
}

export function createDrawChain(property: FieldProperty | GroupProperty): DrawChain {
    const drawers: DrawerBase[] = [];
    for (let [, entry] of registry) {
        if (entry.uninitializedDrawer.canDrawProperty(property)) {
            var drawer = new entry.drawerType();
            //@ts-ignore
            drawer.priority = entry.priority;
            drawer.init(property);
            drawers.push(drawer);
        }
    }
    drawers.sort((a, b) => b.priority - a.priority);
    return { property, drawers };
}

export function drawChainEquals(a: DrawChain, b: DrawChain) {
    if (a.property != b.property) return false;
    if (a.drawers.length != b.drawers.length) return false;

    for (let i = 0; i < a.drawers.length; i++) {
        let drawerA = a.drawers[i];
        let drawerB = b.drawers[i];

        if (drawerA.constructor != drawerB.constructor) return false;
    }

    return true;
}
