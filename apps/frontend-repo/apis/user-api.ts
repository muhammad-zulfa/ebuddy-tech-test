export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3030/users");
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    return await response.json();
  } catch (err: unknown) {
    return Promise.reject(err);
  }
};
