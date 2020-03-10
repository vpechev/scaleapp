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
  },
  feedbackRecipients: [
    { name: 'Elena Dimitrova', email: 'elena.dimitrova@scalefocus.com' },
    { name: 'Lachezar Simeonov', email: 'lachezar.simeonov@scalefocus.com' },
    { name: 'Maria Kamenova', email: 'maria.kamenova@scalefocus.com' },
    { name: 'Monika Pecheva', email: 'monika.pecheva@scalefocus.com' },
    { name: 'Nadezhda Petkova', email: 'nadezhda.petkova@scalefocus.com' },
    { name: 'Rosen Nikolov', email: 'rosen.nikolov@scalefocus.com' },
    { name: 'Viktoria Smilyanova', email: 'viktoria.smilyanova@scalefocus.com' },
    { name: 'Yana Yanakieva', email: 'yana.yanakieva@scalefocus.com' },
    { name: 'Zvezda Yordanova', email: 'zvezda.yordanova@scalefocus.com' },
    { name: 'Vladimir Pechev', email: 'vladimir.pechev@scalefocus.com' }, 
    { name: 'Tushka Dermendzhieva', email: 'tushka@scalefocus.com' }
  ]
};
