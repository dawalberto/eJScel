export function correctPath(path:string): string {
    return path.endsWith('/') || path.endsWith('\\') ? path : `${path}/`
}