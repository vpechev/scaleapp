// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiConfig: {
      baseURL: "http://localhost:4242/api",
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
