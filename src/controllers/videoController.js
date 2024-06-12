import Video from "../models/Video"

// export const home = (req, res) => {
//   console.log("Start");
// Video.find().then((videos)=>{
// console.log("videos",videos);
// return res.render("home",{pageTitle:"Home",videos:[]});
// }).catch((err)=>console.log("errors",err));
// };

// export const home = async (req,res)=>{
// console.log("Start");
// const videos = await Video.find({});
// console.log("Finished");
// console.log(videos);
// return res.render("home",{pageTitle:"Home",videos});
// }

export const home = async (req,res)=>{
  try{const videos = await Video.find({});
  console.log(videos);
  return res.render("home",{pageTitle:"Home",videos});}
  catch(error){ return res.render("Server-error",{error});}
}

export const watch = async (req, res) => {
  const { id } = req.params;
 const video = await Video.findById(id);
 if(!video){
   return res.render("404", {pageTitle:"video not found."})
   }
   return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", {pageTitle:"video not found."})
    }
    return res.render("edit", {
     pageTitle: `Edit:${video.title}`,video,
   });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const{title, description, hashtags} = req.body;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404",{pageTitle:"video not found"});
  }
 await Video.findByIdAndUpdate(id, {
  title,
  description,
  hashtags:hashtags.split(",").map((word)=>(word.startsWith("#") ? word : `#${word}`))
 })
 await video.save();
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload",{
    pageTitle: "Upload Video",
  });
};

export const postUpload = async (req, res) => {
  const {title,description, hashtags} = req.body;
  try{  await Video.create({
    title,
    description,
    hashtags:hashtags.split(",").map((word)=>(word.startsWith("#")?word:`#${word}`)),
  });
  return res.redirect("/");}
  catch(err){
    console.log(err);
    return res.render("upload",{pageTitle:"Upload Video",errorMessage:err._message,});
  }
};
export const search = (req, res) => {
  return res.send("Search");
};



export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
