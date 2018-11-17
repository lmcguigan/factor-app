import axios from "axios";
const API = {
  login: function (User) {
    console.log(User);
    return axios.post("api/user/login", User)

  },
  register: function (newUser) {
    return axios.post("api/user/register", newUser)
  },
  removeUser: function(User){

  },
  //get information about the user
  getUser: function (User) {
    console.log(User);
    return axios.get("api/problems/" + User)
  },
  updateUserProblems: function (problem) {
    console.log(problem);
    return axios.put("api/problems/problem/" + problem, problem)
  },
  updateUserScore: function (UserData) {
    return axios.put("api/problems/" + UserData.userid, UserData)
  }
}
export default API;