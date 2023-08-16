const db = require('../config/db');
const logger = require('../config/logger')

function getMain() {
    return new Promise((resolve, reject) => {
        var queryData = `select c.community_id, c.community_title, c.community_content, count(community_image_id) as img_count, count(comment_id) as comment_count from Community c
        left join Comment c2 on c.community_id = c2.community_id
        left join Community_image ci on ci.community_id = c.community_id
        GROUP BY community_id 
        ORDER BY c.community_id desc
        limit 5;`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_메인화면]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getCommunity() {
    return new Promise((resolve, reject) => {
        var queryData = `select c.community_id, c.community_title, c.community_content, c.community_date, ci.community_path, count(c2.comment_id) as count_comment FROM Community c
                         left join Community_tag ct on ct.community_id = c.community_id
                         left join Comment c2 on c2.community_id = c.community_id
                         left join Community_image ci on ci.community_id = c.community_id
                         group by c.community_id
                         order by c.community_id desc;`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_커뮤니티 탭]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getCommunityImg(id) {
    return new Promise((resolve, reject) => {
        var queryData = `select ci.community_path from Community_image ci
                        left join Community c ON ci.community_id = c.community_id
                        where ci.community_id = ${id};`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_이미지]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getCommunityBoard(id) {
    return new Promise((resolve, reject) => {
        const queryData = `select c.community_title, c.community_content, c.community_date, u.user_name, u.grade, u.profile_img FROM Community c
                           left join \`user\` u ON u.user_id = c.user_id
                           where c.community_id  = ${id};`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_글 조회]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getCommunityComment(id) {
    return new Promise((resolve, reject) => {
        const queryData = `select c.community_id, c.comment_content, c.comment_date, u.user_name, u.profile_img FROM Comment c
                           join \`user\` u on u.user_id = c.user_id
                           where c.community_id = ${id}
                           GROUP BY comment_id;`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_댓글 목록]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

function getSearch(search) {
    return new Promise((resolve, reject) => {
        const queryData = `select c.community_title, c.community_content, c.community_date, ci.community_path, count(c2.comment_id) as count_comment from Community c
                                  left join Comment c2 on c2.community_id = c.community_id
                                  left join Community_image ci on ci.community_id = c.community_id
                                  where c.community_title LIKE '${search}' OR c.community_content LIKE '${search}'
                                  GROUP BY c2.comment_id;`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_검색]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

// 게시글 추가
function postCommunity(user_id, title, content) {
    return new Promise((resolve, reject) => {
        const currentDateTime = new Date().toISOString().slice(0, 10)
        const queryData = `INSERT INTO Community (user_id, community_title, community_content, community_date) VALUES (${user_id}, "${title}", "${content}", '${currentDateTime}');`
        db.query(queryData, (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [community_게시글 추가]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data.insertId)
        })
    })
}

function postCommunityImg(community_id, img) {
    return new Promise((resolve, reject) => {
        const queryData = `insert into Community_image(community_id, community_path) values(${community_id}, '${img}');`
        db.query(queryData, (error) => {
            if (error) {
                logger.error(
                    'DB error [community_게시글 추가_이미지 추가]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve("성공")
        })
    })
}

function postCommunityTag(community_id, tag_id) {
    return new Promise((resolve, reject) => {
        const queryData = `insert into Community_tag(community_id, tag_id) values(${community_id}, '${tag_id}');`
        db.query(queryData, (error) => {
            if (error) {
                logger.error(
                    'DB error [community_게시글 추가_태그 추가]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve("성공")
        })
    })
}

// 게시글 삭제
function deleteCommunity(community_id) {
    return new Promise((resolve, reject) => {
        const queryData = `DELETE FROM community WHERE community_id = ${community_id};`
        db.query(queryData, [community_id], (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [user]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}

// 게시글 수정
function updateCommunity(community_id, community_title, community_content) {
    return new Promise((resolve, reject) => {
        const queryData = `UPDATE community SET community_title = ${community_title}, community_content = ${community_content}, WHERE community_id = ${community_id};`
        db.query(queryData, [community_title, community_content, community_id], (error, db_data) => {
            if (error) {
                logger.error(
                    'DB error [user]' +
                    '\n \t' + queryData +
                    '\n \t' + error
                )
                reject("DB ERR")
            }
            resolve(db_data)
        })
    })
}


module.exports = {
    getMain,
    getCommunity,
    getCommunityImg,
    getCommunityBoard,
    getCommunityComment,
    getSearch,
    postCommunity,
    postCommunityImg,
    postCommunityTag,
    deleteCommunity,
    updateCommunity,
}