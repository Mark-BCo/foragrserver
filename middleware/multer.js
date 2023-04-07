// import multer from 'multer'

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//             var dirName =path.join(process.cwd(), './public/uploads/')
//             console.log(dirName)
//             if (!fs.existsSync(dirName)){
//                     fs.mkdirSync(dirName);
//             }
//                 cb(null,dirName)
//         }
//   },
//   filename, function (req, file, cb) {
//         cb(null, Date.now()+'-'+file.originalname)
//   }
// )

// var upload = multer({ storage: storage })

// router.post("/locations",upload.single('uploads'), (req, res) => {
//   console.log(req.file.destination) // image url
//   console.log(JSON.parse(req.body)) // other things
// })

// UNUSED