import axiosInstance from "../api/axiosInstance";


const User = {
  loginUser: async (credentials) => {
    try {
      const response = await axiosInstance.post("/usuario/login", credentials);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },
  registerUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/usuario/crear", userData);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
  ,
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/usuario/obtener_usuarios");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  makeAdmin: async (userId) => {
    try {
      const response = await axiosInstance.put(`/usuario/hacer_admin/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error making user admin:", error);
      throw error;
    }
  }

}

export default User;
