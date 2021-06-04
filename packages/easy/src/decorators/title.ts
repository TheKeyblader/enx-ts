export interface TitleOptions {
    title: string;
    subTitle?: string;
}

export const $title = "Title";
export function title(title: string, subTitle?: string) {
    return Reflect.metadata($title, { title, subTitle });
}
