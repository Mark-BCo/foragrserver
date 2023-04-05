// const allowedOrigins = require('./allowedOrigins');

// // CROSS ORIGIN REQUESTS - NOT ALLOWING THE HTTP REQUEST IF THE ALLOWED ORIGINS IS NOT SPECIFIED
// // Remove this at deployment
// const corsOptions = {

//     origin: (origin, callback) => {

//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not alloweed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions

// do I leave origin in or not?