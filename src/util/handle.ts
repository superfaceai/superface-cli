/**
 * Async/Await handler
 *
 */
function handle(
  promise: Promise<any>
): Promise<{ ok: boolean; data?: any; error?: any }> {
  return promise
    .then(data => ({ ok: true, data }))
    .catch(error => Promise.resolve({ ok: false, error }));
}

export default handle;
