
export function mix(a: string[], i: number = a.length - 1): string[] {
    if (i < 0) return a;

    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[j];

    a[j] = a[i];
    a[i] = temp;

    return mix(a, i - 1);
}