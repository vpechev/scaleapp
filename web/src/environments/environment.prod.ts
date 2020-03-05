export const environment = {
  production: true,
  apiConfig: {
    baseURL: "http://localhost:4200/api",
    routes: {
      areas : "/areas",
      complexities : "/complexities",
      searchQuestions: "/questions/search",
      randomQuestions: "/questions/random"
    }
  }
};
