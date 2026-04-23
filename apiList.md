# pairUpDevAPIlist

## AuthRouter

- POST /signUp
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/rejected/:requestId
- POST /request/review/accepted/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /feed

