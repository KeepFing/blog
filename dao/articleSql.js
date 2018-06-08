module.exports={
	queryBlog:'SELECT article_t.id,title,cover_img,sub_title,author,content,type_id,type_name,create_time,watch_times,`like`,dislike FROM article_t,type_t where article_t.type_id=type_t.id  ORDER BY create_time DESC LIMIT ?,?',
	queryBlogByKey:'SELECT article_t.id,title,cover_img,sub_title,author,content,type_id,type_name,create_time,watch_times,`like`,dislike FROM article_t,type_t where article_t.type_id=type_t.id and article_t.title LIKE "%"?"%" ORDER BY create_time DESC LIMIT ?,?;SELECT COUNT(*) AS total FROM article_t WHERE title LIKE "%"?"%"',
	saveBlog:'INSERT INTO article_t(id,title,cover_img,sub_title,author,content,type_id,create_time,watch_times,`like`,dislike) VALUES(?,?,?,?,?,?,?,?,?,?)',
	updateBlogWatchTimes:'UPDATE article_t SET watch_times = ? WHERE id = ?',
	updateBlogLike:'UPDATE article_t SET `like` = ? WHERE id = ?',
	updateBlogDislike:'UPDATE article_t SET dislike= ? WHERE id = ?',
	addBBS:'INSERT INTO reply_t(reply_id,article_id,user_id,message,create_time) VALUES(?,?,?,?,?)',
	queryBBS:'SELECT reply_id,article_id,user_id,username,message,create_time FROM reply_t,user_t WHERE user_t.id = reply_t.user_id AND article_id = ? ORDER BY create_time DESC LIMIT ?,?',
	queryBlogByType:'SELECT article_t.id,title,cover_img,sub_title,author,content,type_id,create_time,watch_times,`like`,dislike FROM article_t WHERE type_id = ? ORDER BY create_time LIMIT ?,?',
	queryBlogByReadTimes:'SELECT id,title,watch_times FROM article_t ORDER BY watch_times DESC',
	queryBlogById:'SELECT article_t.id,title,cover_img,sub_title,author,content,type_id,type_name,create_time,watch_times,`like`,dislike FROM article_t,type_t where article_t.type_id=type_t.id AND article_t.id =?',
	queryBlogType:'SELECT * FROM type_t'
}
