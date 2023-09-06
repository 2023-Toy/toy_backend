# toy_backend

Nodejs Express project

---
# :bulb: 프로젝트명
아장아장

# :baby_bottle: 프로젝트 소개
장난감 재사용을 통해 환경 오염을 줄이고, 부모의 장난감 및 육아 용품 비용 부담 완화를 위한 사용자 거래 플랫폼

# :busts_in_silhouette: BACKEND Member
- 유상훈 : 회원 API 개발
- 안수민 : 로그인, 커뮤니티 관련 API 개발
- 정다겸 : 커뮤니티 관련 API 개발
- 최승희 : 거래 관련 API 개발

# :gear: 개발 환경
- Platform : Node.js
- Framework : Express
- IDE : VScode
- Language : JavaScript
- DataBase : MariaDB
- API Platform : [POSTMAN](https://documenter.getpostman.com/view/18911878/2s946o4UYp)

# :mag: System Structure Diagram
<img width="487" alt="스크린샷 2023-09-06 오후 3 48 54" src="https://github.com/2023-Toy/toy_backend/assets/88326586/9d2737d1-586d-4961-9b64-bd90cd8ffedc">
<img width="385" alt="스크린샷 2023-09-06 오후 3 50 14" src="https://github.com/2023-Toy/toy_backend/assets/88326586/b4e96f59-7c26-40cc-addb-07d340047678">

# :file_cabinet: Database Design
<img width="568" alt="스크린샷 2023-09-06 오후 3 59 12" src="https://github.com/2023-Toy/toy_backend/assets/88326586/cb7ba8ff-794f-4397-a094-8d280ab2bb12">

# :star: 구현 기능 소개
- JWT TOKEN을 통한 사용자 인증
  - 회원가입
  - 로그인
  - 회원 탈퇴
- 회원
  - 최근 본 거래 글 조회
  - 찜한 거래 글 조회
  - 회원 프로필 조회 / 수정
  - 회원의 아이 등록 / 조회 / 수정 / 삭제
- 거래
  - 메인 화면에서 사용자에게 거래 글 추천
  - 거래 글 등록 / 수정 / 삭제
  - 거래 글 검색
  - 거래 상태 수정
- 커뮤니티
  - 메인 화면에서 최대 5개 커뮤니티 글 조회
  - 커뮤니티 글 조회 / 등록 / 수정 / 삭제
  - 댓글 등록 / 조회 / 수정 / 삭제

# :clipboard: Setting
1. .env 생성
```
   DB_host = (사용하는 DB ip)
   DB_port = (사용하는 DB port)
   DB_user = (사용하는 DB user)
   DB_password = (DB Password)
   DB_database = (DB name)
   
   SERVER_PORT = (사용할 port)
```
2. src/config/secretkey.js 생성
```
module.exports = {
    secretKey : '(사용할 비밀키)',
    opton : {
        algorithm : "(사용할 알고리즘)",
        expiresIn : "(토큰 유효 기간 설정)",
        issuer : "(발행자)"
    }
}
```
3. npm install