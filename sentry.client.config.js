import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://6b9b7dff81695af0280257c95cbfc837@o4511885513195520.ingest.de.sentry.io/4511885655081041",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
