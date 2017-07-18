export function post(message: string) {
    return max.post(message);
}

export function outlet(outlet: number, msg: any) {
    max.outlet(outlet, msg);
}

export function getArgs(args) {
    return max.arrayfromargs(args);
}

export function on(name: string, callback: (args: any[]) => any) {
    max[name] = function () {
        callback(max.arrayfromargs(arguments));
    }
}