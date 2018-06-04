module.exports = {
    queryMenu:'SELECT id,`name`,url,`order` FROM menu_t ORDER BY `order` ASC',
    deleteMenu:'DELETE FROM menu_t WHERE id = ?',
    updateMenu:'UPDATE menu_t SET `name` = ?,url = ?,`order` = ? WHERE id = ?',
    saveMenu:'INSERT INTO menu_t(`name`,url,`order`) VALUES(?,?,?)'
}