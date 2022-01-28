async function upload(name: string, chunk: File | Blob) {
  const wss = new WebSocket("ws://localhost:3002");

  wss.onopen = async () => {
    await wss.send(chunk);
  };
}

function process(blob: File) {
  const BYTES_PER_CHUNK = 1024 * 1024 * 4;
  const SIZE = blob.size;

  var start = 0;
  var end = BYTES_PER_CHUNK;

  while (start < SIZE) {
    var chunk = blob.slice(start, end);

    upload(blob.name, chunk);

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
  self.postMessage(blob.name + " Uploaded Succesfully");
}

self.onmessage = function (e: MessageEvent<File>) {
  console.log("e data >>", e.data);
  process(e.data);
};
