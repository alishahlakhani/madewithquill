export const ErrorCodes = {
  MISC_MIDDLEWARE_FAILURE: "Middleware: Middleware error",
  MISSING_ENV_VAR: "Server: Missing variable in .env",
  MISC: "Misc server error",
};

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { error?: Error; context?: Jsonable } = {}
  ) {
    const { error, context } = options;

    super(message, { cause: error });
    this.name = this.constructor.name;
    this.context = context;
    console.error(message);
  }
}

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return error;
}
