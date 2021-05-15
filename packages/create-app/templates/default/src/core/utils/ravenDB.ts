export function partialId(id: string) {
    var splits = id.split("/");
    if (splits.length == 2) return splits[1];
    else return id;
}
