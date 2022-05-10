import { createReadStream } from "fs";
import path from "path";

export const placeholderImage = createReadStream(
  path.resolve() + "/media/img-not-found.png"
);
