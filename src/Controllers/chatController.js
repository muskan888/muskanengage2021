const chatModel = require("../modals/chat");

exports.add = async (data) => {
    return new Promise((resolve,reject)=>{
        console.log("save profile", data);
        chatModel.create(data).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.get = async (req,res) => {
    try {
        let filter = {};
        if (req.query.filter) {
        filter = JSON.parse(req.query.filter);
        }
        filter = JSON.parse(JSON.stringify(filter));
        console.log(filter);
        let startDate = new Date();
        
        let endDate = new Date();
        endDate.setDate(startDate.getDate() + 1)
        filter.where.createdAt = {
            "$gte": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0),
            "$lt": new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, 0)
        }
        console.log("save profile", filter.where);
        let chats = await chatModel.find(filter.where)
        res.json(chats);
    } catch (error) {
        console.log(error);
        if (!error.status) {
          error.status = 500;
        }
        res.status(error.status).json({ message: error.message });
      }
}

exports.getAll = async (req,res) => {
    try {
        let filter = {};
        if (req.query.filter) {
        filter = JSON.parse(req.query.filter);
        }
        filter = JSON.parse(JSON.stringify(filter));
        console.log(filter);
        console.log("save profile", filter.where);
        let chats = await chatModel.find(filter.where)
        res.json(chats);
    } catch (error) {
        console.log(error);
        if (!error.status) {
          error.status = 500;
        }
        res.status(error.status).json({ message: error.message });
      }
}