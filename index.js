export default create();

/**
 * @param {object} opts
 * @param {object} [opts.stream=stdout] Stream to write to
 * @param {number} [opts.width=stream.columns|80] Width
 * @param {string} [opts.pad=' '] Pad message if length < width
 * @param {string} [opts.join=' '] Join [...message] array with
 */
export function create(opts = {}) {
  if (typeof opts.write === 'function') opts = { stream: opts };
  const stream = opts.stream ?? process.stdout;
  if (!opts.width) opts = assign(opts, 'width', () => process.stdout.columns ?? 80);
  return log;

  function log(...message) {
    stream?.cursorTo?.(0);
    stream?.clearLine?.();
    stream.write(trim(message.join(opts.join ?? ' '), opts));
  }
}

export function trim(string, { width = 80, pad = ' ' } = {}) {
  if (string.length <= width) return string.padEnd(width, pad);
  return string.substr(0, width);
}

function assign(object, key, fn) {
  return new Proxy(object, { get: (o, k) => k === key ? fn() : o[k] });
}
