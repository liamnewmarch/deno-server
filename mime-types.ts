interface MimeTypes {
  [mimeType: string]: {
    source?: string;
    compressible?: boolean;
    extensions?: string[];
  };
}

interface Extensions {
  [extension: string]: string;
}

const url: string = "https://unpkg.com/mime-db@1.44.0/db.json";
const response: Response = await fetch(url);

export const mimeTypes: MimeTypes = await response.json();
export const extensions: Extensions = {};

for (const [mimeType, definition] of Object.entries(mimeTypes)) {
  if (definition.extensions) {
    for (const extension of definition.extensions) {
      extensions[extension] = mimeType;
    }
  }
}

export function guessMimeType(path: string): string {
  const ext = path.split(".").pop() ?? "";
  return extensions[ext] ?? "application/octet-stream";
}
