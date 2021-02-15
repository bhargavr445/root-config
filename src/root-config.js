import { registerApplication, start } from "single-spa";

const microfrontends = [{appName: "@mf-demo/employees", routeTo: '/employees'}]

const contentRootElement = document.getElementById('mf-content');

registerApplication({
  name: "@mf-demo/navbar",
  app: () => System.import("@mf-demo/navbar"),
  activeWhen: (location) => true
});

microfrontends.forEach(appInfo => {
  const microFrontendElement = document.createElement('div');
  microFrontendElement.setAttribute('id', `single-spa-application:${appInfo.appName}`);
  contentRootElement.appendChild(microFrontendElement);

  registerApplication({
    name: appInfo.appName,
    app: () => System.import(appInfo.appName),
    activeWhen: (location) => location.pathname === appInfo.routeTo
  });
})

start();


