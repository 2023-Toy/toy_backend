const db = require('../config/db');
const logger = require('../config/logger')

// 게시글 추가
function postCommunity(community_title, community_content) {
  return new Promise((resolve, reject) => {
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const queryData = `INSERT INTO community (community_title, community_content, community_date) VALUES ('${community_title}', '${community_content}', '${currentDateTime}')`;
    db.query(queryData, [community_title, community_content, currentDateTime], (error, db_data) => {
        if(error){
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

// 게시글 삭제
function deleteCommunity(community_id) {
  return new Promise((resolve, reject) => {
    const queryData = `DELETE FROM community WHERE community_id = ${community_id}`;
    db.query(queryData, [community_id], (error, db_data) => {
        if(error){
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
    const queryData = `UPDATE community SET community_title = ${community_title}, community_content = ${community_content}, WHERE community_id = ${community_id}`;
    db.query(queryData, [community_title, community_content, community_id], (error, db_data) => {
        if(error){
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

// 게시글 검색
function getCommunity(community_search) {
  return new Promise((resolve, reject) => {
    const queryData = `SELECT * FROM community`;
    db.query(queryData, [community_search, community_search], (error, db_data) => {
        if(error){
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

// 게시글 조회
function viewCommunity(community_search) {
    return new Promise((resolve, reject) => {
      const queryData = `SELECT * FROM community WHERE community_title LIKE ? OR community_content LIKE ?`;
      const searchValue = `%${community_search}%`;
      db.query(queryData, [searchValue, searchValue], (error, db_data) => {
        if(error){
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
    postCommunity,
    deleteCommunity,
    updateCommunity,
    getCommunity,
    viewCommunity
  };
  

/*
 DB 이름 : toy
 테이블 이름 : Community

 테이블 안의 열
 1. 이름 : community_id
 데이터 유형 : int
 기본값 : AUTO_INCREMENT
 PRIMARY
 커뮤니티 id

 2. 이름 : user_id
 데이터 유형 : int
 외래키
 회원 id

 3. 이름 : community_title
 데이터 유형 : varchar
 제목

 4. 이름 : community_content
 데이터 유형 : varchar
 내용

 5. 이름 : community_date
 데이터 유형 : date
 작성일
*/