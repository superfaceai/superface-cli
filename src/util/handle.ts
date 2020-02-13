/**
 * Async/Await operation handler
 */
interface Handler {
  ok: boolean;
  data?: any;
  error?: any;
}

/**
 * Async/Await handler function
 */
function handle(promise: Promise<any>): Promise<Handler> {
  return promise
    .then(data => ({ ok: true, data }))
    .catch(error => Promise.resolve({ ok: false, error }));
}

export { handle, Handler };
