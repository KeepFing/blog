module.exports = {
    saveLink:'INSERT INTO link_t(`name`,url,`order`,remark) VALUES(?,?,?,?)',
    queryLink:'SELECT id,`name`,url,`order`,remark FROM link_t ORDER BY `order` ASC',
    updateLink:'UPDATE link_t SET `name` = ?,url = ?,`order` = ?,remark = ? WHERE id = ?',
    deleteLink:'DELETE FROM link_t WHERE id = ?'
}