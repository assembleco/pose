export function pull(path, body) {
  return fetch(path + "?" + new URLSearchParams(body))
}

export function push(path, body, method="POST") {
  return fetch(path, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").content,
      // 'Authorization': localStorage.getItem("code"),
    },
    body: JSON.stringify(body),
  })
}
