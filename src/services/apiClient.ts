import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export class APIClient<T> {
  constructor(private endpoint: string) {}

  getAll = () => {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((response) => response.data);
  };

  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((response) => response.data);
  };
}
