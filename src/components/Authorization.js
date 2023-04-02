const url = "http://localhost:8080/api/users"

export const checkLoggedIn = () => {
  const token = sessionStorage.getItem("access-token")
  if (token !== null) {
    return true
  } else {
    return false
  }
}

export const isAdmin = async () => {
  const token = sessionStorage.getItem("access-token")
  const headers = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const rawResponse = await fetch(url, headers)
    const status = await rawResponse.status
    if (status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}
