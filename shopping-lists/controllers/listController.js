import { renderFile } from "../deps.js";
import * as requestUtils from "../utils/requestUtils.js";
import * as listService from "../services/listService.js";

const viewHomePage = async () => {
    const data = {
        statistics: await listService.getStatistics(),
    };
    return new Response(await renderFile("index.eta", data), requestUtils.responseDetails);
};

const viewLists = async () => {
    const data = {
        shoppingLists: await listService.getAllActiveShoppingLists(),
    };
    return new Response(await renderFile("lists.eta", data), requestUtils.responseDetails);
};

const addNewShoppingList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("shoppingListName");
    await listService.addNewShoppingList(name);
    return requestUtils.redirectTo("/lists");
};

const deactivateShoppingList = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    await listService.deactivateShoppingList(id);
    return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[2];
    const name = await listService.getShoppingListName(id);
    if (!name) {
        return requestUtils.redirectTo("/lists");
    }
    const data = {
        name: name,
        id: id,
        items: await listService.getShoppingListItems(id),
    };
    return new Response(await renderFile("list.eta", data), requestUtils.responseDetails);
};

export  { viewHomePage, viewLists, addNewShoppingList, deactivateShoppingList, viewList };