import { FieldProperty, GroupProperty, Tree } from "../models";
import { DecoratorDrawer, DrawerBase, DrawerType } from "./base";
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
        var entries = Array.from(registry.values());

        function addDrawers(type: DrawerType) {
            var filteredEntries = entries.filter((e) => e.type == type).sort((a, b) => a.priority - b.priority);
            for (let entry of filteredEntries) {
                if (entry.uninitializedDrawer.canDrawProperty(property)) {
                    let drawer = new entry.constructor();
                    //@ts-ignore
                    drawer.priority = entry.priority;
                    //@ts-ignore
                    drawer.type = entry.type;
                    drawer.init(property);
                    drawers.push(drawer);
                }
            }
        }

        // Super Type
        addDrawers(DrawerType.super);

        // Attribute Type
        if (property instanceof FieldProperty) {
            for (let [] of property.decorators) {
                addDrawers(DrawerType.attribute);
            }
        } else addDrawers(DrawerType.attribute);

        // Value Type
        addDrawers(DrawerType.value);

        //Auto Type
        addDrawers(DrawerType.auto);

        const child = property.children.map(walk);
        return { property, drawers, child };
    }
    return walk(tree.rootProperty);
}

export function createDrawChain(property: FieldProperty | GroupProperty): DrawChain {
    const drawers: DrawerBase[] = [];
    var entries = Array.from(registry.values());

    function addDrawers(type: DrawerType) {
        var filteredEntries = entries.filter((e) => e.type == type).sort((a, b) => a.priority - b.priority);
        for (let entry of filteredEntries) {
            if (entry.uninitializedDrawer.canDrawProperty(property)) {
                let drawer = new entry.constructor();
                //@ts-ignore
                drawer.priority = entry.priority;
                //@ts-ignore
                drawer.type = entry.type;
                drawer.init(property);
                drawers.push(drawer);
            }
        }
    }

    // Super Type
    addDrawers(DrawerType.super);

    // Attribute Type
    if (property instanceof FieldProperty) {
        for (let [name] of property.decorators) {
            var filtered = entries.filter(
                (e) =>
                    e.type == DrawerType.attribute &&
                    e.uninitializedDrawer instanceof DecoratorDrawer &&
                    name.startsWith(e.uninitializedDrawer.decoratorName)
            );
            for (let entry of filtered) {
                if (entry.uninitializedDrawer.canDrawProperty(property)) {
                    let drawer = new entry.constructor();
                    //@ts-ignore
                    drawer.priority = entry.priority;
                    //@ts-ignore
                    drawer.type = entry.type;
                    drawer.init(property);
                    drawers.push(drawer);
                }
            }
        }
    } else addDrawers(DrawerType.attribute);

    // Value Type
    addDrawers(DrawerType.value);

    //Auto Type
    addDrawers(DrawerType.auto);
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
