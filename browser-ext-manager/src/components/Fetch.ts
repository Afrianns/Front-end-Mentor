export async function useFetch(url: string, idx: number) {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify({ index: idx }),
  })
  return res
}
