export default create();

/**
 * @param {object} opts
 * @param {object} [opts.stream=stdout] Stream to write to
 * @param {number} [opts.width=stream.columns|80] Width
 * @param {string} [opts.join=' '] Join [...message] array with
 * @param {number} [opts.throttle] Throttle logging (ms)
 * @param {function} [opts.format] Format message before writing to stream
 */
export function create(opts = {}) {
  if (typeof opts.write === typeof Function) opts = { stream: opts };
  opts = Object.assign({
    join: ' ',
    format,
    stream: process.stdout,
    width: 80,
    encoding: 'utf8',
  }, opts);

  let last = Date.now();
  log.log = log;
  log.persist = persist;
  log.write = write;
  return log;

  function log(...message) {
    if (opts.throttle) {
      const now = Date.now();
      if ((now - last) < opts.throttle) return;
      else last = now;
    }
    return write(trim(format(...message)));
  }

  function write(message) {
    opts.stream?.cursorTo?.(0);
    opts.stream?.clearLine?.();
    return opts.stream.write(message, opts.encoding);
  }

  function persist(...message) {
    return write(trim(format(...message)) + '\n');
  }

  function format(...message) {
    const format = () => message.join(opts.join).replace(/[\n\r]+/g, opts.join);
    if (opts.format) return opts.format.call(format, ...message);
    return format();
  }

  function trim(string, width = opts.stream?.columns ?? opts.width, pad = opts.join) {
    if (string.length <= width) return string.padEnd(width, pad);
    return string.substr(0, width);
  }
}
