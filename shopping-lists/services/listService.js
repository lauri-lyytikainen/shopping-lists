import { executeQuery } from "../database/database.js";

const addNewShoppingList = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name)", {name: name});
};

const getAllActiveShoppingLists = async () => {
    const res = await executeQuery("SELECT * FROM shopping_lists WHERE active = TRUE");
    return res.rows;
};

const deactivateShoppingList = async (id) => {
    const res = await executeQuery("UPDATE shopping_lists SET active = FALSE WHERE id = $id", {id: id});
    if (res.error) {
        console.error(res.error);
    }
};

const getShoppingListName = async (id) => {
    const res = await executeQuery("SELECT name FROM shopping_lists WHERE id = $id", {id: id});
    return res.rows[0]?.name;
};

const getShoppingListItems = async (id) => {
    const res = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $id ORDER BY collected, name ASC", {id: id});
    return res.rows;
};

const getStatistics = async () => {
    const listCount = await executeQuery("SELECT COUNT(*) FROM shopping_lists");
    const itemCount = await executeQuery("SELECT COUNT(*) FROM shopping_list_items");
    return {
        listCount: listCount.rows[0].count,
        itemCount: itemCount.rows[0].count,
    };
};

export { 
    addNewShoppingList, 
    getAllActiveShoppingLists, 
    deactivateShoppingList, 
    getShoppingListName, 
    getShoppingListItems,
    getStatistics
};