const checkApiResponse = (response : Response) => {
  if(!response.ok) return Promise.reject(response.ok);

  return response.json()
}

export default checkApiResponse;