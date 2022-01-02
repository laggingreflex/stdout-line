# stdout-line

[Yet another] function to log by overwriting previous output.

Differences:

* Single line enforced
* Trims or pads the line to fit the stdout width.
  - This ensures the next log (by other methods: `console.log`) automatically prints to (apparently) next line since the previous line had been fully padded.
* Small, no dependencies

[Yet another]: https://www.npmjs.com/search?q=log+update

## Install

```sh
npm install stdout-line
```

## Usage

```js
import stdoutLine from 'stdout-line'
stdoutLine('... your message')
```

## API

```js
import { create } from 'stdout-line'
create(opts)
```

* **`opts.stream`** `[=process.stdout]` Stream to write to
* **`opts.width`** `[number=stream.columns|80]` Width
* **`opts.pad`** `[string= ]` Pad message if length < width
* **`opts.join`** `[string= ]` Join [...message] array with

