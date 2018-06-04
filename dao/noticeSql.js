module.exports = {
    saveNotice:'INSERT INTO notice_t(notice,color) VALUES(?,?)',
    queryNotice:'SELECT id,notice,color FROM notice_t ',
    updateNotice:'UPDATE notice_t SET notice = ?,color = ? WHERE id = ?',
    deleteNotice:'DELETE FROM notice_t WHERE id = ?'
}