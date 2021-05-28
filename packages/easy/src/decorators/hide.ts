import { createBaseDecorator } from "./base";

const [$hide, _hide] = createBaseDecorator<{}>("hide");

function hide() {
    return _hide({});
}

export { $hide, hide };
