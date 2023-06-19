import { executeQuery } from "../database/database.js";

const addItem = async (listId, name) => {
    await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($listId, $name)", {listId: listId, name: name});
};

const collectItem = async (listId, itemId) => {
    await executeQuery("UPDATE shopping_list_items SET collected = TRUE WHERE shopping_list_id = $listId AND id = $itemId", {listId: listId, itemId: itemId});
};

export { addItem, collectItem };