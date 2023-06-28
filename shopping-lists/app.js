import { serve, configure } from "./deps.js";
import * as requestUtils from "./utils/requestUtils.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  if (request.method === "GET") {
    if (path.match("/$")) {
      return await listController.viewHomePage();
    } else if (path.match("/lists$")) {
      return await listController.viewLists();
    } else if (path.match("/lists/[0-9]+")) {
      return await listController.viewList(request);
    } else {
      return requestUtils.redirectTo("/");
    }
  } else if (request.method === "POST") {
    if (path.match("/lists$")) {
      return await listController.addNewShoppingList(request);
    } else if(path.match("/lists/[0-9]+/deactivate")) {
      return await listController.deactivateShoppingList(request);
    } else if(path.match("/lists/[0-9]+/items$")) {
      return await itemController.addItem(request);
    } else if(path.match("/lists/[0-9]+/items/[0-9]+/collect")) {
      return await itemController.collectItem(request);
    } else {
      return requestUtils.redirectTo("/");
    }
  } else {
    return requestUtils.redirectTo("/");
  }
};

serve(handleRequest, { port: 7777 });
