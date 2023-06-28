import * as requestUtils from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";

const addItem = async (request) => {
    const formData = await request.formData();
    const url = new URL(request.url);
    const name = formData.get("name");
    const id = url.pathname.split("/")[2];
    await itemService.addItem(id, name);
    return requestUtils.redirectTo(`/lists/${ id }`);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const listId = url.pathname.split("/")[2];
    const itemId = url.pathname.split("/")[4];
    await itemService.collectItem(listId, itemId);
    return requestUtils.redirectTo(`/lists/${ listId }`);
};

export { addItem, collectItem };